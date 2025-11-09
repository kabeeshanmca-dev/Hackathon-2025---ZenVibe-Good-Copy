
import React from 'react';
import type { Post } from '../types';
import NewPostForm from './NewPostForm';
import PostCard from './PostCard';

interface DiscussionBoardProps {
  posts: Post[];
  onAddPost: (content: string) => void;
  onSevereContent: () => void;
}

const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ posts, onAddPost, onSevereContent }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Anonymous Discussions</h2>
      <NewPostForm onAddPost={onAddPost} onSevereContent={onSevereContent} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default DiscussionBoard;
