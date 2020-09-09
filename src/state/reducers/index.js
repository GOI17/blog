import { combineReducers } from 'redux';
import postReducer from './posts';
import userReducer from './user';
import commentReducer from './comment';

export default combineReducers({
  posts: postReducer,
  users: userReducer,
  comments: commentReducer,
});
