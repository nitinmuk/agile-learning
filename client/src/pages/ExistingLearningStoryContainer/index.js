import React, { useState } from "react";
import API from "../../utils/API";
import LearningStory from "../../components/LearningStory";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    //cornsilk
    background: "linear-gradient(45deg, #fff8dc 30%, #fff8dc 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    padding: "30px"
  }
});
const ExistingLearningStoryContainer = ({ learningStoryToEdit, location }) => {
  const classes = useStyles();
  const [learningStoryStatus, setLearningStoryStatus] = useState("init");
  const [message, setMessage] = useState();

  /**
   * a handler to handle learning story update.
   * @param {learning story submit} event
   */
  const handleLearningStory = async learningStory => {
    try {
      setLearningStoryStatus("processing");
      if (learningStoryToEdit) {
        await API.updateLearningStory(learningStoryToEdit._id, {
          ...learningStory,
          startDate: learningStory.startDate.toFormat("dd/MM/yyyy")
        });
        setTimeout(() => setLearningStoryStatus("successMessage"), 500);
        setMessage({
          message: `${learningStory.title} learning story ${
            learningStoryToEdit ? "updated" : "created"
          } successfully`,
          severity: "success"
        });
        // wait for 3 seconds
        setTimeout(() => setLearningStoryStatus("done"), 3000);
      } else {
        setMessage({
          message: "Somethig went wrong. Please try again",
          severity: "error"
        });
      }
    } catch (error) {
      setLearningStoryStatus("error");
      setMessage({
        message: "Failed To Create Learning Story. Please try again.",
        severity: "error"
      });
    }
  };
  if (learningStoryToEdit) {
    return (
      <Container className={classes.root}>
        <LearningStory
          handleLearningStory={handleLearningStory}
          learningStoryStatus={learningStoryStatus}
          message={message}
          learningStoryToEdit={learningStoryToEdit}
        />
      </Container>
    );
  }
  return (
    <Redirect
      to={{ pathname: "/reviewLearningStory", state: { from: location } }}
    />
  );
};

ExistingLearningStoryContainer.propTypes = {
  learningStoryToEdit: PropTypes.object,
  location: PropTypes.object
};

export default ExistingLearningStoryContainer;
