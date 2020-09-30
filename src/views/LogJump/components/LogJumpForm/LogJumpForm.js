import React, { useState, useEffect, useContext } from 'react';
import { useAlert } from "react-alert";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, Select, MenuItem,TextField, FormControl, InputLabel,Typography, Slider} from '@material-ui/core';
import { SkyLogContext } from '../../../../SkyLogContext';
import DateTimePicker from './DateTimePicker';
import { apiBaseUrl } from "../../../../config";

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 100,
  },
  dateTime: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(-2),
  }
}));

const LogJumpForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const alert = useAlert();
  const { authToken} = useContext(SkyLogContext);
  const [wind, setWind] = useState(10);
  const [exit, setExit] = useState(6500);
  const [open, setOpen] = useState(4200);
  const [jumpTypes, setJumpTypes] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [title, setTitle] = useState("");
  const [freefall, setFreefall] = useState();
  const [aircraft, setAircraft] = useState("Cessna");
  const [location, setLocation] = useState("Snohomish");
  const [speed, setSpeed] = useState();
  const [notes, setNotes] = useState("");
  const [signature, setSignature] = useState("");
  const [id, setId] = useState();
  const [date, setDate] = useState(new Date());
  const [jumpTypeId, setJumpTypeId] = useState();
  const [jumpType, setJumpType] = useState();
  const [equipmentId, setEquipmentId] = useState();
  const [selectedEquipment, setSelectedEquipment] = useState();

  let jumpData= {
    id, title, jumpTypeId, equipmentId, exit, open, wind, aircraft, location, date, freefall, speed, notes, signature
  };

  useEffect(()=> {
    const fetchJumpTypes = async()=> {
      const response = await fetch(`${apiBaseUrl}/jumptypes`, {
        headers: { Authorization: `Bearer ${authToken}`}
      });
      if (response.ok) {
        const result = await response.json();
        setJumpTypes(Object.values(result.jumpTypes));
      }
   }
   fetchJumpTypes();
  }, [])

  useEffect(()=> {
    const fetchEquipment = async()=> {
      const response = await fetch(`${apiBaseUrl}/equipment`, {
        headers: { Authorization: `Bearer ${authToken}`}
      });
      if (response.ok) {
        const result = await response.json();
        setEquipment(Object.values(result.equipment));
    }
   }
   fetchEquipment();
  }, [])

  const handleSave = async (event)=> {
    event.preventDefault();
    const response = await fetch(`${apiBaseUrl}/jumps`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
    },
     body: JSON.stringify(jumpData)
    });
    if (response.ok) {
      resetScreen();
      alert.show('Jump Logged Successfully!')
  }
  }

  const resetScreen =()=> {
    setId();
    setTitle("");
    setWind(10);
    setExit(6500);
    setOpen(4200);
    setFreefall();
    setAircraft("cessna");
    setLocation("Snohomish");
    setSpeed();
    setNotes("");
    setSignature("");
    setDate(new Date());
    setJumpTypeId();
    setJumpType();
    setEquipmentId();
    setSelectedEquipment();
  }

  const handleChangeId = event => {
      setId(event.target.value);
  };
  const handleChangeTitle = event => {
      setTitle(event.target.value);
  };
  const handleChangeType = event => {
      setJumpTypeId(event.target.value);
  };
  const handleChangeEquipment = event => {
      setEquipmentId(event.target.value);
  };
  const handleChangeLocation = event => {
      setLocation(event.target.value);
  };
  const handleChangeAircraft = event => {
      setAircraft(event.target.value);
  };
  const handleChangeFreefall = event => {
      setFreefall(event.target.value);
  };
  const handleChangeSpeed = event => {
      setSpeed(event.target.value);
  };
  const handleChangeDate = event => {
      setDate(event.target.value);
  };
  const handleChangeNotes = event => {
      setNotes(event.target.value);
  };
  const handleChangeSignature = event => {
      setSignature(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <form autoComplete="off" noValidate >
        <CardHeader subheader="The information can be edited" title="Log Jump" />
        <Divider />
        <CardContent>
          <Grid container spacing={2} >
            <Grid item  md={2} xs={2}>
              <TextField fullWidth label="Jump Number" margin="dense" name="number" onChange={handleChangeId} required value={id} variant="outlined"/>
            </Grid>
            <Grid item md={7} xs={12}>
              <TextField fullWidth label="Name your jump" margin="dense" name="title" onChange={handleChangeTitle} required value={title} variant="outlined" />
            </Grid>
            <Grid item md={1} xs={6} >
              <FormControl className={classes.formControl}>
                <InputLabel>Jump Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={jumpType} onChange={handleChangeType} autoWidth>
                { jumpTypes.map((type) => { return <MenuItem key={type.id} value={type.id}> {type.type}</MenuItem>})}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} xs={6} >
              <FormControl className={classes.formControl}>
                <InputLabel>Equipment</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedEquipment} onChange={handleChangeEquipment} autoWidth>
                { equipment.map((eq) => { return <MenuItem key={eq.id} value={eq.id}> {eq.name} </MenuItem>})}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography id="vertical-slider" gutterBottom> Exit(ft)</Typography>
              <Slider defaultValue={6000} step={250} marks min={2500} max={16000} valueLabelDisplay="on" name="exit" onChange={(event, v)=> {setExit(v)}} required value={exit}/>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography id="vertical-slider" gutterBottom> Open(ft) </Typography>
              <Slider defaultValue={4500} step={250} marks min={2000} max={16000} valueLabelDisplay="on" name="open" onChange={(event, v)=> {setOpen(v)}} required value={open}/>
            </Grid>
            <Grid item md={4} xs={6} >
              <Typography id="vertical-slider" gutterBottom> Wind(mile/h) </Typography>
              <Slider defaultValue={10}  aria-labelledby="discrete-slider-small-steps"  step={1} marks min={1} max={25} valueLabelDisplay="on" name="wind"  onChange={(event, v)=> {setWind(v)}} value={wind} required />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField fullWidth label="Aircraft" margin="dense" name="aircraft" onChange={handleChangeAircraft}  required value={aircraft} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField fullWidth label="Location" margin="dense" name="location" onChange={handleChangeLocation}  required value={location} variant="outlined"/>
            </Grid>
            <Grid item md={1} xs={2}>
              <TextField fullWidth label="Freefall Time" margin="dense" name="title" onChange={handleChangeFreefall} required value={freefall} variant="outlined" />
            </Grid>
            <Grid item md={3} xs={3} >
              <TextField fullWidth label="Speed" margin="dense" name="velocity" onChange={handleChangeSpeed}  required value={speed} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12} >
              <div className={classes.dateTime}>
                <DateTimePicker onChange={handleChangeDate}  value={date} />
              </div>
            </Grid>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Notes" margin="dense" name="notes" onChange={handleChangeNotes}  required value={notes} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField fullWidth label="Signature" margin="dense" name="signature" onChange={handleChangeSignature}  required value={signature} variant="outlined"/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSave} >Save </Button>
        </CardActions>
      </form>
    </Card>
  );
};

LogJumpForm.propTypes = {
  className: PropTypes.string
};

export default LogJumpForm;
