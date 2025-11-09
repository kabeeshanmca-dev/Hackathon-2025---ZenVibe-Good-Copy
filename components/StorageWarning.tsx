import React from 'react';
import { ExclamationTriangleIcon } from './icons';

const StorageWarning: React.FC = () => (
  <div className="bg-yellow-800/40 border-b border-yellow-700/50 text-yellow-200 px-4 py-3 text-center text-sm" role="alert">
    <div className="flex items-center justify-center max-w-2xl mx-auto">
      <ExclamationTriangleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="text-left"><strong>Storage Unavailable:</strong> Your browser settings are preventing the app from saving your session. You can still browse, but your progress won't be saved.</span>
    </div>
  </div>
);

export default StorageWarning;
