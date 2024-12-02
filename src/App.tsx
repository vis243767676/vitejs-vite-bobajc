import { useState } from 'react';
import WorkoutPlan from './components/WorkoutPlan';
import WorkoutView from './components/WorkoutView';
import WorkoutStats from './components/WorkoutStats';
import { WorkoutVideo } from './types/video';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState<WorkoutVideo | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full md:block hidden">
          <img 
            src="/workout-banner.jpg" 
            alt="Workout" 
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-600"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="py-6 md:py-12 px-4">
            <div className="flex items-center justify-between">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  AI-Powered Workout Experience
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
                  Transform your fitness journey with real-time pose detection and 
                  personalized voice guidance.
                </p>
              </div>
            </div>
          </header>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <main className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
        <div className="space-y-12">
          {selectedVideo ? (
            <WorkoutView 
              video={selectedVideo} 
              onComplete={() => setSelectedVideo(null)} 
            />
          ) : (
            <>
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Choose Your Workout
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Select from our wide range of AI-powered workouts with real-time form correction.
                </p>
              </div>
              <WorkoutPlan onSelectVideo={setSelectedVideo} />
            </>
          )}
          <WorkoutStats />
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">AI Workout Planner</h3>
              <p className="text-gray-400 leading-relaxed">
                Experience the future of fitness with our AI-powered workout platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Key Features</h3>
              <ul className="space-y-3 md:space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Real-time pose detection
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Voice command support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Progress tracking
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Get Started</h3>
              <p className="text-gray-400 leading-relaxed">
                Choose a workout category and begin your fitness journey with our 
                AI-guided sessions.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Workout Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}