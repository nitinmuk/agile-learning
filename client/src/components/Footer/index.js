import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
const Footer = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/nitinmuk" target="_blank" rel="noopener noreferrer">
          Nitin Mukesh
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Footer;