import { useWorkoutStore } from '../store/workoutStore';
import { WORKOUT_CATEGORIES } from '../types/categories';
import { WorkoutVideo } from '../types/video';
import { ChevronLeftIcon, ClockIcon, FireIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'strength-training': 'from-orange-500 to-red-600',
  'cardio-fitness': 'from-pink-500 to-rose-600',
  'mind-body': 'from-purple-500 to-indigo-600',
  'dance-movement': 'from-blue-500 to-cyan-600',
};

interface VideoListProps {
  onSelectVideo: (video: WorkoutVideo) => void;
}

export default function VideoList({ onSelectVideo }: VideoListProps) {
  const workoutPlan = useWorkoutStore((state) => state.workoutPlan);
  const selectedCategory = useWorkoutStore((state) => state.selectedCategory);
  const setSelectedCategory = useWorkoutStore((state) => state.setSelectedCategory);

  const mainCategory = WORKOUT_CATEGORIES.find(cat => 
    cat.subCategories.some(sub => sub.id === selectedCategory)
  );
  const subCategory = mainCategory?.subCategories.find(sub => sub.id === selectedCategory);

  if (!mainCategory || !subCategory) return null;

  const gradient = CATEGORY_GRADIENTS[mainCategory.id];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6 md:mt-8">
      <div className={`bg-gradient-to-r ${gradient} p-4 md:p-6 text-white`}>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setSelectedCategory('')}
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
            <span>Back to Categories</span>
          </button>
          <div className="hidden md:block h-8 w-px bg-white/20"></div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{mainCategory.name}</h2>
            <p className="text-white/90 text-sm md:text-base mt-1">{subCategory.name} - Select your workout</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {workoutPlan.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-10`} />
                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 md:px-3 py-1 bg-white/90 text-gray-800 rounded-full text-xs md:text-sm font-medium">
                      <ClockIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      {video.duration} mins
                    </span>
                    <span className="inline-flex items-center px-2 md:px-3 py-1 bg-white/90 text-gray-800 rounded-full text-xs md:text-sm font-medium">
                      <FireIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      {video.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 md:p-5">
                  <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-800 group-hover:text-indigo-600">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-4">{video.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-xs md:text-sm">
                      <ChartBarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-500" />
                      <span className="text-gray-600">Intensity: Medium</span>
                    </span>
                    
                    <button className={`text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}