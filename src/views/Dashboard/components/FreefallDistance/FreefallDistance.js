import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {SkyLogContext} from "../../../../SkyLogContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  divider: {
    marginBottom: theme.spacing(1),
  }
}));

const FreefallDistance = props => {
  const { className, ...rest } = props;
  const {jumps} = useContext(SkyLogContext);
  const classes = useStyles();

  const getFreefallDistanceFormatted = ()=> {
    let freefallDistances = jumps.map(jump=> jump.exit - jump.open);
    let totalDistance = 0;
    if(freefallDistances.length>0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      totalDistance = freefallDistances.reduce(reducer);
    }
     return Math.round(totalDistance / 5280);
  }
  const getFreefallDistance = (passedJumps)=> {
    let freefallDistances = passedJumps.map(jump=> jump.exit - jump.open);
    let totalDistance = 0;
    if(freefallDistances.length>0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      totalDistance = freefallDistances.reduce(reducer);
    }
     return Math.round(totalDistance / 5280);
  }

  const totalMiles = getFreefallDistanceFormatted();

  const currentMonth = new Date().getMonth()+1;
  const getMonthJumps=(month)=> {
    let jumpsThisMonth= jumps.filter(jump=> {
      let [_, jumpMonth] = jump.date.split("-");
      const jumpMonthFormatted =jumpMonth.substring(1);
      return month.toString() === jumpMonthFormatted;
    })
    return jumpsThisMonth;
  }


  let currentMonthFreefallTime = 0;
  let lastMonthFreefallTime = 0;
  let percentDelta = 0;
  const jumpsCurrentMonth = getMonthJumps(currentMonth);
  if(jumpsCurrentMonth){
   currentMonthFreefallTime = getFreefallDistance(jumpsCurrentMonth);
  }
  const jumpsLastMonth = getMonthJumps(currentMonth-1);
  if(jumpsLastMonth){
   lastMonthFreefallTime = getFreefallDistance(jumpsLastMonth);
  }
  const increase = currentMonthFreefallTime > lastMonthFreefallTime;

   if(currentMonthFreefallTime!==0 || lastMonthFreefallTime!==0){
   percentDelta =  Math.round(100 * Math.abs( (currentMonthFreefallTime - lastMonthFreefallTime) /
                         ( (currentMonthFreefallTime+lastMonthFreefallTime)/2 ) ));
   }
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2"> FREEFALL DISTANCE</Typography>
            <Divider className={classes.divider} />
            <Typography variant="h3">{totalMiles} miles</Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}> { increase ?  <ArrowUpwardIcon className={classes.differenceIcon} /> :
          <ArrowDownwardIcon className={classes.differenceIcon} />}
          <Typography className={classes.differenceValue} variant="body2"> {percentDelta}% </Typography>
          <Typography className={classes.caption} variant="caption" > Since last month </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

FreefallDistance.propTypes = {
  className: PropTypes.string
};

export default FreefallDistance;
