import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  button: {
    marginTop: 20,
    marginBottom: 14,
    position: 'relative',
  },
  small: {
    fontSize: 16,
  },
  form: {
    textAlign: 'center',
  },
  title: {
    margin: '48px 0px 10px 0px',
    textAlign: 'center',
  },
});

const Signup = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField className={classes.field} fullWidth required variant="standard" label="FullName" color="primary" onChange={handleChange('name')} value={name} type="text" />

            <TextField className={classes.field} fullWidth required variant="standard" label="Email" color="primary" onChange={handleChange('email')} value={email} type="email" />

            <TextField className={classes.field} fullWidth required variant="standard" label="Password" color="primary" onChange={handleChange('password')} value={password} type="password" />

            <Button className={classes.button} onClick={onSubmit} variant="contained" type="submit" color="secondary">
              Submit
            </Button>
            <br />
            <small className={classes.small}>
              Already have an account ? Login <Link to="/signin">here</Link>
            </small>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Hi, Your Account wae Created Succesfully. Please <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="Create your Account  🍕">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
