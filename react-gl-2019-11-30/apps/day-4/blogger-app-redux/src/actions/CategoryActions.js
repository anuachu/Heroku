import { SELECT_CATEGORY } from './ActionTypes';

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    payload: category
  };
};
