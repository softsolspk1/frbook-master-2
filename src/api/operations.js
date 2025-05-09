import Cookies from "js-cookie";
import axios from "axios";

export const API_BASE = process.env.API_BASE || "https://frbook-api-master-1.onrender.com";

// Helper for making authenticated requests
const authenticatedRequest = async (url, method, data = null) => {
  try {
    const token = Cookies.get("token");
    
    if (!token) {
      throw new Error("Not authenticated");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method,
      url: `${API_BASE}${url}`,
      headers,
      ...(data && { data }),
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} ${url}:`, error);
    throw error;
  }
};

// User operations
export const me = async () => {
  try {
    console.log("Fetching current user data");
    return await authenticatedRequest("/me", "GET");
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

export const updateMe = async (profile_pic) => {
  try {
    return await authenticatedRequest("/me", "PUT", { profile_pic });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, message: error.message };
  }
};

// Post operations
export const getPosts = async () => {
  try {
    return await authenticatedRequest("/posts", "GET");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

export const createPost = async (content, image, video) => {
  try {
    return await authenticatedRequest("/posts", "POST", {
      content,
      image,
      video,
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    console.log(`Deleting post with ID: ${postId}`);
    return await authenticatedRequest(`/posts/${postId}`, "DELETE");
  } catch (error) {
    console.error(`Failed to delete post ${postId}:`, error);
    throw error;
  }
};

// Like operations
export const likePost = async (post_id) => {
  try {
    return await authenticatedRequest(`/posts/${post_id}/like`, "POST");
  } catch (error) {
    console.error("Failed to like post:", error);
    throw error;
  }
};

// Friend operations
export const getFriends = async () => {
  try {
    return await authenticatedRequest("/friends", "GET");
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    return [];
  }
};

export const getNotFriends = async () => {
  try {
    return await authenticatedRequest("/notfriends", "GET");
  } catch (error) {
    console.error("Failed to fetch non-friends:", error);
    return [];
  }
};

// Comment operations
export const getComments = async (post_id) => {
  try {
    return await authenticatedRequest(`/posts/${post_id}/comments`, "GET");
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
};

export const addComment = async (post_id, content) => {
  try {
    return await authenticatedRequest(`/posts/${post_id}/comments`, "POST", {
      content,
    });
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
  }
};

// Authentication operations
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      email,
      password,
    });
    
    if (response.data.token) {
      Cookies.set("token", response.data.token, { expires: 7 });
    }
    
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove("token");
};