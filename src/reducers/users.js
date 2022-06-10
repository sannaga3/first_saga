import { Types } from "../actions/users";

const initialState = { items: [], error: "" };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case Types.CREATE_USER_SUCCESS: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case Types.DELETE_USER_SUCCESS: {
      // userIdを元に対象のuserを削除
      const deleted = state.items.filter(function (item) {
        return item.id != action.payload;
      });
      return {
        ...state,
        items: deleted,
      };
    }
    case Types.USERS_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
