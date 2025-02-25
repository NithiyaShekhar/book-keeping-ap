import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/users/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Logout handler
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
          Book Shelf
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          <ul className='navbar-nav m-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <button type='button' className='btn btn-danger' onClick={() => setShow(true)}>
                About
              </button>
            </li>
            {userInfo ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books'>Books</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/addbook'>Add book</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/users'>Users</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' onClick={() => dispatch(logoutUser())}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>Register</Link>
                </li>
              </>
            )}
            {userInfo && (
              <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle btn-dark' data-bs-toggle='dropdown' role='button'>
                  {userInfo.name}
                </a>
                <div className='dropdown-menu'>
                  <Link className='dropdown-item' to='/profile'>Profile</Link>
                  <Link className='dropdown-item' to='/addbook'>Add book</Link>
                  <Link className='dropdown-item' to='/books'>Books</Link>
                  <div className='dropdown-divider'></div>
                  <button onClick={logoutHandler} className='dropdown-item'>Logout</button>
                </div>
              </li>
            )}
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2' type='text' placeholder='Search' />
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>Search</button>
          </form>
        </div>
      </nav>

      {show && (
        <div className='modal fade show d-block' tabIndex='-1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>App functionalities</h5>
                <button type='button' className='close' onClick={() => setShow(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <ul className='list-group'>
                  <li className='list-group-item active'>Register User</li>
                  <li className='list-group-item'>Update Profile</li>
                  <li className='list-group-item'>Login</li>
                  <li className='list-group-item'>User Dashboard</li>
                  <li className='list-group-item'>List of Users</li>
                  <li className='list-group-item'>List of Books</li>
                  <li className='list-group-item'>Many more</li>
                </ul>
              </div>
              <div className='modal-footer'>
                <a className='mr-5' href='https://github.com/NithiyaShekhar/book-keeping-ap' target='_blank' rel='noopener noreferrer'>
                  Developed by: Nithiya
                </a>
                <button type='button' className='btn btn-danger' onClick={() => setShow(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
