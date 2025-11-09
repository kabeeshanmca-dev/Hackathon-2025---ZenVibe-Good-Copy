
import React, { useState } from 'react';
import { moderateContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { PaperAirplaneIcon, ExclamationTriangleIcon } from './icons';

interface NewPostFormProps {
  onAddPost: (content: string) => void;
  onSevereContent: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost, onSevereContent }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const moderationResult = await moderateContent(content);

    if (moderationResult.isSevere) {
        onSevereContent();
        // The component will unmount, so no need to update state
    } else if (moderationResult.isPositive) {
      onAddPost(content);
      setContent('');
    } else {
      setError(moderationResult.reason);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something positive or ask for support..."
          className="w-full h-24 p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none text-slate-300 placeholder-slate-500 transition"
          disabled={isLoading}
        />
        {error && (
          <div className="flex items-center p-3 text-sm text-red-300 bg-red-900/50 rounded-md">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0"/>
            <span>{error}</span>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="flex items-center justify-center px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Checking...
              </>
            ) : (
               <>
                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                Post
               </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
