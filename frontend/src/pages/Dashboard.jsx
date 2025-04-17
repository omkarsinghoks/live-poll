import React from "react";
import { FaPlus, FaEdit, FaChartBar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import PollTableRow from "../components/PollTableRow/PollTableRow";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useStore";
import useLogout from "../hooks/useLogout";
import { useQuery } from "react-query";
import getUserPollData from "../services/getUserPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import { formatDataByDate } from "../utils/util";

function Dashboard() {
  const navigator = useNavigate();
  const { handleLogout } = useLogout();
  const { user } = useUserStore();

  const { data, isLoading, isError, refetch, isSuccess } = useQuery(
    ["polls", user._id],
    getUserPollData,
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* User Profile Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 flex flex-col items-center lg:min-h-screen">
          <div className="relative mb-6">
            <img
              src={`https://placehold.co/200x200?text=${
                user?.username[0]?.toUpperCase() || "U"
              }`}
              alt="User Profile"
              className="rounded-full h-28 w-28 object-cover border-4 border-cyan-500/30"
            />
            <div className="absolute -bottom-2 -right-2 bg-cyan-500 rounded-full p-2 border-2 border-gray-900">
              <FaEdit className="text-white text-sm" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white">
            {user?.username || "User"}
          </h2>
          <p className="mt-1 text-center text-gray-400 text-sm">
            {user?.email || "email@example.com"}
          </p>

          <div className="w-full mt-8 space-y-3">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors font-medium"
              onClick={() => navigator("/create")}
            >
              <FaPlus /> Create Poll
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium">
              <FaChartBar /> View Analytics
            </button>

            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-lg transition-colors font-medium mt-12"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>

        {/* Dashboard Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Your Poll Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your polls, track results, and engage with your audience
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Total Polls</p>
              <p className="text-2xl font-bold text-white">
                {isSuccess ? data.length : "--"}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Active Polls</p>
              <p className="text-2xl font-bold text-white">
                {isSuccess ? data.filter(poll => poll.published).length : "--"}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Total Votes</p>
              <p className="text-2xl font-bold text-white">
                {isSuccess ? data.reduce((sum, poll) => sum + (poll.totalVotes || 0), 0) : "--"}
              </p>
            </div>
          </div>

          {/* Polls Table Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {isError && (
              <div className="h-60 w-full flex items-center justify-center">
                <ErrorFallback onRetry={refetch} />
              </div>
            )}

            {isLoading && (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
                ))}
              </div>
            )}

            {isSuccess && (
              <>
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Your Polls</h3>
                  <span className="text-sm text-gray-400">
                    {data.length} {data.length === 1 ? "poll" : "polls"}
                  </span>
                </div>

                {data.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <FaPlus className="h-12 w-12 mx-auto opacity-50" />
                    </div>
                    <h3 className="text-xl text-gray-300 mb-2">
                      No polls created yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Get started by creating your first poll
                    </p>
                    <button
                      className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                      onClick={() => navigator("/create")}
                    >
                      Create Poll
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/10">
                        <tr>
                          <th className="p-4 text-left text-gray-300 font-medium">#</th>
                          <th className="p-4 text-left text-gray-300 font-medium">Title</th>
                          <th className="p-4 text-left text-gray-300 font-medium">Status</th>
                          <th className="p-4 text-left text-gray-300 font-medium">Votes</th>
                          <th className="p-4 text-right text-gray-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {formatDataByDate(data)?.map((poll, index) => (
                          <PollTableRow key={poll._id} refetch={refetch} poll={poll} index={index} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;