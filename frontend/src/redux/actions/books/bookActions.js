import axios from 'axios';
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_FAIL,
  BOOK_DETAIL_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_FAIL,
} from '../actionTypes';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const createBook = (data) => async (dispatch, getState) => {
  try {
    console.log('Data being sent:', data);

    dispatch({ type: 'CREATE_BOOK_REQUEST' });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data: createdBook } = await axios.post('/api/books', data, config);

    dispatch({
      type: 'CREATE_BOOK_SUCCESS',
      payload: createdBook,
    });
  } catch (error) {
    console.error('Axios error:', error.response?.data || error.message);
    dispatch({
      type: 'CREATE_BOOK_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};


//Fetch all books

export const fetchBooks = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axiosInstance.get('/api/books', config);

      dispatch({
        type: FETCH_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOK_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//delete a book

export const deleteBook = id => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_BOOK_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axiosInstance.delete(`/api/books/${id}`, config);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: data,
      });

      dispatch({
        type: FETCH_BOOK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_BOOK_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle book
export const fetchBook = (id, bookData) => {
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axiosInstance.get(`/api/books/${id}`, bookData, config);

      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//UPDATE BOOK

export const updateBook = (id, bookData) => {
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axiosInstance.put(`/api/books/${id}`, bookData, config);
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};