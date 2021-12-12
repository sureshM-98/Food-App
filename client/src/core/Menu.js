import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: 'green' };
  } else {
    return { color: '#fff' };
  }
};

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#ffda40', // lite green'#e8ede1' yellow #ffda40
    marginBottom: 20,
  },
  title: {
    flex: 1,
    marginLeft: 60,
    color: 'black',
    '&:hover': {
      color: 'green',
      textDecoration: 'none',
    },
  },
  buttonStyles: {
    color: 'black',
    margin: '0 6px 0',
    display: 'inline-block',
  },
  buttons: {
    marginRight: 60,
  },
  name: {
    fontStyle: 'bold',
    fontSize: 32,
  },
  signinbutton: {
    color: '#fff',
    margin: '0 6px 0',
    display: 'inline-block',
    backgroundColor: '#000',
    borderRadius: 50,
    '&:hover': {
      color: '#000',
      border: '1px solid #000',
    },
  },
}));

const Menu = ({ history }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            <span className={classes.name}>FoodApp</span>
          </Typography>
        </Link>
        {/* <div className={classes.buttons}> */}
        <Link style={currentTab(history, '/')} to="/">
          <Button className={classes.buttonStyles}>Home</Button>
        </Link>

        <Link style={currentTab(history, '/cart')} to="/cart">
          <Button className={classes.buttonStyles}>Cart</Button>
        </Link>
        {/* </div> */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Link style={currentTab(history, '/user/dashboard')} className="nav-link" to="/user/dashboard">
            <Button className={classes.buttonStyles}>Orders</Button>
          </Link>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Link style={currentTab(history, '/admin/dashboard')} className="nav-link" to="/admin/dashboard">
            <Button className={classes.buttonStyles}>Admin Dashboard</Button>
          </Link>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <Link style={currentTab(history, '/signup')} className="nav-link" to="/signup">
              <Button className={classes.buttonStyles}>Signup</Button>
            </Link>
            <Link style={currentTab(history, '/signin')} className="nav-link" to="/signin">
              <Button className={classes.signinbutton} variant="outlined">
                Sign In
              </Button>
            </Link>
          </Fragment>
        )}
        {isAuthenticated() && (
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push('/');
              });
            }}
          >
            <Button className={classes.buttonStyles} variant="outlined">
              Signout
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Menu);
