import { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import { drawSkeleton } from '../utils/poseUtils';
import { WORKOUT_CATEGORIES } from '../types/categories';

export function usePoseDetection(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  category?: string
) {
  const [poseAccuracy, setPoseAccuracy] = useState(0);
  const detectorRef = useRef<poseDetection.PoseDetector>();
  const requestRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeDetector = async () => {
    try {
      await tf.setBackend('webgl');
      await tf.ready();

      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { 
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true
        }
      );
      
      detectorRef.current = detector;
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing pose detector:', error);
    }
  };

  const detectPose = async () => {
    if (!detectorRef.current || !videoRef.current || !canvasRef.current || !isInitialized) return;

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current, {
        flipHorizontal: false
      });
      
      if (poses.length > 0) {
        const accuracy = calculatePoseAccuracy(poses[0], category);
        setPoseAccuracy(accuracy);
        
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          drawSkeleton(poses[0].keypoints, ctx);
        }
      }

      requestRef.current = requestAnimationFrame(detectPose);
    } catch (error) {
      console.error('Error detecting pose:', error);
    }
  };

  const startPoseDetection = async () => {
    if (!isInitialized) {
      await initializeDetector();
    }
    detectPose();
  };

  const stopPoseDetection = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  useEffect(() => {
    initializeDetector();
    return () => {
      stopPoseDetection();
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  return { startPoseDetection, stopPoseDetection, poseAccuracy };
}

function calculatePoseAccuracy(pose: poseDetection.Pose, category?: string): number {
  if (!pose.keypoints) return 0;

  // Get the main category for the current workout
  const mainCategory = category ? 
    WORKOUT_CATEGORIES.find(cat => cat.subCategories.some(sub => sub.id === category))?.id : 
    null;

  // Define key points to focus on based on the category
  const keyPointsToCheck = getKeyPointsForCategory(mainCategory || '');
  
  // Calculate accuracy only for the relevant keypoints
  const relevantKeypoints = pose.keypoints.filter(kp => 
    keyPointsToCheck.includes(kp.name || '')
  );

  const scores = relevantKeypoints.map(kp => kp.score || 0);
  return (scores.reduce((a, b) => a + b, 0) / scores.length) * 100;
}

function getKeyPointsForCategory(category: string): string[] {
  switch (category) {
    case 'strength-training':
      return [
        'left_shoulder', 'right_shoulder',
        'left_elbow', 'right_elbow',
        'left_wrist', 'right_wrist',
        'left_hip', 'right_hip'
      ];
    case 'cardio-fitness':
      return [
        'left_hip', 'right_hip',
        'left_knee', 'right_knee',
        'left_ankle', 'right_ankle'
      ];
    case 'mind-body':
      return [
        'left_shoulder', 'right_shoulder',
        'left_hip', 'right_hip',
        'left_knee', 'right_knee',
        'nose', 'left_ear', 'right_ear'
      ];
    case 'dance-movement':
      return [
        'left_shoulder', 'right_shoulder',
        'left_hip', 'right_hip',
        'left_knee', 'right_knee',
        'left_ankle', 'right_ankle'
      ];
    default:
      return [
        'nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear',
        'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
        'left_wrist', 'right_wrist', 'left_hip', 'right_hip',
        'left_knee', 'right_knee', 'left_ankle', 'right_ankle'
      ];
  }
}