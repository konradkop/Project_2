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
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "./images/bg.png" 
import bubble from "./images/bubble.svg" 
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
    flexGrow: 5,
    height: "80%",
    padding: 40
  },

  form:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
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
  paddingRight: 20,
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
              <img src={bubble} alt="bubble" height="100" width="100"/>
            </Icon>
            <Typography className={classes.imageWords}>Converse with anyone with any language</Typography>
          </Grid>
        </Grid>

      <Grid className={classes.mainScreen}> 
          <Grid container item className={classes.header}>
            <Typography className={classes.textGrey}>Don't have an account?</Typography>
            <Button variant="contained" size="large" className={classes.secondaryButton}  onClick={() => history.push("/register")}>Create Account</Button>
          </Grid>
          <form onSubmit={handleLogin} class={classes.form}>
          <FormControl fullWidth>
            <Grid class={classes.innerForm}>
              <Grid display="flex">
              <Typography className={classes.textLarge}>Welcome Back!</Typography>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    aria-label="Username"
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" required fullWidth>
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
