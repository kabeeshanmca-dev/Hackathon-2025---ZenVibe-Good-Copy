
import React from 'react';
import type { Post } from '../types';
import { UserAvatar } from './icons';

interface PostCardProps {
  post: Post;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}


const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <UserAvatar avatarId={post.author.avatarId} className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-300">{post.author.name}</p>
              <p className="text-xs text-slate-500">{timeAgo(post.createdAt)}</p>
            </div>
            <p className="mt-2 text-slate-300 whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
      </div>
      {post.reply && (
        <div className="bg-slate-800/50 border-t border-slate-700/50 px-5 py-4">
           <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <UserAvatar avatarId={post.reply.author.avatarId} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-300">{post.reply.author.name}</p>
                     <p className="text-xs text-slate-500">{timeAgo(post.reply.createdAt)}</p>
                  </div>
                 <p className="mt-1 text-slate-300/90 whitespace-pre-wrap">{post.reply.content}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
