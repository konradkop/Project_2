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
import backgroundImage from "./images/bg.png" 
import bubble from "./images/bubble.svg" 
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

  root: {
    display: "flex",
    height: "100vh",
    [theme.breakpoints.down("600")]: {
      display: "grid",
    }
  },
  image:{ 
    display: "flex",
    flexGrow: 1,
    //converted the colors to rgba since it supports opacity better
    backgroundImage: "linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(" + backgroundImage + ")",
    backgroundRepeat: "no-repeat;",
    backgroundSize: "cover",
    alignItems: "center", 
    justifyContent: "center",
    maxWidth: "40%",
    [theme.breakpoints.down("600")]: {
      maxWidth: "100%"
    }
  },

  imageText:{ 
    margin: 5,
    alignItems: "center", 
    justifyContent: "center",
    textAlign: "center"
  },
  imageWords:{ 
    fontSize: 40,
    color: "white",
    margin: 40
  },

  mainScreen:{ 
    flexGrow: 3 ,
    height: "80%",
    padding: 40,
  },

  form:{
    display: "flex",
    flexDirection: "column",
    height: "80%",
    justifyContent: "center",
  },

  innerForm:{
    margin: 10,
  },

  header:{
    justifyContent:"flex-end",
    alignItems: "center",
    [theme.breakpoints.down("600")]: {
      justifyContent:"center",
      marginBottom: "20px"
    }
  },

  secondaryButton:{
    color: "#3A8DFF",
    backgroundColor: "white",
    padding: "12px 28px"
  },

  textLarge:{
    fontSize: 45,
    fontWeight: "bold",
    [theme.breakpoints.down("600")]: {
      fontSize: 30,
    }
  },

  textGrey:{
  color: "grey",
  paddingRight: 20
  },

  primaryButtonContainer:{
    display: "flex",
    marginTop: 50,
    justifyContent:"center",
  },

  primaryButton:{
    color: "white",
    backgroundColor: "#3A8DFF",
    padding: "12px 70px",
    fontSize: 20,
    fontWeight: "bold",
  }

}));


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
            <img src={bubble} alt="bubble" height="100" width="100"/>
          </Icon>
        <Typography className={classes.imageWords}>Converse with anyone with any language</Typography>
      </Grid>
    </Grid>

      <Box className={classes.mainScreen} fullWidth>

        <Grid container item className={classes.header}>
          <Typography className={classes.textGrey}>Need to log in?</Typography>
          <Button variant="contained" size="large" className={classes.secondaryButton} onClick={() => history.push("/login")}>Login</Button>
        </Grid>


        <form onSubmit={handleRegister} class={classes.form}>
          <Grid class={classes.innerForm}>
            <Grid display="flex"> 
              <FormControl fullWidth>
                <Typography className={classes.textLarge}>Create an Account.</Typography>
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
              <FormControl fullWidth>
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
              <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
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
              <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
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
