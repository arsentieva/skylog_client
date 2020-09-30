import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import {SkyLogContext} from "../../../../SkyLogContext";

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

const TotalPerYear = props => {
  const { className, ...rest } = props;
  const {jumps} = useContext(SkyLogContext);
  const classes = useStyles();

  const currentYear = new Date().getFullYear().toString();
  const getCurrentYearJumps=()=> {
    let jumpsThisYear= jumps.filter(jump=> {
      let [jumpYear] = jump.date.split("-");
      return jumpYear === currentYear;
    })
    return jumpsThisYear;
  }

  let jumpsThisYear = getCurrentYearJumps();

  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item>
            <Typography  className={classes.title} color="inherit" gutterBottom  variant="body1">TOTAL JUMPS IN {currentYear} </Typography>
            <Divider />
            <Typography className={classes.data} color="inherit" variant="h1"> {jumpsThisYear.length} </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalPerYear.propTypes = {
  className: PropTypes.string
};

export default TotalPerYear;
