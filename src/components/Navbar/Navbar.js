import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch( { type: LOGOUT });

    navigate("/");
    setUser(null);
  };

  console.log(user);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile'))); 
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} align="center">
              HandBook
              {/* <img src={} alt="handbook" height="60" /> */}
          </Typography>
        </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} src={user.picture}>{user.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.name}</Typography>
              <Button 
                variant="contained" 
                className={classes.logout} 
                color="secondary" 
                onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar