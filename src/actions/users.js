export const Types = {
  GET_USERS_REQUEST: "users/get_users_request",
  GET_USERS_SUCCESS: "users/get_users_success",
  CREATE_USER_REQUEST: "users/create_user_request",
  CREATE_USER_SUCCESS: "users/create_user_success",
  DELETE_USER_REQUEST: "users/delete_user_request",
  DELETE_USER_SUCCESS: "users/delete_user_success",
};

// sagaのwatcher用アクション
export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

// reducerへディスパッチするアクション
export const getUsersSuccess = ({ items }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: items,
});

// sagaのwatcher用アクション
export const createUserRequest = ({ firstName, lastName }) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: { firstName, lastName },
});

// reducerへディスパッチするアクション
export const createUserSuccess = ({ item }) => ({
  type: Types.CREATE_USER_SUCCESS,
  payload: item,
});

// sagaのwatcher用アクション
export const deleteUserRequest = (userId) => ({
  type: Types.DELETE_USER_REQUEST,
  payload: userId,
});

// reducerへディスパッチするアクション
export const deleteUserSuccess = ({ userId }) => ({
  type: Types.DELETE_USER_SUCCESS,
  payload: userId,
});
