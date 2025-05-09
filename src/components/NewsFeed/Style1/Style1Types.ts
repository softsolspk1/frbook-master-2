import { SinglePostType, UserType } from "@/Common/CommonInterFace";

export interface PostBoxInterface {
  post?: SinglePostType;
  reloadPost?: () => void;
}

export interface PostListProps {
  posts?: SinglePostType[];
  reloadPosts?: () => void;
}

export interface FeedProps {
  user?: UserType;
  currP?: SinglePostType[];
}