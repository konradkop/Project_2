import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Icon,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import bubble from "./images/bubble.svg" 
import { useStyles } from './styles';   

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }
  

  return (
    <Box className={classes.root}>
        <Grid className={classes.image}>
          <Grid className={classes.imageText}>
            <Icon>
              <img src={bubble} alt="bubble" class={classes.icon}/>
            </Icon>
            <Typography className={classes.imageWords}>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>

      <Grid className={classes.mainScreen}> 
          <Grid container item className={classes.header}>
            <Typography className={classes.textGreyWithMargin}>Don't have an account?</Typography>
            <Button variant="contained" size="large" className={classes.secondaryButton}  onClick={() => history.push("/register")}>Create Account</Button>
          </Grid>
          <form onSubmit={handleLogin} class={classes.form}>
          <FormControl fullWidth>
            <Grid class={classes.innerForm}>
              <Grid display="flex">
              <Typography className={classes.textLarge}>Welcome Back!</Typography>
                <FormControl margin="normal" required className={classes.formField}>
                  <TextField
                    aria-label="Username"
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" required className={classes.formField}>
                <TextField
                  label="Password"
                  aria-label="Password"
                  type="password"
                  name="password"
                  fullWidth
                />
              </FormControl>
              <Grid className={classes.primaryButtonContainer}>
                <Button type="submit" variant="contained" size="large"  className={classes.primaryButton}>
                  Login
                </Button>
              </Grid>
            </Grid>
            </FormControl>
          </form>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
