import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const sampleQuiz = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HyperText Markdown Language",
      "HyperText Making Line",
    ],
    answer: 1,
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Netflix"],
    answer: 2,
  },
  {
    question: "What is Tailwind CSS?",
    options: [
      "A preprocessor",
      "A UI framework",
      "A utility-first CSS framework",
      "A CSS-in-JS library",
    ],
    answer: 2,
  },
];

// Thời gian làm bài tính theo giây
const TOTAL_TIME_SECONDS = 60;

export default function TakeQUiz() {
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [countdown, setCountdown] = useState(TOTAL_TIME_SECONDS);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const testId = useParams();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  useEffect(() => {
    const fetchTest = async () => {
      console.log(testId);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tests/${testId.id}/questions`);
      console.log(response.data);
    };
    fetchTest();
    if (isFinished) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          submitQuiz();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const selectAnswer = (index) => {
    if (isFinished) return;
    setSelectedAnswers({ ...selectedAnswers, [current]: index });
  };

  const nextQuestion = () => {
    if (current < sampleQuiz.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const submitQuiz = () => {
    let totalScore = 0;
    sampleQuiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) totalScore += 1;
    });
    setScore(totalScore);
    setIsFinished(true);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setSelectedAnswers({});
    setCountdown(TOTAL_TIME_SECONDS);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Question {current + 1} / {sampleQuiz.length}
          </h2>
          <div className={`text-sm font-semibold text-red-600 ${isFinished ? 'opacity-0' : 'opacity-100'}`}>
            ⏳ {formatTime(countdown)}
          </div>
        </div>

        {!isFinished ? (
          <>
            <p className="text-lg font-medium mb-4">
              {sampleQuiz[current].question}
            </p>
            <ul className="space-y-3 mb-6">
            {sampleQuiz[current].options.map((opt, i) => {
                const isCorrect = sampleQuiz[current].answer === i;
                const isSelected = selectedAnswers[current] === i;

                let optionStyle = "hover:bg-indigo-50 border-gray-300";
                if (isFinished) {
                if (isCorrect) {
                    optionStyle = "bg-green-100 border-green-400";
                } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-red-100 border-red-400";
                }
                } else if (isSelected) {
                optionStyle =
                    "bg-indigo-100 border-indigo-400 ring-2 ring-indigo-300";
                }

                return (
                <li
                    key={i}
                    onClick={() => !isFinished && selectAnswer(i)}
                    className={`px-4 py-3 rounded-xl border cursor-pointer transition-all ${optionStyle}`}
                >
                    {opt}
                </li>
                );
            })}
            </ul>


            <div className="flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className={`px-4 py-2 rounded-lg font-medium ${
                  current === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                ← Back
              </button>
              {current === sampleQuiz.length - 1 ? (
                <button
                  onClick={submitQuiz}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit ✅
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                  Next →
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
            <p className="text-lg mb-6">
              You scored{" "}
              <span className="font-bold text-indigo-600">
                {score}/{sampleQuiz.length}
              </span>
            </p>
            <button
              onClick={resetQuiz}
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Retry 🔁
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
