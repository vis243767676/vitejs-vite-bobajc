export function calculateCaloriesBurn(
  duration: number,
  intensity: number,
  weight: number = 70 // default weight in kg
): number {
  // MET (Metabolic Equivalent of Task) values
  const metValues = {
    low: 3.0,    // Light exercise
    medium: 5.0,  // Moderate exercise
    high: 7.0     // Vigorous exercise
  };

  // Calculate intensity level
  let met;
  if (intensity < 60) met = metValues.low;
  else if (intensity < 80) met = metValues.medium;
  else met = metValues.high;

  // Calories = MET × weight (kg) × duration (hours)
  return Math.round((met * weight * (duration / 60)) * 1.05); // Adding 5% for additional energy expenditure
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}min`;
  return `${hours}h ${remainingMinutes}min`;
}

export function getIntensityLevel(accuracy: number): 'low' | 'medium' | 'high' {
  if (accuracy < 60) return 'low';
  if (accuracy < 80) return 'medium';
  return 'high';
}