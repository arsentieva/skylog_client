import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import {SkyLogContext} from "../../../../SkyLogContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background:  'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  airplane: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  },
  airplaneIcon: {
    color: "#2176F3"
  },
  divider: {
    marginBottom: theme.spacing(1),
  }
}));

const Aircrafts = props => {
  const { className, ...rest } = props;
  const {jumps} = useContext(SkyLogContext);
  const classes = useStyles();

  const getUniqueAircrafts = ()=> {
    let uniqueAircrafts=[]
    let aircrafts = jumps.map(jump=> jump.aircrafts);
    if(aircrafts) {
      uniqueAircrafts= [...new Set(aircrafts)]
    }
    return uniqueAircrafts;
  }

  const uniqueAircrafts = getUniqueAircrafts();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item>
            <Typography className={classes.title} color="inherit" gutterBottom variant="body1"> AIRCRAFTS</Typography>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <div className={classes.airplane}>
          <AirplanemodeActiveIcon className={classes.airplaneIcon} />
  <Typography  color="#000000"  variant="h1">{uniqueAircrafts.length}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Aircrafts.propTypes = {
  className: PropTypes.string
};

export default Aircrafts;
