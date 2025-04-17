import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import getPollData from "../services/getPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import createVoteService from "../services/createVoteService";
import { FaBookmark, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { makeChartDataObjFromPollData } from "../utils/util";
import useBookmark from "../hooks/useBookmark";
import { io } from "socket.io-client";
import { getPollSelectedOptionData } from "../services/getPollSelectedOptionData";
import SpinnerLoader from "../components/Loaders/SpinnerLoader";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function VotingPage() {
  const { pollId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const { handleBookmark } = useBookmark();
  const [poll, setPoll] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("https://livepoll-anjx.onrender.com");
    setSocket(s);
  
    s.on("connect", () => {
      console.log("Connected to the server");
      s.emit("joinPoll", pollId);
    });
  
    return () => {
      s.disconnect();
    };
  }, [pollId]);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery(["poll", pollId], () => getPollData(pollId), {
    cacheTime: 10 * 60 * 1000,
    staleTime: 20 * 60 * 1000,
    onSuccess: (data) => {
      setPoll(data);
    },
  });

  useQuery(["selectedOption", pollId], () => getPollSelectedOptionData(pollId), {
    cacheTime: 10 * 60 * 1000,
    staleTime: 20 * 60 * 1000, 
    onSuccess: (data) => {
      setSelectedOption(data?.data?.optionId || null);
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on("pollDataUpdated", (data) => {
        console.log("Received updated poll data:", data);
        setPoll(data);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error.message);
      });

      return () => {
        socket.off("pollDataUpdated");
        socket.off("error");
      };
    }
  }, [socket]); 

  const mutation = useMutation(createVoteService, {
    onSuccess: (data) => {
      toast.success("Vote submitted successfully");
      if (socket) {
        socket.emit("vote", { pollId, success: data?.success });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    },
  });

  const handleOptionSelect = (id) => {
    if (!selectedOption) {
      setSelectedOption(id);
    }
    mutation.mutate({ pollId, optionId: id });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <SpinnerLoader size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <ErrorFallback onRetry={refetch} />
      </div>
    );
  }

  const chartData = makeChartDataObjFromPollData(poll);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Poll Creator Info */}
          <div className="flex items-center gap-3">
            {poll?.data?.creatorData?.avatar ? (
              <img
                src={poll?.data?.creatorData?.avatar}
                alt={poll?.data?.creatorData?.username}
                className="rounded-full h-10 w-10 object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-3xl" />
            )}
            <div>
              <h3 className="font-medium text-gray-700">
                {poll?.data?.creatorData?.username || "Anonymous"}
              </h3>
              <p className="text-xs text-gray-500">Poll Creator</p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button 
            onClick={() => handleBookmark(pollId)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Bookmark this poll"
          >
            <FaBookmark className="text-blue-500 text-xl" />
          </button>
        </div>

        {/* Poll Content */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {poll?.data?.pollData?.title || "Loading..."}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {poll?.data?.pollData?.description || "Loading..."}
          </p>

          {/* Voting Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {poll?.data?.pollData?.options.map((option) => (
              <button
                key={option._id}
                onClick={() => handleOptionSelect(option._id)}
                disabled={selectedOption}
                className={`p-4 rounded-lg border transition-all
                  ${selectedOption === option._id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                  ${selectedOption && selectedOption !== option._id ? 'opacity-70' : ''}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Results Chart */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Results</h3>
            <div className="h-64">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} votes`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Live Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live updates enabled
        </div>
      </div>
    </div>
  );
}

export default VotingPage;