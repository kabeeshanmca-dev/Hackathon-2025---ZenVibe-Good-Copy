import React from 'react';
import type { Tab } from '../types';
import { ChatBubbleIcon, BookOpenIcon, LifeBuoyIcon, SparklesIcon } from './icons';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'discussion', label: 'Discuss', Icon: ChatBubbleIcon },
    { id: 'chatbot', label: 'Friend Chat', Icon: SparklesIcon },
    { id: 'resources', label: 'Resources', Icon: BookOpenIcon },
    { id: 'help', label: 'Help', Icon: LifeBuoyIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-10">
      <div className="container mx-auto px-4 h-20 flex justify-around items-center max-w-2xl">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as Tab)}
            className={`flex flex-col items-center justify-center space-y-1 w-24 transition-colors duration-200 ${
              activeTab === id
                ? 'text-violet-400'
                : 'text-slate-400 hover:text-violet-300'
            }`}
          >
            <div className="w-6 h-6"><Icon /></div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;