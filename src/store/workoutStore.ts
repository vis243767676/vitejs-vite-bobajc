import { create } from 'zustand';
import { WorkoutVideo, WorkoutStats } from '../types/video';

interface WorkoutStore {
  selectedCategory: string;
  workoutPlan: WorkoutVideo[];
  stats: WorkoutStats[];
  setSelectedCategory: (categoryId: string) => void;
  updateStats: (newStats: WorkoutStats) => void;
  getWeeklyStats: () => WorkoutStats[];
  generateWorkoutPlan: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  selectedCategory: '',
  workoutPlan: [],
  stats: [],
  
  setSelectedCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
    get().generateWorkoutPlan();
  },
  
  updateStats: (newStats) => set((state) => ({
    stats: [...state.stats, newStats]
  })),
  
  getWeeklyStats: () => {
    const stats = get().stats;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return stats.filter(stat => {
      const statDate = new Date(stat.date);
      return statDate >= weekAgo && statDate <= now;
    });
  },
  
  generateWorkoutPlan: () => {
    const selectedCategory = get().selectedCategory;
    
    // In a real application, this would call an AI service
    // For now, we'll generate a placeholder plan
    const dummyPlan: WorkoutVideo[] = [
      {
        id: '1',
        title: 'Sample Workout',
        description: 'A sample workout for the selected category',
        difficulty: 'beginner',
        duration: 30,
        videoUrl: 'https://example.com/sample-video.mp4',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        category: selectedCategory,
        keyPoints: ['Form is important', 'Stay hydrated'],
        targetMuscles: ['Core', 'Full body']
      }
    ];
    
    set({ workoutPlan: dummyPlan });
  }
}));