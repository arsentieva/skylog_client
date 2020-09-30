import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { SkyLogContext } from '../../SkyLogContext';

import {
  JumpLog,
  JumpsByType,
  SkydiveLevels,
  TotalPerMonth,
  JumpGauge,
  FreefallTime,
  FreefallDistance,
  TotalPerYear,
  Aircrafts,
  Dropzones
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const {jumps, loadJumps, authToken} = useContext(SkyLogContext);

  useEffect( ()=> {
    if(jumps.length=== 0){
      loadJumps();
    }
  },[ loadJumps, jumps.length])

  if (!authToken) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4} >
        <Grid item lg={3} sm={6} xl={2} xs={12}> <TotalPerYear /> </Grid>
        <Grid item lg={3} sm={6} xl={2} xs={12}> <TotalPerMonth /> </Grid>
        <Grid item lg={3} sm={6} xl={2} xs={12}> <FreefallTime /> </Grid>
        <Grid item lg={3} sm={6} xl={2} xs={12}> <FreefallDistance /> </Grid>
        <Grid item lg={3} sm={6} xl={2} xs={12}> <Dropzones /> </Grid>
        <Grid item lg={3} sm={6} xl={2} xs={12}> <Aircrafts /> </Grid>
        <Grid item lg={6} sm={6} xl={4} xs={12}> <SkydiveLevels/> </Grid>
        <Grid item lg={6} md={6} xl={4} xs={12}> <JumpsByType /> </Grid>
        <Grid item lg={6} md={6} xl={4} xs={12}> <JumpGauge /> </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}> <JumpLog /> </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
