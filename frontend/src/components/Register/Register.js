import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';
import { registerUser } from '../../redux/actions/users/userActions';
import Loading from '../Loading/Loading';
import ErrorMessage from '../DisplayMessage/ErrorMessage';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    if (userInfo) {
      navigate('/'); // Use navigate instead of history.push
    }
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {loading && <Loading />}
          {error && <ErrorMessage error={error.message || 'Something went wrong'} />}
          <h1 className='text-center'>Register</h1>

          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  value={name}
                  onChange={e => setname(e.target.value)}
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Enter Name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-info m-auto'>
                Register
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
