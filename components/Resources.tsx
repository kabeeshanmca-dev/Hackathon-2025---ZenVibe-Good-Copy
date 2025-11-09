
import React from 'react';
import { MENTAL_HEALTH_RESOURCES } from '../constants';
import type { Resource } from '../types';
import { LightBulbIcon, AcademicCapIcon } from './icons';

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const Icon = resource.type === 'tip' ? LightBulbIcon : AcademicCapIcon;
  const color = resource.type === 'tip' ? 'text-yellow-400' : 'text-sky-400';

  return (
    <div className="bg-slate-800 rounded-lg p-5 shadow-lg border border-slate-700 flex flex-col h-full">
        <div className="flex items-center space-x-3 mb-3">
            <Icon className={`w-6 h-6 ${color}`} />
            <h3 className="text-lg font-semibold text-slate-100">{resource.title}</h3>
        </div>
        <p className="text-slate-400 flex-grow">{resource.description}</p>
        {resource.link && (
            <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-block text-violet-400 font-medium hover:text-violet-300 transition-colors"
            >
                Learn More &rarr;
            </a>
        )}
    </div>
  );
};

const Resources: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-4">Wellness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MENTAL_HEALTH_RESOURCES.filter(r => r.type === 'tip').map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-4">School Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MENTAL_HEALTH_RESOURCES.filter(r => r.type === 'school').map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
