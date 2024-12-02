import { Line } from 'react-chartjs-2';
import { useWorkoutStats } from '../hooks/useWorkoutStats';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WorkoutStats() {
  const { stats, getWeeklyStats } = useWorkoutStats();
  const weeklyStats = getWeeklyStats();

  const chartData = {
    labels: weeklyStats.map(stat => format(new Date(stat.date), 'MMM d')),
    datasets: [
      {
        label: 'Workout Duration (minutes)',
        data: weeklyStats.map(stat => stat.duration),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Accuracy (%)',
        data: weeklyStats.map(stat => stat.accuracy),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Weekly Workout Progress',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Your Workout Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-blue-800">Total Workouts</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-900">{stats.length}</p>
        </div>
        
        <div className="bg-green-50 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-green-800">Total Minutes</h3>
          <p className="text-2xl md:text-3xl font-bold text-green-900">
            {stats.reduce((acc, stat) => acc + stat.duration, 0)}
          </p>
        </div>
        
        <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-purple-800">Avg. Accuracy</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-900">
            {Math.round(
              stats.reduce((acc, stat) => acc + stat.accuracy, 0) / (stats.length || 1)
            )}%
          </p>
        </div>
      </div>

      <div className="h-64 md:h-96">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}