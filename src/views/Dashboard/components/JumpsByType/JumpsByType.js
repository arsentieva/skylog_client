import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {  Card,  CardHeader,  CardContent,  Divider,  Typography} from '@material-ui/core';

import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LandscapeIcon from '@material-ui/icons/Landscape';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '200px'
  },
  stats: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center'
  },
  jumpType: {
    textAlign: 'center',
    paddingLeft: theme.spacing(2)
  },
  jumpTypeIcon: {
    color: theme.palette.icon
  }
}));

const JumpsByType = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          "#2176F3",
          "#00facc",
          "#08B6CE"
        ],
        borderWidth: 2,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Wingsuit ', 'Relative Work', 'Freeflying']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const types = [
    {
      title: 'Wingsuit',
      value: '63',
      icon: <EmojiPeopleIcon />,
      color: "#2176F3"
    },
    {
      title: 'Relative Work',
      value: '15',
      icon: <LandscapeIcon />,
      color: "#00facc",
    },
    {
      title: 'Freeflying',
      value: '23',
      icon: <AccessibilityIcon />,
      color:"#08B6CE"
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <CardHeader title="JUMP BY TYPE" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
        <Doughnut data={data}  options={options} />
        </div>
        <div className={classes.stats}>
            {types.map(jumpType => (
            <div className={classes.jumpType} key={jumpType.title} >
              <span className={classes.jumpTypeIcon}>{jumpType.icon}</span>
              <Typography variant="h5">{jumpType.title}</Typography>
              <Typography style={{ color: jumpType.color }} variant="h4" > {jumpType.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

JumpsByType.propTypes = {
  className: PropTypes.string
};

export default JumpsByType;
