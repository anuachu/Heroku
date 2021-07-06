import { SELECT_CATEGORY } from '../actions/ActionTypes';

import { categoryAll } from "../components/store";

const selectedCategoryReducer = (state = categoryAll, action) => {
  if (action.type === SELECT_CATEGORY) {
    return { ...action.payload };
  }

  return state;
};

export default selectedCategoryReducer;
