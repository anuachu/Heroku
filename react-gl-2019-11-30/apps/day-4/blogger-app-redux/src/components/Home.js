import React from 'react';

const Home = ({ history }) => {
  return <div>
    <h3>Blogger App Home</h3>
    <p>This is the home page of Blogger App</p>
    <button className="btn btn-info mr-2" onClick={() => history.push('/posts')}>Go to Posts</button>
    <button className="btn btn-info" onClick={() => history.push('/new-post')}>Go to New Post</button>
  </div>;
};

export default Home;
