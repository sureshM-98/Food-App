import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

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
});

const Signin = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: 'suresh@gmail.com',
    password: '123456',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log('Signin request failed'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField className={classes.field} fullWidth required variant="standard" label="Email" color="primary" onChange={handleChange('email')} value={email} type="email" />

            <TextField className={classes.field} fullWidth required variant="standard" label="Password" color="primary" onChange={handleChange('password')} value={password} type="password" />

            <Button className={classes.button} onClick={onSubmit} variant="contained" type="submit" color="secondary">
              Submit
            </Button>
            <br />
            <small className={classes.small}>
              Don't have an account ? Signup <Link to="/signup">here</Link>
            </small>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="Welcome Back">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
