import { Types } from "../actions/users";

const initialState = { items: [] };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    default:
      return state;
  }
}
