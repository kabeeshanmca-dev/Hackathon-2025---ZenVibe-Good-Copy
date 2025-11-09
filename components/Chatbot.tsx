
import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '@google/genai';
import type { ChatMessage, User } from '../types';
import { ai } from '../services/geminiService';
import { MOCK_USERS } from '../constants';
import { PaperAirplaneIcon, UserAvatar } from './icons';
import TypingIndicator from './TypingIndicator';
import LoadingSpinner from './LoadingSpinner';

interface ChatbotProps {
  currentUser: User;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentUser }) => {
    const [chatBuddy, setChatBuddy] = useState<User | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Pick a random user that is not the current user to be the chat buddy
        const potentialBuddies = Object.values(MOCK_USERS).filter(u => u.name !== currentUser.name);
        const buddy = potentialBuddies.length > 0 
            ? potentialBuddies[Math.floor(Math.random() * potentialBuddies.length)] 
            : MOCK_USERS['user-1']; // Fallback
        setChatBuddy(buddy);

        if (ai) {
          // Create a new chat session with a personalized system instruction
          const chatSession = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                  systemInstruction: `You are ${buddy.name}, a friendly and empathetic peer on the ZenVibe app. Your goal is to be a supportive, non-judgmental friend. Use a warm, encouraging, and slightly casual tone, like you're talking to a friend. Use emojis where appropriate. Keep your responses concise (usually 2-3 sentences) and easy to understand. Never give medical advice, but you can gently suggest talking to a trusted adult or professional if a user seems to be in serious distress. Your primary role is to listen, validate feelings, and offer positive encouragement.`,
              },
          });
          setChat(chatSession);

          // Set the initial greeting message from the chat buddy
          setMessages([
              {
                  id: 'initial',
                  text: `Hey! I'm ${buddy.name}. Feel free to talk about anything on your mind. I'm here to listen. 😊`,
                  sender: 'ai'
              }
          ]);
        } else {
            // Handle the case where AI is not available
            setMessages([
              {
                  id: 'initial-error',
                  text: "The chat feature is currently unavailable. I'm still here if you need to talk, but I can't connect to my AI helper right now.",
                  sender: 'ai'
              }
            ]);
        }
    }, [currentUser.name]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = {
            id: new Date().toISOString(),
            text: userInput,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            const aiResponseText = response.text;

            const aiMessage: ChatMessage = {
                id: new Date().toISOString() + '-ai',
                text: aiResponseText,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message to chatbot:", error);
            const errorMessage: ChatMessage = {
                id: new Date().toISOString() + '-error',
                text: "Oops, I'm having a little trouble connecting right now. Please try again in a moment.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        
        setIsLoading(false);
    };

    if (!chatBuddy) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <LoadingSpinner className="w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)]">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-4 flex items-center gap-3">
                <UserAvatar avatarId={chatBuddy.avatarId} className="w-9 h-9" />
                <span>Chat with {chatBuddy.name}</span>
            </h2>
            <div className="flex-grow bg-slate-800 rounded-lg p-4 overflow-y-auto space-y-4 border border-slate-700">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.sender === 'ai' && <UserAvatar avatarId={chatBuddy.avatarId} className="w-8 h-8 flex-shrink-0" />}
                       <div className={`max-w-sm md:max-w-md p-3 rounded-xl ${msg.sender === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-300 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                       </div>
                       {msg.sender === 'user' && <UserAvatar avatarId={currentUser.avatarId} className="w-8 h-8 flex-shrink-0" />}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 justify-start">
                        <UserAvatar avatarId={chatBuddy.avatarId} className="w-8 h-8 flex-shrink-0" />
                        <div className="max-w-sm md:max-w-md rounded-xl bg-slate-700 text-slate-300 rounded-bl-none">
                           <TypingIndicator />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4">
                 <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-3 bg-slate-800 border border-slate-600 rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none text-slate-300 placeholder-slate-500 transition"
                        disabled={isLoading || !chat}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim() || !chat}
                        className="flex items-center justify-center w-12 h-12 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
                        aria-label="Send message"
                    >
                       <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;