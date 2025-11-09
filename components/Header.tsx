import React from 'react';
import { HeartPulseIcon } from './icons';

interface HeaderProps {
    score: number | null;
    onRetakeQuiz: () => void;
    onlineUsers: number;
}

const Header: React.FC<HeaderProps> = ({ score, onRetakeQuiz, onlineUsers }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 left-0 right-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <HeartPulseIcon className="w-8 h-8 text-violet-400"/>
                <h1 className="text-xl font-bold tracking-tight text-slate-100">
                  ZenVibe
                </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{onlineUsers} online</span>
            </div>
        </div>

        {score !== null && (
            <button 
                onClick={onRetakeQuiz}
                className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1.5 hover:bg-slate-700 transition-colors"
                title="Retake Stress Check-in"
                aria-label="Your current stress level score. Click to retake the check-in."
            >
                <div className="text-right">
                    <span className="text-xs text-slate-400 leading-none block">Stress Level</span>
                    <span className="font-bold text-lg text-slate-100 leading-none">{score.toFixed(1)}</span>
                </div>
                 <div className="w-8 h-8 flex items-center justify-center bg-violet-500/20 rounded-full">
                    <span role="img" aria-label="brain emoji" className="text-lg">🧠</span>
                </div>
            </button>
        )}

      </div>
    </header>
  );
};

export default Header;
