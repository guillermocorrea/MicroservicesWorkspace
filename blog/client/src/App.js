import React, { useState, useEffect } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (post) => {
    const clone = { ...posts };
    clone[post.id] = post;
    setPosts(clone);
  };

  const addComments = (postId, comments) => {
    const clone = { ...posts };
    const post = clone[postId];
    post.comments = comments;
    setPosts(clone);
  };

  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreate addPost={addPost} />
      <hr />
      <PostList addComments={addComments} posts={posts} />
    </div>
  );
};

export default App;
