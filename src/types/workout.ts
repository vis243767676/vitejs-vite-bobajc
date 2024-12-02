export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'none' | 'dumbbells' | 'resistance-bands' | 'full-gym';

export interface UserProfile {
  age: number;
  fitnessLevel: FitnessLevel;
  equipment: Equipment[];
  availableMinutes: number;
  goals: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
  videoUrl?: string;
}

export interface Workout {
  id: string;
  day: string;
  exercises: Exercise[];
  duration: number;
  difficulty: FitnessLevel;
}