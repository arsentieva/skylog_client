import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { SkyLogContext } from '../../../../SkyLogContext';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logoImage: {
    marginTop: theme.spacing(0.5),
    width: 60,
    borderRadius: 100
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const {loginOut} = useContext(SkyLogContext);
  const classes = useStyles();
  const [notifications] = useState([]);
 
  const handleSignOut = () => loginOut();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} >
      <Toolbar>
        <RouterLink to="/">
          <img className={classes.logoImage} alt="Logo" src="/images/logos/skylog.png" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} color="inherit" onClick={handleSignOut} > <InputIcon /></IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen} ><MenuIcon /></IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
