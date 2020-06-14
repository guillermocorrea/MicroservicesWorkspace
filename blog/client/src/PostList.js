import React from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = ({ posts, addComments }) => {
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate addComments={addComments} postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <>
      <h1>Post List</h1>
      <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
      </div>
    </>
  );
};

export default PostList;
