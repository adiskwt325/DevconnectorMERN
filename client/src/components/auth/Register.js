import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {

  const [ formData, setFormData ] =  useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (event) => {
    const elementname = event.target.name;
    const elementvalue = event.target.value;
    setFormData(values => ({...values, [elementname]: elementvalue}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    }else{
      register({ name, email, password });
      // Below code can also be used to hit register user
      // api and get the user token but we will use redux to this

      // const newUser = {
      //   name: name,
      //   email: email,
      //   password: password
      // }

      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post('/api/users', body, config);
      //   console.log(res.data);
      // } catch (error) {
      //   console.error(error.response.data);
      // }
    }
  }

  // Redirect if logged in
  if(isAuthenticated){
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={ handleChange } />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={ handleChange } />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={ handleChange }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </Fragment>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, { setAlert, register })(Register);