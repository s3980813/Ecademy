import React from 'react';

const QuizResults = ({ score, totalQuestions, onRetry }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
      <p className="text-lg mb-6">
        You scored{" "}
        <span className="font-bold text-indigo-600">
          {score}/{totalQuestions}
        </span>
        {" "}
        ({(score / totalQuestions * 100).toFixed(1)}%)
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Retry 🔁
      </button>
    </div>
  );
};

export default QuizResults; 