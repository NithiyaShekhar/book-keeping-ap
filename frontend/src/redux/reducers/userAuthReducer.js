import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  userInfo: null,  // userInfo starts as null (before registration/login)
  loading: false,  // loading starts as false
  error: null,     // error starts as null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Register
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null, // Clear any previous errors
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // Login
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null, // Clear any previous errors
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // Logout
    case USER_LOGOUT:
      return initialState;  // Reset to the initial state when logging out
    default:
      return state;
  }
};

export default userReducer;