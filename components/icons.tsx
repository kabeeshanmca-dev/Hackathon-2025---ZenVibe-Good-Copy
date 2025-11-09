import React from 'react';

// Using props to pass className allows for easy styling with Tailwind
const createIcon = (path: React.ReactNode): React.FC<{className?: string}> => ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {path}
  </svg>
);

export const ChatBubbleIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.06c-.343.343-.734.634-1.155.868l-2.03.981a2.25 2.25 0 0 1-2.264 0l-2.03-.981c-.42-.234-.812-.525-1.155-.868L4.48 18.25a2.25 2.25 0 0 1-2.193-2.193v-4.286c0-.97.616-1.813 1.5-2.097m16.5 0c-1.34.423-2.923.644-4.5 0m-10.5 0c-1.577.644-3.16.423-4.5 0m4.5 0V7.5a2.25 2.25 0 0 1 2.25-2.25h3.75a2.25 2.25 0 0 1 2.25 2.25v.911" />
);

export const BookOpenIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V21" />
);

export const LifeBuoyIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 6.75h.008v.008H12v-.008Z" />
);

export const UserCircleIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
);

export const PaperAirplaneIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
);

export const ExclamationTriangleIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
);

export const SparklesIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
);

const Avatar1: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="20" r="20" fill="#60a5fa"/>
    <circle cx="20" cy="20" r="12" fill="#dbeafe"/>
    <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="#93c5fd"/>
  </svg>
);

const Avatar2: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="20" r="20" fill="#4ade80"/>
    <rect x="10" y="10" width="20" height="20" rx="4" fill="#bbf7d0"/>
    <rect x="15" y="15" width="10" height="10" rx="2" fill="#86efac"/>
  </svg>
);

const Avatar3: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="20" r="20" fill="#facc15"/>
    <path d="M20 8L26.9282 20L20 32L13.0718 20L20 8Z" fill="#fef08a"/>
    <path d="M20 14L23.4641 20L20 26L16.5359 20L20 14Z" fill="#fde047"/>
  </svg>
);

const Avatar4: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="20" r="20" fill="#f87171"/>
    <path d="M12 12L28 28M28 12L12 28" stroke="#fecaca" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const UserAvatar: React.FC<{ avatarId: string; className?: string }> = ({ avatarId, className = 'w-10 h-10' }) => {
  switch (avatarId) {
    case '1': return <Avatar1 className={className} />;
    case '2': return <Avatar2 className={className} />;
    case '3': return <Avatar3 className={className} />;
    case '4': return <Avatar4 className={className} />;
    default: return <UserCircleIcon className={className} />;
  }
};


export const HeartPulseIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.343 17.657 6 15.157 6 12.5A5.5 5.5 0 0 1 11.5 7a5.5 5.5 0 0 1 5.5 5.5c0 2.657-2.343 5.157-4.355 8.41ZM13.84 9.09a.75.75 0 0 1 1.06 0l1.25 1.25a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1.25-1.25a.75.75 0 0 1 0-1.06l1.25-1.25a.75.75 0 0 1 1.06 0Z" />
    </svg>
);

export const LightBulbIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.493 7.493 0 0 1-3.75 0M9 11.25a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z" />
);

export const AcademicCapIcon = createIcon(
    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.25 4.5v15m13.5-15v15" />
);