import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Icon,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import bubble from "./images/bubble.svg" 
import { useStyles } from './styles'; 


const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.image}>
        <Grid className={classes.imageText}>
          <Icon>
            <img src={bubble} alt="bubble" class={classes.icon}/>
          </Icon>
        <Typography className={classes.imageWords}>Converse with anyone with any language</Typography>
      </Grid>
    </Grid>

      <Box className={classes.mainScreen}>

        <Grid container item className={classes.header}>
          <Typography className={classes.textGrey}>Need to log in?</Typography>
          <Button variant="contained" size="large" className={classes.secondaryButton} onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <form onSubmit={handleRegister} class={classes.form}>
          <Grid class={classes.innerForm}>
          <Typography className={classes.textLarge}>Create an Account.</Typography>
            <Grid> 
              <FormControl className={classes.formField} >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                    fullWidth
                  />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl  className={classes.formField}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.formField} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  fullWidth
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.formField} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  fullWidth
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.primaryButtonContainer}>
              <Button className={classes.primaryButton} type="submit" variant="contained" size="large">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
