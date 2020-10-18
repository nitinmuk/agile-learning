import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      background: "linear-gradient(45deg, #3f51b5 30%, #FF8E53 90%)",
      bottom: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      padding: "20px"
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/nitinmuk" target="_blank" rel="noopener noreferrer">
          Nitin Mukesh
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
      
  }

export default Footer;