import { FETCH_COMMENTS } from './types';

const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

const fetchComments = () => (dispatch) => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((comments) => dispatch({
      type: FETCH_COMMENTS,
      payload: comments,
    }));
};

export default fetchComments;
