import React from "react";

export interface SinglePostType {
  author_name?: string;
  content?: string;
  created_at?: string;
  id?: number;
  image?: string;
  likes_count?: number;
  name?: string;
  profile_pic?: string;
  updated_at?: string;
  user_id?: number;
  video?: string;
  comments_count?: number;
  isLiked?: boolean;
}

export interface CommentType {
  content: string;
  created_at: string;
  id: number;
  name: string;
  post_id: number;
  profile_pic: string;
  updated_at: string;
  user_id: number;
}

export interface CommonUserHeadingProps {
  id: string;
  image: string | number;
  post?: SinglePostType;
  reloadPost?: () => void;
}

export interface PostReactProps {
  post?: SinglePostType;
  like: number;
  setLike: React.Dispatch<React.SetStateAction<number>>;
  comment: number;
  setComment: React.Dispatch<React.SetStateAction<number>>;
}

export interface LikePanelProps {
  post?: SinglePostType;
}

export interface DetailBoxProps {
  post?: SinglePostType;
}

export interface HoverMessageProps {
  placement: string;
  target: string;
  name: string;
  imagePath: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  profile_pic?: string;
}

export interface DynamicFeatherIconProps {
  iconName: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}