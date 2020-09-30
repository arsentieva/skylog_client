import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import {SkyLogContext} from "../../../../SkyLogContext";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background:  'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  data: {
    marginTop: theme.spacing(3),
     }
}));

const TotalPerMonth = props => {
  const { className, ...rest } = props;
  const {jumps} = useContext(SkyLogContext);
  const classes = useStyles();

  const currentMonth = new Date().getMonth()+1;
  const currentMonthSpelled = moment.months()[currentMonth-1].toUpperCase();

  const getCurrentMonthJumps=()=> {
    let jumpsThisMonth= jumps.filter(jump=> {
      let [_, month] = jump.date.split("-");
      const jumpMonth =month.substring(1);
      return currentMonth.toString() === jumpMonth;
    })
    return jumpsThisMonth;
  }

  const jumpsThisMonth = getCurrentMonthJumps();

  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item>
            <Typography  className={classes.title} color="inherit" gutterBottom  variant="body1" >TOTAL JUMPS IN {currentMonthSpelled} </Typography>
            <Divider />
            <Typography className={classes.data} color="inherit" variant="h1" >{jumpsThisMonth.length} </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalPerMonth.propTypes = {
  className: PropTypes.string
};

export default TotalPerMonth;
