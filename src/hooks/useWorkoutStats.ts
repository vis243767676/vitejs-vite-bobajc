import { create } from 'zustand';
import { WorkoutStats } from '../types/video';

interface WorkoutStatsStore {
  stats: WorkoutStats[];
  updateStats: (newStats: WorkoutStats) => void;
  getWeeklyStats: () => WorkoutStats[];
}

export const useWorkoutStats = create<WorkoutStatsStore>((set, get) => ({
  stats: [],
  updateStats: (newStats) => {
    set((state) => ({
      stats: [...state.stats, newStats]
    }));
  },
  getWeeklyStats: () => {
    const stats = get().stats;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return stats.filter(stat => {
      const statDate = new Date(stat.date);
      return statDate >= weekAgo && statDate <= now;
    });
  }
}));