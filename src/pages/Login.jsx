import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/users/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Declara el hook navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      const { token, user } = response.data;
      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      navigate('/tasks');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
              <div className="text-center">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px" alt="profile" />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color-sign-in px-5 mb-5 w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
              {
                error && 
                <div class="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              }
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                Registered? <a href="#" className="text-dark fw-bold"> Create an
                  Account</a>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
