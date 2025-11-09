
export type Tab = 'discussion' | 'chatbot' | 'resources' | 'help';

export interface User {
  name: string;
  avatarId: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  reply?: {
    id: string;
    author: User;
    content: string;
    createdAt: Date;
  };
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link?: string;
  type: 'tip' | 'school' | 'emergency';
}

export interface ModerationResult {
  isPositive: boolean;
  reason: string;
  isSevere: boolean;
}
