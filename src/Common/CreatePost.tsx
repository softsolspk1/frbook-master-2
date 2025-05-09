"use client";
import React, { FormEvent, useRef, useState } from "react";
import CustomImage from "./CustomImage";
import { ImagePath } from "../utils/constant";
import DynamicFeatherIcon from "./DynamicFeatherIcon";
import { toast } from "react-toastify";

interface CreatePostProps {
  reloadPost?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ reloadPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!content && !image && !video) {
      toast.error("Please add some content, image, or video");
      return;
    }

    setIsPosting(true);

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Post created successfully");
        setContent("");
        setImage(null);
        setVideo(null);
        setPreview(null);
        
        if (reloadPost) {
          reloadPost();
        }
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setVideo(null);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      setImage(null);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="create-post">
      <div className="static-section">
        <div className="card-title">
          <h3>create post</h3>
        </div>
        <div className="search-input input-style icon-right">
          <input
            type="text"
            className="form-control enable"
            placeholder="Write something here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <img
            src={`${ImagePath}/icon/search.png`}
            className="img-fluid icon"
            alt="search"
          />
        </div>
        <div className="create-bg">
          {preview && (
            <div className="preview-container" style={{ marginBottom: "15px" }}>
              {image ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "8px", maxHeight: "300px", objectFit: "contain" }}
                />
              ) : (
                <video
                  src={preview}
                  controls
                  style={{ width: "100%", borderRadius: "8px", maxHeight: "300px" }}
                />
              )}
              <button
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                  setVideo(null);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <DynamicFeatherIcon iconName="X" />
              </button>
            </div>
          )}
          <ul className="create-btm-option">
            <li>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageSelect}
              />
              <button
                className="create-option"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPosting}
              >
                <DynamicFeatherIcon iconName="Image" className="iw-18 ih-18" />
                <h6>image</h6>
              </button>
            </li>
            <li>
              <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                ref={videoInputRef}
                onChange={handleVideoSelect}
              />
              <button
                className="create-option"
                onClick={() => videoInputRef.current?.click()}
                disabled={isPosting}
              >
                <DynamicFeatherIcon iconName="Video" className="iw-18 ih-18" />
                <h6>video</h6>
              </button>
            </li>
            <li>
              <button
                className="create-option"
                onClick={handleSubmit}
                disabled={isPosting}
                style={{ 
                  backgroundColor: isPosting ? "#cccccc" : "#4CAF50",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: isPosting ? "not-allowed" : "pointer"
                }}
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;