import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
} from '../actionTypes';

// ✅ Set API Base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Helper function to get headers with auth token
const getAuthConfig = (getState) => {
  const { userInfo } = getState().userLogin;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token || ''}`,
    },
  };
};

// ✅ Helper function to handle API errors
const getErrorPayload = (error) => {
  return error.response?.data?.message || error.message;
};

// ✅ Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorPayload(error) });
  }
};

// ✅ Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      `${API_BASE_URL}/users/login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userAuthData', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: getErrorPayload(error) });
  }
};

// ✅ Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userAuthData');
  dispatch({ type: USER_LOGOUT });
};

// ✅ Get User Profile
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const { data } = await axios.get(`${API_BASE_URL}/users/profile`, getAuthConfig(getState));

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: getErrorPayload(error) });
  }
};

// ✅ Update User
export const updateUser = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { data } = await axios.put(
      `${API_BASE_URL}/users/profile/update`,
      { name, email, password },
      getAuthConfig(getState)
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorPayload(error) });
  }
};

// ✅ Fetch All Users
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });

    const { data } = await axios.get(`${API_BASE_URL}/users`, {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAIL, payload: getErrorPayload(error) });
  }
};
