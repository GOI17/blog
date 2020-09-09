import {
  FETCH_POSTS, NEW_POST, DELETE_POST, UPDATE_POST,
} from './types';

const apiUrl = 'https://jsonplaceholder.typicode.com';

/* eslint no-param-reassign: ["error", { "props": false }] */
export const fetchPosts = () => async (dispatch) => {
  const postsResponse = await fetch(`${apiUrl}/posts`);
  if (postsResponse.ok && postsResponse.status === 200) {
    const tempJson = await postsResponse.json();
    const postsJson = tempJson.slice(0, 5);
    await Promise.all(
      await postsJson.map(async (p) => {
        const commentsResponse = await fetch(`${apiUrl}/posts/${p.id}/comments`);
        const userResponse = await fetch(`${apiUrl}/users/${p.userId}`);
        p.username = 'S/A';
        p.comments = 0;
        if (
          (commentsResponse.ok && commentsResponse.status === 200)
          || (userResponse.ok && userResponse.status === 200)
        ) {
          if (commentsResponse.ok && commentsResponse.status === 200) {
            const commentsJson = await commentsResponse.json();
            p.comments = commentsJson.length;
          }
          if (userResponse.ok && userResponse.status === 200) {
            const userJson = await userResponse.json();
            p.username = userJson.username;
          }
        }
        return p;
      }),
    );
    dispatch({
      type: FETCH_POSTS,
      payload: postsJson,
    });
  }
};

export const createPost = (postData) => async (dispatch) => {
  const response = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  const json = await response.json();
  dispatch({
    type: NEW_POST,
    payload: json,
  });
};

export const updatePost = (postData) => async (dispatch) => {
  const response = await fetch(`${apiUrl}/posts/${postData.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  const json = await response.json();
  dispatch({
    type: UPDATE_POST,
    payload: json,
  });
};

export const deletePost = (id) => async (dispatch) => {
  const response = await fetch(`${apiUrl}/posts/${id}`, { method: 'DELETE' });
  await response.json();
  dispatch({
    type: DELETE_POST,
    payload: id,
  });
};
