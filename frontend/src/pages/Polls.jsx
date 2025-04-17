import React, { useState } from "react";
import { useQuery } from "react-query";
import getPollsService from "../services/getPollsService";
import PollCard from "../components/PollCard/PollCard";
import ErrorFallback from "../components/Errors/ErrorFallback";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

function Polls() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["polls", page, limit],
    () => getPollsService(page, limit),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
      keepPreviousData: true // Smooth transition between pages
    }
  );

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.data?.totalPages > page) setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Community Polls</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and vote on community-created polls
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {isSuccess && (
            <>
              {data?.data?.polls?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.data.polls.map((poll) => (
                    <PollCard key={poll._id} poll={poll} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No polls found</div>
                  <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition"
                  >
                    Refresh
                  </button>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <ImSpinner8 className="animate-spin text-indigo-500 text-3xl mb-4" />
              <p className="text-gray-500">Loading polls...</p>
            </div>
          )}

          {isError && (
            <div className="flex justify-center py-8">
              <ErrorFallback onRetry={() => refetch()} />
            </div>
          )}

          {/* Pagination */}
          {(isSuccess && data?.data?.polls?.length > 0) && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Page {page} of {data?.data?.totalPages || 1} • {data?.data?.totalPolls || 0} polls total
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition ${
                    page <= 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`}
                  disabled={page <= 1}
                  onClick={handlePrevPage}
                >
                  <FiChevronLeft className="text-lg" />
                  <span>Previous</span>
                </button>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition ${
                    data?.data?.totalPages <= page
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`}
                  disabled={data?.data?.totalPages <= page}
                  onClick={handleNextPage}
                >
                  <span>Next</span>
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Polls;