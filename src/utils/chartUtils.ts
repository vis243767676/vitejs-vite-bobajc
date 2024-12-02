import { ChartOptions } from 'chart.js';
import { WorkoutStats } from '../types/video';

export const getChartOptions = (title: string): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
      font: {
        size: 16,
        weight: 'bold'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `${value}%`
      }
    }
  }
});

export function aggregateWeeklyStats(stats: WorkoutStats[]) {
  return stats.reduce((acc, stat) => ({
    totalDuration: acc.totalDuration + stat.duration,
    totalCalories: acc.totalCalories + stat.caloriesBurned,
    averageAccuracy: acc.averageAccuracy + stat.accuracy,
    workoutCount: acc.workoutCount + 1
  }), {
    totalDuration: 0,
    totalCalories: 0,
    averageAccuracy: 0,
    workoutCount: 0
  });
}