import React, { useState, useEffect , useContext } from 'react';
import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, TextField, Link, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { apiBaseUrl } from "../../config";
import GoogleLogin from 'react-google-login';
import {SkyLogContext} from "../../SkyLogContext";
import { Google as GoogleIcon } from 'icons';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 700,
    textShadow: "#ABC 1px 0 10px",
    marginTop:theme.spacing(-17),
    textTransform: "uppercase"
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;
  const {login , authToken} = useContext(SkyLogContext);
  // const [email, setEmail] = useState("demo@example.com");
  // const [password, setPassword] = useState("1");
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  if (authToken) {
    return <Redirect to="/" />;
  }

  const handleSignIn =async(event) => {
    event.preventDefault();
    let email=formState.values.email;
    let password=formState.values.password;
    console.log(email, password);
    try {
      const res = await fetch(`${apiBaseUrl}/users/token`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw res;
      }
      const { token} = await res.json();

      login(token);

    } catch (error) {
      console.log(error)
      let errorMsg ="";
      if(error.status === 401) {
        errorMsg = "The provided credentials were invalid";
      }
      setFormState(formState => ({
        ...formState,
        isValid: false,
        errors: { email: [errorMsg], password: [""] },

      }));
      console.log(formState);
    }
  };

  const handleDemoSignIn = async(event) => {
    event.preventDefault();
    let email="demo@skylog.com";
    let password="1";
    try {
      const res = await fetch(`${apiBaseUrl}/users/token`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw res;
      }
      const { token} = await res.json();

      login(token);

    } catch (error) {
      console.log(error)
      let errorMsg ="";
      if(error.status === 401) {
        errorMsg = "The provided credentials were invalid";
      }
      setFormState(formState => ({
        ...formState,
        isValid: false,
        errors: { email: [errorMsg], password: [""] },

      }));
      console.log(formState);
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleFailGoogleSignIn = (response) => {
    console.log(response);
    setFormState(formState => ({
      ...formState,
      isValid: false,
      errors: { social: ["login failed"] },
    }));
  }
  const handleGoogleSignIn = (response) => {
    // window.localStorage.setItem('state-skylog-app-token', response.tokenId);
    // window.localStorage.setItem('state-skylog-app-method', "gapi");
    // history.push('/');
    login(response.tokenId);
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1"> Once you tasted the taste of Sky, you will forever look up. </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12} >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form}  onSubmit={handleSignIn} >
                <Typography className={classes.title} variant="h2"> Sign in</Typography>
                <Grid className={classes.socialButtons} container spacing={2} >
                  <Grid item>
                    <Button color="primary" onClick={handleDemoSignIn} size="large" variant="contained" >Login With Demo User</Button>
                  </Grid>
                  <Grid item>
                    <GoogleLogin clientId="903312556036-iadcqp28eqijomh10mckbi1r6962vlcv.apps.googleusercontent.com"
                      render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} isSignedIn={true} size="large" variant="contained" >
                          <GoogleIcon className={classes.socialIcon} /> Login with Google
                        </Button>
                      )}  buttonText="Login"  onSuccess={handleGoogleSignIn}
                      onFailure={handleFailGoogleSignIn} cookiePolicy={'single_host_origin'} />

                  </Grid>
                </Grid>
                <Typography align="center" className={classes.sugestion} color="textSecondary" variant="body1" > or login with email address
                </Typography>
                <TextField className={classes.textField} error={hasError('email')} fullWidth  helperText={  hasError('email') ? formState.errors.email[0] : null}
                  label="Email address" name="email" onChange={handleChange} type="text" value={formState.values.email || ''} variant="outlined" />
                <TextField className={classes.textField} error={hasError('password')} fullWidth helperText={ hasError('password') ? formState.errors.password[0] : null }
                  label="Password" name="password" onChange={handleChange} type="password" value={formState.values.password || ''} variant="outlined" />
                <Button className={classes.signInButton} color="primary"disabled={!formState.isValid} fullWidth size="large" type="submit" variant="contained" > Sign in now </Button>
                <Typography color="textSecondary" variant="body1"> Don't have an account?{' '} <Link component={RouterLink} to="/sign-up" variant="h6" >Sign up</Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
