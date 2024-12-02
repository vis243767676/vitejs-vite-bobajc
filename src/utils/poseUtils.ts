import { Pose } from '@tensorflow-models/pose-detection';

export const POSE_CONNECTIONS = [
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['right_shoulder', 'right_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['right_hip', 'right_knee'],
  ['left_knee', 'left_ankle'],
  ['right_knee', 'right_ankle'],
];

export function drawSkeleton(keypoints: Pose['keypoints'], ctx: CanvasRenderingContext2D) {
  // Draw connections
  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = 2;

  POSE_CONNECTIONS.forEach(([start, end]) => {
    const startPoint = keypoints.find(kp => kp.name === start);
    const endPoint = keypoints.find(kp => kp.name === end);

    if (startPoint && endPoint && startPoint.score && endPoint.score) {
      const isGoodPose = startPoint.score > 0.7 && endPoint.score > 0.7;
      ctx.strokeStyle = isGoodPose ? '#00FF00' : '#FF0000';
      
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  });

  // Draw keypoints
  keypoints.forEach(keypoint => {
    if (keypoint.score && keypoint.score > 0.3) {
      ctx.fillStyle = keypoint.score > 0.7 ? '#00FF00' : '#FF0000';
      ctx.beginPath();
      ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
}

export function calculatePoseConfidence(keypoints: Pose['keypoints']): number {
  const confidenceThreshold = 0.3;
  const validKeypoints = keypoints.filter(kp => (kp.score || 0) > confidenceThreshold);
  return (validKeypoints.length / keypoints.length) * 100;
}

export function getPoseMessage(accuracy: number): { message: string; type: 'success' | 'warning' | 'error' } {
  if (accuracy >= 80) {
    return {
      message: 'Great form! Keep it up!',
      type: 'success'
    };
  } else if (accuracy >= 60) {
    return {
      message: 'Good form, but try to maintain better posture',
      type: 'warning'
    };
  } else {
    return {
      message: 'Please correct your form',
      type: 'error'
    };
  }
}