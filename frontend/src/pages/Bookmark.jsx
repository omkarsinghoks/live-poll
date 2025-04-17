import React from "react";
import { getUserBookmarks } from "../services/getUserBookmarks";
import { useQuery, useQueryClient } from "react-query";
import ErrorFallback from "../components/Errors/ErrorFallback";
import useBookmark from "../hooks/useBookmark";
import { useNavigate } from "react-router-dom";
import { formatDataByDate } from "../utils/util";

function Bookmark() {
  const { handleBookmark } = useBookmark();
  const navigator = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isSuccess } = useQuery(
    ["bookmarks"],
    getUserBookmarks,
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
    }
  );

  const handleViewPollClick = (pollId) => {
    navigator(`/view/${pollId}`);
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    queryClient.setQueryData(["bookmarks"], (oldData) => {
      return {
        ...oldData,
        data: oldData.data.filter((bookmark) => bookmark._id !== bookmarkId),
      };
    });
    await handleBookmark(bookmarkId);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Your Saved Polls
          </h1>
          <div className="text-gray-300">
            {isSuccess && `${data.data.length} bookmarks`}
          </div>
        </div>

        {isError && (
          <div className="h-60 w-full flex items-center justify-center">
            <ErrorFallback onRetry={refetch} />
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-white/10 rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}

        {isSuccess && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {data.data.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-300 mb-2">
                  No bookmarks yet
                </h3>
                <p className="text-gray-500">
                  Save interesting polls to find them here later
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="p-4 text-left text-gray-300 font-medium">#</th>
                      <th className="p-4 text-left text-gray-300 font-medium">Title</th>
                      <th className="p-4 text-left text-gray-300 font-medium">Description</th>
                      <th className="p-4 text-right text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {formatDataByDate(data.data).map((bookmark, index) => (
                      <tr key={bookmark._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-gray-300">{index + 1}</td>
                        <td className="p-4">
                          <div className="text-white font-medium">
                            {bookmark.title}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-400 max-w-xs line-clamp-2">
                            {bookmark.description}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewPollClick(bookmark._id)}
                              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm md:text-base"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleRemoveBookmark(bookmark._id)}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors text-sm md:text-base"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmark;