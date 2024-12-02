import { useState, useCallback } from 'react';
import CameraView from './CameraView';
import { WorkoutVideo } from '../types/video';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { useWorkoutStats } from '../hooks/useWorkoutStats';
import { speak } from '../utils/speechUtils';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { WORKOUT_CATEGORIES } from '../types/categories';

interface WorkoutViewProps {
  video: WorkoutVideo;
  onComplete: () => void;
}

export default function WorkoutView({ video, onComplete }: WorkoutViewProps) {
  const [poseAccuracy, setPoseAccuracy] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const { updateStats } = useWorkoutStats();

  const mainCategory = WORKOUT_CATEGORIES.find(cat => 
    cat.subCategories.some(sub => sub.id === video.category)
  );
  const subCategory = mainCategory?.subCategories.find(sub => sub.id === video.category);

  const handleVoiceCommands = {
    onPlay: () => setIsActive(true),
    onPause: () => setIsActive(false),
    onRestart: () => {
      setIsActive(true);
      setPoseAccuracy(0);
    },
  };

  useVoiceCommands(handleVoiceCommands);

  const handlePoseDetected = useCallback((accuracy: number) => {
    setPoseAccuracy(accuracy);
    
    if (accuracy < 50 && isActive) {
      speak("Please correct your form!");
    }
  }, [isActive]);

  const handleComplete = () => {
    updateStats({
      date: new Date().toISOString(),
      duration: video.duration,
      accuracy: poseAccuracy,
      caloriesBurned: Math.round(video.duration * 5 * (poseAccuracy / 100)),
      completedExercises: [video.title],
    });
    onComplete();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onComplete}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6" />
          <span>Back to Workouts</span>
        </button>
        <div className="h-8 w-px bg-gray-200"></div>
        <div>
          <div className="text-sm text-gray-500">{mainCategory?.name} / {subCategory?.name}</div>
          <h2 className="text-2xl font-bold">{video.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <video
              src={video.videoUrl}
              className="w-full"
              controls
              autoPlay
              onEnded={handleComplete}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Workout Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Key Points:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {video.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Target Muscles:</h4>
                <div className="flex flex-wrap gap-2">
                  {video.targetMuscles.map((muscle, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Live Form Analysis</h3>
            <CameraView 
              onPoseDetected={handlePoseDetected}
              category={video.category}
            />
          </div>
        </div>
      </div>
    </div>
  );
}