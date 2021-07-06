import { GET_POSTS, CREATE_POST } from './ActionTypes';

import * as PostsApi from '../api/PostsApi';

export const getPosts = () => {
  return dispatch => {
    return PostsApi.getPosts()
      .then(posts => {
        dispatch({
          type: GET_POSTS,
          payload: posts
        });
      })
      .catch(error => {
        console.log('Get posts failed.');
        console.log('Error:', error);
      });
  };
};

export const createPost = post => {
  return dispatch => {
    return PostsApi.createPost(post)
      .then(post => {
        dispatch({
          type: CREATE_POST,
          payload: post
        });
      })
      .catch(error => {
        console.log('Create post failed.');
        console.log('Error:', error);
      });
  }
};
