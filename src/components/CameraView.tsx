import { useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { getFormFeedback } from '../utils/formGuidance';
import { FeedbackDisplay } from './FeedbackDisplay';

interface CameraViewProps {
  onPoseDetected: (accuracy: number) => void;
  category: string;
}

export default function CameraView({ onPoseDetected, category }: CameraViewProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { startPoseDetection, stopPoseDetection, poseAccuracy } = usePoseDetection(
    videoRef,
    canvasRef,
    category
  );

  const initializeVideo = useCallback(() => {
    if (webcamRef.current?.video) {
      videoRef.current = webcamRef.current.video;
      
      if (canvasRef.current && videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }
      
      startPoseDetection();
    }
  }, [startPoseDetection]);

  useEffect(() => {
    const checkVideo = setInterval(() => {
      if (webcamRef.current?.video?.readyState === 4) {
        initializeVideo();
        clearInterval(checkVideo);
      }
    }, 100);

    return () => {
      stopPoseDetection();
      clearInterval(checkVideo);
    };
  }, [initializeVideo, stopPoseDetection]);

  useEffect(() => {
    onPoseDetected(poseAccuracy);
  }, [poseAccuracy, onPoseDetected]);

  const feedback = getFormFeedback(category, poseAccuracy);

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="w-full rounded-lg"
          mirrored
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user",
            aspectRatio: 4/3
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      </div>

      <div className="mt-4">
        <FeedbackDisplay feedback={feedback} accuracy={poseAccuracy} />
      </div>
    </div>
  );
}