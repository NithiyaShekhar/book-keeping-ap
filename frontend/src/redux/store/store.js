import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../reducers/userAuthReducer';
import userProfileReducer from '../reducers/userProfileReducer';
import userUpdateReducer from '../reducers/userUpdateReducer';
import createdBookReducer from '../reducers/books/createdBookReducer';
import booksListReducer from '../reducers/books/booksListReducer';
import bookDetailReducer from '../reducers/books/bookDetailsReducer';
import usersListReducer from '../reducers/usersListReducer';


const rootReducer = combineReducers({
  userLogin: userReducer,
  userProfile: userProfileReducer,
  updatedUser: userUpdateReducer,
  bookCreated: createdBookReducer,
  booksList: booksListReducer,
  bookDetails: bookDetailReducer,
  usersList: usersListReducer,
});
const logger = (store) => (next) => (action) => {
  console.log('Dispatching action:', action);
  return next(action);
};

const middleware = [thunk, logger];

const userAuthFromStorage = localStorage.getItem('userAuthData')
  ? JSON.parse(localStorage.getItem('userAuthData'))
  : null;

const initialState = {
  userLogin: { userInfo: userAuthFromStorage },
};

const store = createStore(
  rootReducer,
  initialState,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);

export default store;
