import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../api/api.js";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/posts?page=${page}&limit=5`);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, fetchPosts, categories, loading }}>
      {children}
    </BlogContext.Provider>
  );
};
