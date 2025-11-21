import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {post.image && <img src={`http://localhost:5000${post.image}`} alt={post.title} />}
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <Link to={`/post/${post._id}`}>Ler mais</Link>
    </div>
  );
};

export default PostCard;
