import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "./images/bg.png" 

export const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100vh",
        [theme.breakpoints.down("sm")]: {
          display: "grid",
          height: "100%",
        }
      },
      image:{ 
        display: "flex",
        flexGrow: 1,
        //converted the colors to rgba since it supports opacity better
        backgroundImage: "linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(" + backgroundImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center", 
        justifyContent: "center",
        maxWidth: "40%",
        [theme.breakpoints.down("sm")]: {
          maxWidth: "100%",
        }
      },
    
      imageText:{ 
        margin: theme.spacing(10),
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center"
      },
      imageWords:{ 
        fontSize: theme.typography.fontSizeLar,
        color: theme.palette.white.main,
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.typography.fontSizeMed,
          margin:  theme.spacing(5),
        }
      },
    
      icon:{
        height:100,
        width: 100, 
        [theme.breakpoints.down("sm")]: {
          height:30,
          width: 30, 
        }
      },
    
      mainScreen:{ 
        flexGrow: 3 ,
        height: "80%",
        padding: theme.spacing(40),
        [theme.breakpoints.down("sm")]: {
          height: "100%",
        }
      },
    
      form:{
        display: "flex",
        flexDirection: "column",
        height: "80%",
        justifyContent: "center",
      },
    
      formField:{
        width: "100%",
        maxWidth: "600px",
      },
    
      innerForm:{
        margin: theme.spacing(10),
      },
    
      header:{
        justifyContent:"flex-end",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          justifyContent:"center",
        }
      },
    
      secondaryButton:{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.white.main,
        padding: theme.buttonPadding,
      },
    
      textLarge:{
        fontSize: theme.typography.fontSizeLar,
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.typography.fontSizeMed,
        }
      },

      textGreyWithMargin:{
        color: "grey",
        paddingRight: theme.spacing(20),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(10)
        }
      },
    
      textGrey:{
      color: "grey",
      paddingRight: theme.spacing(20)
      },
    
      primaryButtonContainer:{
        display: "flex",
        marginTop: theme.spacing(50),
        justifyContent:"center",
      },
    
      primaryButton:{
        color: theme.palette.white.main,
        backgroundColor: theme.palette.primary.main,
        padding: theme.buttonPadding,
        fontSize: theme.typography.fontSizeMed,
        fontWeight: "bold",
      }
}));
