
import React, { useState } from 'react';
import { getQuizFeedback } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface WellnessQuizProps {
  onComplete: (score: number) => void;
}

const questions = [
  { id: 'q1', text: '🧘 On a scale of 1 to 5, how often do you feel calm and emotionally balanced during the week?', inverted: true },
  { id: 'q2', text: '💭 On a scale of 1 to 5, how clearly do you understand what’s causing your stress or emotional challenges?', inverted: true },
  { id: 'q3', text: '❤️ On a scale of 1 to 5, how supported do you feel when expressing your emotions in therapy?', inverted: true },
  { id: 'q4', text: '😔 On a scale of 1 to 5, how much do your current emotions interfere with your daily activities?', inverted: false },
  { id: 'q5', text: '🌈 On a scale of 1 to 5, how hopeful do you feel about improving your emotional well-being through therapy?', inverted: true },
];

const WellnessQuiz: React.FC<WellnessQuizProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    q1: null, q2: null, q3: null, q4: null, q5: null,
  });
  const [stage, setStage] = useState<'answering' | 'calculating' | 'result'>('answering');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = Object.values(answers).every(answer => answer !== null);

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setStage('calculating');

    let rawScore = 0;
    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        // For a stress score:
        // inverted=true means a high answer (e.g., 5/5 calm) is LOW stress. So we calculate (6 - answer) to get a low stress contribution.
        // inverted=false means a high answer (e.g., 5/5 interference) is HIGH stress. We use the answer directly.
        rawScore += q.inverted ? (6 - answer) : answer;
      }
    });

    // Min raw score is 5, max is 25.
    // Normalize to a 1-10 scale.
    const normalizedScore = ((rawScore - 5) / 20) * 9 + 1;
    const finalScore = parseFloat(normalizedScore.toFixed(1));

    setScore(finalScore);

    const feedbackMessage = await getQuizFeedback(finalScore);
    setFeedback(feedbackMessage);
    
    setStage('result');
  };

  const renderQuestions = () => (
    <div className="w-full max-w-lg text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">Quick Stress Check-in</h1>
      <p className="text-slate-400 mb-8">Let's see how you're feeling. This is just for you.</p>
      <div className="bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-700 space-y-8">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="text-slate-200 text-left mb-3 text-lg">{q.text}</p>
            <div className="flex justify-between items-center gap-2">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  onClick={() => handleAnswer(q.id, value)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-200 ${
                    answers[q.id] === value 
                      ? 'bg-violet-600 text-white scale-110' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  aria-pressed={answers[q.id] === value}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full flex items-center justify-center px-4 py-3 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 mt-4"
        >
          See My Score
        </button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="w-full max-w-lg text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">Your Stress Level</h1>
        <div className="bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-700 flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                        className="text-slate-700"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    />
                    <path
                        className="text-violet-400 transition-all duration-1000 ease-out"
                        strokeDasharray={`${(score ?? 0) * 10}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-bold text-slate-100">{score}</span>
                    <span className="text-slate-400">out of 10</span>
                </div>
            </div>
            <p className="text-slate-300 text-lg mb-8 h-12">{feedback || ' '}</p>
            <button
                onClick={() => onComplete(score!)}
                className="w-full flex items-center justify-center px-4 py-3 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition-colors duration-200"
            >
                Continue to App
            </button>
        </div>
    </div>
  );

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      {stage === 'answering' && renderQuestions()}
      {stage === 'calculating' && <LoadingSpinner className="w-16 h-16" />}
      {stage === 'result' && renderResult()}
    </div>
  );
};

export default WellnessQuiz;
