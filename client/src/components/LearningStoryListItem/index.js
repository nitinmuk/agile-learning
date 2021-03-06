import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const getBriefTitle = title =>
  title.length > 20 ? `${title.substring(0, 20)}...` : title;

const getBriefContent = content =>
  content.length > 70 ? `${content.substring(0, 70)}...` : content;

const LearningStoryListItem = ({
  learningStories,
  handleEditStory,
  handleDeleteStory,
  reduceText
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {learningStories.map(ls => renderLearningStory(ls, classes))}
    </Container>
  );

  function renderLearningStory(ls, classes) {
    return (
      <Accordion key={ls._id} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{ls.subject}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {reduceText ? getBriefTitle(ls.title) : ls.title}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {ls.startDate}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {ls.status}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div>
            <Typography variant="caption">
              {reduceText ? getBriefContent(ls.content) : ls.content}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleEditStory(ls)}
          >
            <Link to="/editLearningStory" style={{ color: "white" }}>
              EDIT
            </Link>
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteStory(ls._id)}
          >
            DELETE
          </Button>
        </AccordionActions>
      </Accordion>
    );
  }
};

LearningStoryListItem.propTypes = {
  learningStories: PropTypes.array.isRequired,
  handleEditStory: PropTypes.func,
  handleDeleteStory: PropTypes.func,
  reduceText: PropTypes.bool
};

export default LearningStoryListItem;
