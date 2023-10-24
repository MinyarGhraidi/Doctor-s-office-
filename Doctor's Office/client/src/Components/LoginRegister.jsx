import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = (props) => {
  const navigate = useNavigate();
  const [User, setUser] = useState({ email: '', password: '' });
  const [userName, setUserName] = useState('');
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const [errorObject, setErrorObject] = useState({});

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/api/users/login', User, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('eeeeeeeeeeee', res.data.userFromDB.firstName);
        setUserName(res.data.userFromDB.firstName);
        console.log('*****************', userName);
        setUser({ email: '', password: '' });
        navigate('/Dashboard');
      })
      .catch((err) => console.log(err));
  };

  const createUser = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/api/users/register', newUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('✅✅✅✅Client Success ✅✅✅✅', res.data);
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/');
      })
      .catch((err) => {
        console.log('❌❌❌', err.response.data);
        setErrorObject(err.response.data);
        const errorsArr = [];
        for (const key of Object.keys(err.response.data)) {
          // create a table to store errors for each input
          errorsArr.push(err.response.data[key].message);
        }
        setErrors(errorsArr);
      });
  };

  return (
    <div className='fullContainer'>
      
    <div className="container">
        <h1> <mark>Welcome to doctor's Office</mark></h1>
      <div className="row">
      
        <div className="col-md-6">
          <h3 style={{ backgroundColor: '#92b5d7' }}>Sign Up</h3>
          <hr />
          <center>
            <form className="form-row" onSubmit={createUser}>
              <div className="form-group col-md-6">
                <label>
                  <h6 style={{ color: 'black' }}>First Name</h6>
                </label>
                {errorObject.firstName ? (
                  <p className="text-danger">
                    {errorObject.firstName.message}
                  </p>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your First Name"
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  value={newUser.firstName}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <h6 style={{ color: 'black' }}>Last Name </h6>
                </label>
                {errorObject.lastName ? (
                  <p className="text-danger">
                    {errorObject.lastName.message}
                  </p>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Last Name"
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  value={newUser.lastName}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <h6 style={{ color: 'black' }}>Email </h6>
                </label>
                {errorObject.email ? (
                  <p className="text-danger">{errorObject.email.message}</p>
                ) : (
                  ''
                )}
                <input
                  className="form-control"
                  placeholder="Enter your Email"
                  type="email"
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  value={newUser.email}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <h6 style={{ color: 'black' }}>Password </h6>
                </label>
                {errorObject.password ? (
                  <p className="text-danger">
                    {errorObject.password.message}
                  </p>
                ) : (
                  ''
                )}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  value={newUser.password}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <h6 style={{ color: 'black' }}>Confirm Password</h6>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your Password"
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      confirmPassword: e.target.value,
                    })
                  }
                  value={newUser.confirmPassword}
                />
              </div>
              <br />
              <div className="form-group col-md-6">
                <button className="btn btn-primary">Register</button>{' '}
                     
                
              </div>
            </form>
          </center>
        </div>
        <div className="col-md-6">
          <h3 style={{ backgroundColor: '#92b5d7' }}>Sign In</h3>
          <hr />
          <center>
            <form className="form-row" onSubmit={loginUser}>
              <div className="form-group col-md-6" >
                <label><h6 style={{ color: 'black' }}>Email </h6></label>
                <input
                  className="form-control"
                  placeholder="Enter your Email"
                  type="email"
                  onChange={(e) =>
                    setUser({ ...User, email: e.target.value })
                  }
                  value={User.email}
                />
              </div>
              <div className="form-group col-md-6">
                <label><h6 style={{ color: 'black' }}>Password </h6></label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(e) =>
                    setUser({ ...User, password: e.target.value })
                  }
                  value={User.password}
                />
              </div>
              <br />
              <div className="form-group col-md-6">
               
               
                <button className="btn btn-primary">Login</button>     
             
              </div>
            </form>
          </center>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginRegister;
