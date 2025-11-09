

import type { Resource, User } from './types';

export const MOCK_USERS: Record<string, User> = {
  'user-1': { name: 'StarlightDreamer', avatarId: '1' },
  'user-2': { name: 'OceanSound', avatarId: '2' },
  'user-3': { name: 'ForestWhisper', avatarId: '3' },
};

export const MENTAL_HEALTH_RESOURCES: Resource[] = [
  {
    id: 'tip1',
    title: 'The 5-4-3-2-1 Grounding Technique',
    description: 'When feeling anxious, name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps bring you back to the present moment.',
    type: 'tip',
    link: 'https://www.youtube.com/watch?v=30VMIEmA114',
  },
  {
    id: 'tip2',
    title: 'Box Breathing for Calm',
    description: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold for 4 seconds. Repeat this cycle a few times to calm your nervous system.',
    type: 'tip',
    link: 'https://www.youtube.com/watch?v=bF_1K_y_6o0',
  },
  {
    id: 'school1',
    title: 'School Counseling Services',
    description: "Your school's counselors are trained professionals available to help you with academic, social, and emotional challenges. Sessions are confidential.",
    link: 'https://www.youtube.com/watch?v=DQhOM0__y3A',
    type: 'school',
  },
  {
    id: 'school2',
    title: 'Academic Tutoring Center',
    description: 'Feeling stressed about grades? The tutoring center offers free help in various subjects to help you succeed and reduce academic pressure.',
    link: 'https://www.youtube.com/watch?v=Oh-a8jE8Ylw',
    type: 'school',
  },
];

export const EMERGENCY_HELP_LINKS: Resource[] = [
  {
    id: 'emergency1',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.',
    link: 'https://www.crisistextline.org/',
    type: 'emergency',
  },
  {
    id: 'emergency2',
    title: 'The National Suicide Prevention Lifeline',
    description: 'Call or text 988. The Lifeline provides 24/7, free and confidential support for people in distress.',
    link: 'https://988lifeline.org/',
    type: 'emergency',
  },
  {
    id: 'emergency3',
    title: 'The Trevor Project',
    description: 'For LGBTQ young people in crisis, feeling suicidal, or in need of a safe and judgment-free place to talk. Call 1-866-488-7386.',
    link: 'https://www.thetrevorproject.org/',
    type: 'emergency',
  },
];