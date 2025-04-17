import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigator = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl mt-2 md:text-6xl font-bold mb-6 text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">LivePoll</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Engage with real-time, interactive polling. Create dynamic polls, participate in
            active discussions, and visualize instant feedback. Your voice matters!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-cyan-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Create Polls</h2>
            <p className="text-gray-300 text-center">
              Craft custom polls on any topic. Set options, configure permissions, and watch real-time responses.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Vote & Participate</h2>
            <p className="text-gray-300 text-center">
              Explore diverse public polls or join private ones. Vote and see live results as the community engages.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-pink-400/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-pink-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Bookmark & Track</h2>
            <p className="text-gray-300 text-center">
              Save favorite polls, review your participation history, and stay updated on important topics.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => navigator("/dashboard")}
          >
            Create Your First Poll
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home