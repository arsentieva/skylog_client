import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { LogJumpForm } from './components';
import { SkyLogContext } from '../../SkyLogContext';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const LogJump = () => {
  const classes = useStyles();
  const { authToken} = useContext(SkyLogContext);

  if (!authToken) {
    console.log(authToken);
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4} >
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LogJumpForm />

        </Grid>
      </Grid>
    </div>
  );
};

export default LogJump;
