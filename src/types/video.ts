export interface WorkoutVideo {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  keyPoints: string[];
  targetMuscles: string[];
}

export interface PoseDetectionResult {
  score: number;
  keypoints: Array<{
    x: number;
    y: number;
    score: number;
    name: string;
  }>;
}

export interface WorkoutStats {
  date: string;
  duration: number;
  accuracy: number;
  caloriesBurned: number;
  completedExercises: string[];
}