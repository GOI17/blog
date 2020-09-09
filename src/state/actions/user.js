import { FETCH_USERS } from './types';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = () => (dispatch) => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((users) => dispatch({
      type: FETCH_USERS,
      payload: users,
    }));
};

export default fetchUsers;
