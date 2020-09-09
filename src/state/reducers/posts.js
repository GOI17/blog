import {
  FETCH_POSTS, NEW_POST, UPDATE_POST, DELETE_POST,
} from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      const storage = localStorage.getItem('[Posts] GET');
      if (storage === null) localStorage.setItem('[Posts] GET', 1);
      if (storage !== null) localStorage.setItem('[Posts] GET', parseInt(storage, 10) + 1);
      return {
        ...state,
        items: action.payload,
      };
    }
    case NEW_POST: {
      const storage = localStorage.getItem('[Posts] CREATE');
      if (storage === null) localStorage.setItem('[Posts] CREATE', 1);
      if (storage !== null) localStorage.setItem('[Posts] CREATE', parseInt(storage, 10) + 1);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case UPDATE_POST: {
      const storage = localStorage.getItem('[Posts] UPDATE');
      if (storage === null) localStorage.setItem('[Posts] UPDATE', 1);
      if (storage !== null) localStorage.setItem('[Posts] UPDATE', parseInt(storage, 10) + 1);
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) return action.payload;
          return item;
        }),
      };
    }
    case DELETE_POST: {
      const storage = localStorage.getItem('[Posts] DELETE');
      if (storage === null) localStorage.setItem('[Posts] DELETE', 1);
      if (storage !== null) localStorage.setItem('[Posts] DELETE', parseInt(storage, 10) + 1);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    default: return state;
  }
}
