import { speak } from './speechUtils';
import { WORKOUT_CATEGORIES } from '../types/categories';

interface FormGuidance {
  message: string;
  voicePrompt: string;
  keyPoints: string[];
}

const FORM_GUIDANCE: Record<string, Record<string, FormGuidance>> = {
  'strength-training': {
    'bodyweight': {
      message: 'Keep your core engaged and maintain proper alignment',
      voicePrompt: 'Engage your core and watch your form',
      keyPoints: ['shoulders_aligned', 'back_straight', 'core_engaged']
    },
    'weightlifting': {
      message: 'Watch your back position and control the movement',
      voicePrompt: 'Keep your back straight and movements controlled',
      keyPoints: ['spine_neutral', 'shoulders_stable', 'controlled_motion']
    },
    'resistance': {
      message: 'Maintain tension and control throughout the movement',
      voicePrompt: 'Keep the resistance band tension steady',
      keyPoints: ['controlled_tension', 'balanced_stance', 'smooth_motion']
    }
  },
  'cardio-fitness': {
    'aerobics': {
      message: 'Keep your movements dynamic and maintain rhythm',
      voicePrompt: 'Stay on beat and keep moving',
      keyPoints: ['rhythm_maintained', 'full_range_motion', 'high_energy']
    },
    'spinning': {
      message: 'Maintain proper posture and pedal smoothly',
      voicePrompt: 'Keep your back straight and pedal smoothly',
      keyPoints: ['back_straight', 'shoulders_relaxed', 'smooth_pedaling']
    },
    'hiit': {
      message: 'Explosive movements with controlled form',
      voicePrompt: 'Power through but maintain control',
      keyPoints: ['explosive_power', 'controlled_landing', 'full_extension']
    }
  },
  'mind-body': {
    'yoga': {
      message: 'Focus on breath and maintain steady poses',
      voicePrompt: 'Breathe deeply and hold your pose',
      keyPoints: ['alignment_centered', 'breathing_steady', 'balance_maintained']
    },
    'pilates': {
      message: 'Keep your core engaged and movements precise',
      voicePrompt: 'Engage your core and move with precision',
      keyPoints: ['core_engaged', 'precise_movement', 'controlled_breath']
    },
    'meditation': {
      message: 'Maintain a straight spine and relaxed shoulders',
      voicePrompt: 'Keep your spine straight and shoulders relaxed',
      keyPoints: ['spine_straight', 'shoulders_relaxed', 'head_aligned']
    }
  },
  'dance-movement': {
    'zumba': {
      message: 'Follow the rhythm and keep your movements fluid',
      voicePrompt: 'Stay with the beat and keep moving',
      keyPoints: ['rhythm_matched', 'fluid_movement', 'energy_maintained']
    },
    'hip-hop': {
      message: 'Stay loose and follow the beat',
      voicePrompt: 'Feel the rhythm and stay loose',
      keyPoints: ['rhythm_matched', 'body_relaxed', 'energy_high']
    },
    'dance-aerobics': {
      message: 'Keep up the energy and maintain form',
      voicePrompt: 'Stay energetic and watch your form',
      keyPoints: ['high_energy', 'form_maintained', 'rhythm_matched']
    }
  }
};

export function getFormGuidance(category: string, accuracy: number): string {
  const mainCategory = WORKOUT_CATEGORIES.find(cat => 
    cat.subCategories.some(sub => sub.id === category)
  );
  const subCategory = mainCategory?.subCategories.find(sub => sub.id === category);

  if (!mainCategory || !subCategory) return '';

  const guidance = FORM_GUIDANCE[mainCategory.id]?.[subCategory.id];
  if (!guidance) return '';

  if (accuracy < 50) {
    speak(guidance.voicePrompt);
    return `${guidance.message}. Focus on: ${guidance.keyPoints.join(', ')}`;
  }

  return '';
}

export function getFormFeedback(category: string, accuracy: number): {
  message: string;
  type: 'success' | 'warning' | 'error';
} {
  const mainCategory = WORKOUT_CATEGORIES.find(cat => 
    cat.subCategories.some(sub => sub.id === category)
  );
  
  if (!mainCategory) {
    return {
      message: 'Keep exercising!',
      type: 'warning'
    };
  }

  if (accuracy >= 80) {
    return {
      message: 'Perfect form! Keep it up!',
      type: 'success'
    };
  }

  if (accuracy >= 60) {
    return {
      message: getFormGuidance(category, accuracy) || 'Good form, but room for improvement',
      type: 'warning'
    };
  }

  return {
    message: getFormGuidance(category, accuracy) || 'Please correct your form',
    type: 'error'
  };
}