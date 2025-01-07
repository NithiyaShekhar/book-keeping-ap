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

// Helper to get headers with token
const getAuthConfig = (getState) => {
  const { userInfo } = getState().userLogin;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token || ''}`,
    },
  };
};

const getErrorPayload = (error) => {
  return error.response?.data?.message || error.message;
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/users', { name, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userAuthData', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorPayload(error) });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/users/login', { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userAuthData', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: getErrorPayload(error) });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userAuthData');
  dispatch({ type: USER_LOGOUT });
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const { data } = await axios.get('/api/users/profile', getAuthConfig(getState));

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: getErrorPayload(error) });
  }
};

export const updateUser = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { data } = await axios.put(
      '/api/users/profile/update',
      { name, email, password },
      getAuthConfig(getState)
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorPayload(error) });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });

    const { data } = await axios.get('/api/users', {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAIL, payload: getErrorPayload(error) });
  }
};
