import React, { FC, useState } from 'react';
import DynamicFeatherIcon from './DynamicFeatherIcon';
import { toast } from 'react-toastify';
import { PostReactProps } from './CommonInterFace';
import { likePost } from '@/api/operations';

const CommonPostReact: FC<PostReactProps> = ({ post, like, setLike, comment, setComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);

  const handleLike = async () => {
    try {
      if (!post?.id) return;

      const response = await likePost(post.id);
      
      if (response) {
        // Toggle like state
        if (isLiked) {
          setLike(like - 1);
        } else {
          setLike(like + 1);
        }
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleComment = async () => {
    try {
      if (!commentText.trim() || !post?.id) return;

      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        toast.success('Comment added');
        setCommentText('');
        setComment(comment + 1);
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="post-react">
      <ul>
        <li className="react-btn">
          <button className={`react ${isLiked ? 'active' : ''}`} onClick={handleLike}>
            <DynamicFeatherIcon iconName="ThumbsUp" className="icon-dark" />
          </button>
          <h6>Like</h6>
        </li>
        <li className="comment-click">
          <button className="comment" onClick={() => setShowComments(!showComments)}>
            <DynamicFeatherIcon iconName="MessageSquare" className="icon-dark" />
          </button>
          <h6>Comment</h6>
        </li>
      </ul>

      {showComments && (
        <div className="comment-section mt-2">
          <div className="comment-box">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonPostReact;