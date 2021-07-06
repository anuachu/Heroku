import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Posts from './Posts';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import Login from './Login';

const App = () => {
  return <div className="container">
    <Header />

    <Route exact path="/" component={Home} />
    <Route exact path="/posts" component={Posts} />
    <Route exact path="/posts/:id" component={PostDetail} />
    <Route path="/posts/:id/edit" component={PostForm} />
    <Route path="/new-post" component={PostForm} />
    <Route path="/login" component={Login} />
  </div>;
};

export default App;
