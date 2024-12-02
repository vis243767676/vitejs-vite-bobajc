import { WORKOUT_CATEGORIES } from '../types/categories';
import { useWorkoutStore } from '../store/workoutStore';
import {
  BoltIcon,
  HeartIcon,
  SparklesIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

const CATEGORY_ICONS: Record<string, any> = {
  'strength-training': BoltIcon,
  'cardio-fitness': HeartIcon,
  'mind-body': SparklesIcon,
  'dance-movement': MusicalNoteIcon,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'strength-training': 'from-orange-500 to-red-600',
  'cardio-fitness': 'from-pink-500 to-rose-600',
  'mind-body': 'from-purple-500 to-indigo-600',
  'dance-movement': 'from-blue-500 to-cyan-600',
};

export default function CategoryList() {
  const setSelectedCategory = useWorkoutStore((state) => state.setSelectedCategory);
  const selectedCategory = useWorkoutStore((state) => state.selectedCategory);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold">Workout Categories</h2>
        <p className="text-blue-100 mt-2 text-sm md:text-base">Choose your preferred workout style</p>
      </div>
      
      <div className="p-4 md:p-6 space-y-6 md:space-y-8">
        {WORKOUT_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];
          const gradient = CATEGORY_GRADIENTS[category.id];
          
          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{category.name}</h3>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {category.subCategories.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() => setSelectedCategory(subCategory.id)}
                    className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedCategory === subCategory.id
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105`
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    <div className="relative p-3 md:p-4">
                      <div className="font-semibold text-base md:text-lg mb-1">{subCategory.name}</div>
                      <div className={`text-xs md:text-sm ${
                        selectedCategory === subCategory.id ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {subCategory.description}
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ${
                      selectedCategory === subCategory.id
                        ? 'bg-white/30'
                        : 'bg-transparent group-hover:bg-gray-200'
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}