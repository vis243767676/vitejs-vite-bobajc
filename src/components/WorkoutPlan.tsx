import { useWorkoutStore } from '../store/workoutStore';
import CategoryList from './CategoryList';
import VideoList from './VideoList';

interface WorkoutPlanProps {
  onSelectVideo: (video: any) => void;
}

export default function WorkoutPlan({ onSelectVideo }: WorkoutPlanProps) {
  const selectedCategory = useWorkoutStore((state) => state.selectedCategory);

  return (
    <div className="space-y-6">
      <CategoryList />
      {selectedCategory && <VideoList onSelectVideo={onSelectVideo} />}
    </div>
  );
}