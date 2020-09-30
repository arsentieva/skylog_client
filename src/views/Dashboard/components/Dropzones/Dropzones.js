import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {SkyLogContext} from "../../../../SkyLogContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background:  'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundImage: "url(/images/logos/unnamed.png)",
    backgroundSize: "390px 250px"
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  location: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  },
  locationIcon: {
    color: theme.palette.error.dark
  },

  divider: {
    marginBottom: theme.spacing(1),
  }
}));

const Dropzones = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const {jumps} = useContext(SkyLogContext)
  const getUniqueDropzones = ()=> {
    let uniqueDropzones=[]
    let dropzones = jumps.map(jump=> jump.location);
    if(dropzones) {
      uniqueDropzones= [...new Set(dropzones)]
    }
    return uniqueDropzones;
  }

  const uniqueDropzones = getUniqueDropzones();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">DROPZONES</Typography>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
            <div className={classes.location}>
            <LocationOnIcon className={classes.locationIcon}/>
            <Typography variant="h1">{uniqueDropzones.length}</Typography>
            </div>

      </CardContent>
    </Card>
  );
};

Dropzones.propTypes = {
  className: PropTypes.string
};

export default Dropzones;
