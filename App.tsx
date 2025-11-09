
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DiscussionBoard from './components/DiscussionBoard';
import Resources from './components/Resources';
import Help from './components/Help';
import Chatbot from './components/Chatbot';
import SignUp from './components/SignUp';
import WellnessQuiz from './components/WellnessQuiz';
import StorageWarning from './components/StorageWarning';
import type { Post, Tab, User } from './types';
import { generateSupportiveReply } from './services/geminiService';
import { MOCK_USERS } from './constants';
import { storage, isLocalStorageAvailable } from './utils/storage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('discussion');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isHelpLocked, setIsHelpLocked] = useState(false);
  const [storageIsPersisted, setStorageIsPersisted] = useState(true);
  
  useEffect(() => {
    // Check if storage is persistent and show a warning if not.
    setStorageIsPersisted(isLocalStorageAvailable());

    // Check for logged in user in storage (localStorage or in-memory fallback)
    const savedUser = storage.get('zenVibeUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        
        // Check for score
        const savedScore = storage.get('zenVibeScore');
        if (savedScore) {
          setScore(parseFloat(savedScore));
        } else {
          setShowQuiz(true);
        }

      } catch (e) {
        console.error("Failed to parse user from storage", e);
        storage.remove('zenVibeUser');
        storage.remove('zenVibeScore');
      }
    }
  }, []);

  useEffect(() => {
    // Simulate a more realistic, time-of-day based online user count
    const getTargetUserCount = () => {
      const hour = new Date().getHours();
      // A simple curve for user activity based on local time
      if (hour >= 2 && hour < 7) return 40;   // 2am-6am: Low
      if (hour >= 7 && hour < 12) return 120; // 7am-11am: Morning ramp-up
      if (hour >= 12 && hour < 16) return 200;// 12pm-3pm: Afternoon
      if (hour >= 16 && hour < 22) return 280;// 4pm-9pm: Peak time
      return 150; // 10pm-1am: Winding down
    };

    // Initialize with a value around the target
    const initialTarget = getTargetUserCount();
    setOnlineUsers(initialTarget + Math.floor(Math.random() * 20) - 10);

    const interval = setInterval(() => {
      const target = getTargetUserCount();
      setOnlineUsers(currentCount => {
        // Gently move towards the target
        const diff = target - currentCount;
        const movement = diff !== 0 ? Math.sign(diff) * Math.max(1, Math.floor(Math.abs(diff) / 5)) : 0;
        
        // Add a small random fluctuation
        const fluctuation = Math.floor(Math.random() * 7) - 3;
        
        let newCount = currentCount + movement + fluctuation;
        
        // Ensure count stays within a reasonable bound of the target
        if (newCount < target * 0.8) newCount = Math.floor(target * 0.8);
        if (newCount > target * 1.2) newCount = Math.floor(target * 1.2);
        if (newCount < 20) newCount = 20; // Absolute minimum

        return Math.round(newCount);
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: MOCK_USERS['user-1'],
      content: 'Feeling a bit overwhelmed with exams coming up. Any tips for staying calm and focused?',
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
       reply: {
        id: 'reply-1',
        author: MOCK_USERS['user-2'],
        content: "It's totally understandable to feel overwhelmed with exams. Take it one step at a time, and remember to be kind to yourself. You've got this! ✨",
        createdAt: new Date(Date.now() - 1000 * 60 * 28)
      }
    },
    {
      id: '2',
      author: MOCK_USERS['user-2'],
      content: "I've been trying to get into a good sleep schedule but it's tough. What works for you all?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
     {
      id: '3',
      author: MOCK_USERS['user-3'],
      content: 'Just wanted to share a small win! I finally finished a project I was procrastinating on and it feels so good. You can do it too!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ]);

  const handleLogin = (email: string) => {
    const username = email.split('@')[0];
    const avatarId = String(Math.floor(Math.random() * 4) + 1); // Random avatar 1-4
    const newUser: User = {
      name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize
      avatarId,
    };
    setCurrentUser(newUser);
    storage.set('zenVibeUser', JSON.stringify(newUser));
    storage.remove('zenVibeScore');
    setScore(null);
    setShowQuiz(true); // Show quiz for new users
  };

  const handleQuizComplete = (newScore: number) => {
    setScore(newScore);
    storage.set('zenVibeScore', newScore.toString());
    setShowQuiz(false);
  };
  
  const handleRetakeQuiz = () => {
    setShowQuiz(true);
  };

  const handleAddPost = async (content: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: new Date().toISOString(),
      author: currentUser,
      content,
      createdAt: new Date(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);

    // Generate and add a reply from a random user with a delay
    setTimeout(async () => {
      const replyContent = await generateSupportiveReply(content);
      
      // Select a random user who is not the current user
      const otherUsers = Object.values(MOCK_USERS).filter(u => u.name !== currentUser.name);
      const randomUser = otherUsers.length > 0
        ? otherUsers[Math.floor(Math.random() * otherUsers.length)]
        : MOCK_USERS['user-1']; // Fallback to a default user

      const userReply = {
        id: `reply-${newPost.id}`,
        author: randomUser,
        content: replyContent,
        createdAt: new Date()
      };
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === newPost.id ? { ...p, reply: userReply } : p
        )
      );
    }, 2000 + Math.random() * 2000); // random delay between 2-4 seconds
  };
  
  const handleSevereContent = () => {
    setIsHelpLocked(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discussion':
        return <DiscussionBoard posts={posts} onAddPost={handleAddPost} onSevereContent={handleSevereContent} />;
      case 'chatbot':
        return <Chatbot currentUser={currentUser!} />;
      case 'resources':
        return <Resources />;
      case 'help':
        return <Help />;
      default:
        return <DiscussionBoard posts={posts} onAddPost={handleAddPost} onSevereContent={handleSevereContent} />;
    }
  };

  if (!currentUser) {
    return <SignUp onLogin={handleLogin} />;
  }
  
  if (showQuiz) {
    return <WellnessQuiz onComplete={handleQuizComplete} />;
  }
  
  if (isHelpLocked) {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="max-w-2xl mx-auto w-full">
                  <Help />
                </div>
            </main>
        </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col">
      {!storageIsPersisted && <StorageWarning />}
      <Header score={score} onRetakeQuiz={handleRetakeQuiz} onlineUsers={onlineUsers} />
      <main className="flex-grow container mx-auto px-4 pt-4 pb-24 md:pt-8 md:pb-8">
        <div className="max-w-2xl mx-auto">
           {renderContent()}
        </div>
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
