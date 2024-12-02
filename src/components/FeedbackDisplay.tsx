interface FeedbackDisplayProps {
  feedback: {
    message: string;
    type: 'success' | 'warning' | 'error';
  };
  accuracy: number;
}

export function FeedbackDisplay({ feedback, accuracy }: FeedbackDisplayProps) {
  return (
    <div className="space-y-3">
      <div className={`p-4 rounded-lg ${
        feedback.type === 'success' ? 'bg-green-50 border border-green-200' :
        feedback.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <div className={`text-lg font-medium ${
          feedback.type === 'success' ? 'text-green-800' :
          feedback.type === 'warning' ? 'text-yellow-800' :
          'text-red-800'
        }`}>
          {feedback.message}
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <div className="text-gray-700 font-medium">
          Current Accuracy
        </div>
        <div className={`text-lg font-bold ${
          accuracy >= 80 ? 'text-green-600' :
          accuracy >= 60 ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {Math.round(accuracy)}%
        </div>
      </div>
    </div>
  );
}