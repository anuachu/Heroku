import { combineReducers } from 'redux';

import postsReducer from './PostsReducer';
import selectedCategoryReducer from './SelectedCategoryReducer';

const appReducers = combineReducers({
  posts: postsReducer,
  selectedCategory: selectedCategoryReducer
});

export default appReducers;
