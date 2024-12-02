import { useEffect, useRef, useState } from 'react';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { useWorkoutStats } from '../hooks/useWorkoutStats';
import { WorkoutVideo } from '../types/video';

interface VideoPlayerProps {
  video: WorkoutVideo;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout>();

  const { startPoseDetection, stopPoseDetection, poseAccuracy } = usePoseDetection(
    videoRef,
    canvasRef
  );

  const { startVoiceRecognition, stopVoiceRecognition } = useVoiceCommands({
    onPlay: () => videoRef.current?.play(),
    onPause: () => videoRef.current?.pause(),
    onRestart: () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    },
  });

  const { updateStats } = useWorkoutStats();

  useEffect(() => {
    if (isPlaying) {
      startPoseDetection();
      startVoiceRecognition();
    } else {
      stopPoseDetection();
      stopVoiceRecognition();
    }

    return () => {
      stopPoseDetection();
      stopVoiceRecognition();
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    clearTimeout(inactivityTimer);
  };

  const handlePause = () => {
    setIsPlaying(false);
    // Set timer to check for inactivity
    const timer = setTimeout(() => {
      new SpeechSynthesisUtterance("Let's keep going! You're doing great!");
    }, 10000);
    setInactivityTimer(timer);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    updateStats({
      date: new Date().toISOString(),
      duration: videoRef.current?.duration || 0,
      accuracy: poseAccuracy,
      caloriesBurned: calculateCalories(video.duration, poseAccuracy),
      completedExercises: [video.title],
    });
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full rounded-lg shadow-lg"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleVideoEnd}
        controls
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Accuracy: {Math.round(poseAccuracy)}%
          </span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Duration: {video.duration} mins
          </span>
        </div>
      </div>
    </div>
  );
}

function calculateCalories(duration: number, accuracy: number): number {
  // Simple calculation - can be made more sophisticated
  return Math.round(duration * 5 * (accuracy / 100));
}