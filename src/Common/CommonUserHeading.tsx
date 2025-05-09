import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FC, useState, useEffect } from "react";
import { Media } from "reactstrap";
import { Href, ImagePath } from "../utils/constant/index";
import { CommonUserHeadingProps } from "./CommonInterFace";
import CustomImage from "./CustomImage";
import HoverMessage from "./HoverMessage";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { toast } from "react-toastify";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const CommonUserHeading: FC<CommonUserHeadingProps> = ({
  image,
  id,
  post,
  reloadPost,
}) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userData = await response.json();
          console.log("Current user:", userData);
          console.log("Post:", post);
          setCurrentUserId(userData.id);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleDeletePost = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!post?.id) return;

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Deleted the post successfully");

        if (typeof reloadPost === "function") {
          reloadPost();
        }
      } else {
        toast.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post");
    }
  };

  // Determine if current user owns this post
  const isOwner = post?.user_id === currentUserId;
  console.log("Is owner check:", {
    postUserId: post?.user_id,
    currentUserId,
    isOwner,
  });

  return (
    <div className="post-title">
      <div
        className="profile"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Media>
          <a
            className="popover-cls user-img bg-size blur-up lazyloaded"
            href={Href}
            id={id}
          >
            {post?.profile_pic ? (
              <CustomImage
                src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${
                  post!.profile_pic
                }`}
                className="img-fluid blur-up lazyload bg-img"
                alt="user"
              />
            ) : (
              <CustomImage
                src={`${ImagePath}/user-sm/def.jpg`}
                className="img-fluid blur-up lazyload bg-img"
                alt="user"
              />
            )}
          </a>
          <Media body>
            <h5>{post?.name ?? post?.author_name ?? "sufiya eliza"}</h5>
            <h6>{timeAgo.format(new Date(post?.created_at ?? new Date()))}</h6>
          </Media>
        </Media>

        <div style={{ display: "flex", alignItems: "center" }}>
          <HoverMessage
            placement={"right"}
            target={id}
            name={post?.name ?? ""}
            imagePath={post?.profile_pic ?? ""}
          />

          {isOwner && (
            <button
              onClick={handleDeletePost}
              style={{
                cursor: "pointer",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 10px",
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              title="Delete post"
            >
              <DynamicFeatherIcon iconName="Trash2" className="iw-16 ih-16" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonUserHeading;