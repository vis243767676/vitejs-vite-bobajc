export interface WorkoutCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
}

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  {
    id: 'strength-training',
    name: 'Strength Training',
    subCategories: [
      {
        id: 'bodyweight',
        name: 'Bodyweight Exercises',
        description: 'Build strength using your own body weight'
      },
      {
        id: 'weightlifting',
        name: 'Weightlifting',
        description: 'Progressive strength training with weights'
      },
      {
        id: 'resistance',
        name: 'Resistance Training',
        description: 'Strength training using resistance bands and equipment'
      }
    ]
  },
  {
    id: 'cardio-fitness',
    name: 'Cardio Fitness',
    subCategories: [
      {
        id: 'aerobics',
        name: 'Aerobics',
        description: 'High-energy cardio workouts'
      },
      {
        id: 'spinning',
        name: 'Spinning',
        description: 'Indoor cycling workouts'
      },
      {
        id: 'hiit',
        name: 'HIIT',
        description: 'High-intensity interval training'
      }
    ]
  },
  {
    id: 'mind-body',
    name: 'Mind and Body',
    subCategories: [
      {
        id: 'yoga',
        name: 'Yoga',
        description: 'Balance, flexibility, and mindfulness'
      },
      {
        id: 'pilates',
        name: 'Pilates',
        description: 'Core strength and body control'
      },
      {
        id: 'meditation',
        name: 'Meditation',
        description: 'Mental wellness and mindfulness practices'
      }
    ]
  },
  {
    id: 'dance-movement',
    name: 'Dance and Movement',
    subCategories: [
      {
        id: 'zumba',
        name: 'Zumba',
        description: 'Dance-based cardio workouts'
      },
      {
        id: 'hip-hop',
        name: 'Hip Hop',
        description: 'Hip hop dance workouts'
      },
      {
        id: 'dance-aerobics',
        name: 'Dance Aerobics',
        description: 'Aerobic exercises with dance elements'
      }
    ]
  }
];