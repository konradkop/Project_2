import React from "react";
import {
  Grid,
  Typography,
  Icon,
} from "@material-ui/core";
import { useStyles } from './styles'
import bubble from "./images/bubble.svg" 


const LoginImage = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.image}>
      <Grid className={classes.imageText}>
        <Icon>
          <img src={bubble} alt="bubble" className={classes.icon}/>
        </Icon>
        <Typography className={classes.imageWords}>Converse with anyone with any language</Typography>
      </Grid>
    </Grid>
);
}


export default LoginImage;
