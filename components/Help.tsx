
import React from 'react';
import { EMERGENCY_HELP_LINKS } from '../constants';
import type { Resource } from '../types';

const HelpCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <a 
        href={resource.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block bg-red-900/50 border border-red-700 rounded-lg p-5 shadow-lg transition-transform hover:scale-105 hover:bg-red-800/50"
    >
        <h3 className="text-xl font-bold text-red-200">{resource.title}</h3>
        <p className="mt-2 text-red-300">{resource.description}</p>
        <p className="mt-4 text-sm font-semibold text-red-200">Tap to connect &rarr;</p>
    </a>
);


const Help: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-300 tracking-tight">Immediate Help</h2>
            <p className="mt-2 text-slate-400">If you are in crisis or need someone to talk to, please reach out. You are not alone.</p>
        </div>
      <div className="space-y-4">
        {EMERGENCY_HELP_LINKS.map(link => (
          <HelpCard key={link.id} resource={link} />
        ))}
      </div>
    </div>
  );
};

export default Help;
