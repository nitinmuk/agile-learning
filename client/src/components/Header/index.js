import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1
    }
  },
  oneTitle: {
    flexGrow: 1
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly"
  }
}));

const Header = ({ history, relevantLinks }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleMenuClick = pageUrl => {
    history.push(pageUrl);
    setAnchorEl(null);
  };
  const handleButtonClick = pageUrl => history.push(pageUrl);

  const prepareMenuItems = () => {
    if (relevantLinks) {
      return relevantLinks.map(link => (
        <MenuItem key={link} onClick={() => handleMenuClick(getUrl(link))}>
          {getCaption(link)}
        </MenuItem>
      ));
    }
  };
  const prepareButtons = () => {
    if (relevantLinks) {
      return relevantLinks.map(link => (
        <Button
          key={link}
          style={{ color: "white" }}
          onClick={() => handleButtonClick(getUrl(link))}
        >
          {getCaption(link)}
        </Button>
      ));
    }
  };
  const getCaption = linkName => {
    switch (linkName) {
      case "home":
        return "Home";
      case "createLearningStory":
        return "Create Learning Story";
      case "signUp":
        return "Sign Up";
      case "logIn":
        return "Sign In";
      case "logOut":
        return "Sign Out";
      case "reviewLearningStory":
        return "review Learning Story";
      case "subscribedStories":
        return "subscribed courses";
      case "availableStories":
        return "available courses";
      default:
        return linkName;
    }
  };

  const getUrl = linkName => {
    switch (linkName) {
      case "home":
        return "/";
      case "signUp":
        return "/signup";
      case "logIn":
        return "/login";
      case "logOut":
        return "/logout";
      default:
        return `/${linkName}`;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={
              relevantLinks.length === 1 ? classes.oneTitle : classes.title
            }
          >
            Agile Learning
          </Typography>

          {isMobile ? (
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {prepareMenuItems()}
              </Menu>
            </div>
          ) : (
            <div
              className={
                relevantLinks.length === 1 ? null : classes.headerOptions
              }
            >
              {prepareButtons()}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
  relevantLinks: PropTypes.array.isRequired
};

export default withRouter(Header);
