import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  userInfo: null,  
  loading: false, 
  error: null, 
  forgotPasswordLoading: false,
  forgotPasswordSuccess: null,  
  forgotPasswordMessage: null, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Register
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    
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
      return initialState;  

    // Forgot Password
     // Forgot Password
     case FORGOT_PASSWORD_REQUEST:
      return { ...state, forgotPasswordLoading: true, forgotPasswordSuccess: null, error: null };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, forgotPasswordLoading: false, forgotPasswordSuccess: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { ...state, forgotPasswordLoading: false, error: action.payload };


    default:
      return state;
  }
};

export default userReducer;
