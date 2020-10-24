import React, { useState } from "react";
import API from "../../utils/API";
import LearningStory from "../../components/LearningStory";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #fff8dc 30%, #fff8dc 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    padding: "30px"
  }
});
const NewLearningStoryContainer = () => {
  const classes = useStyles();
  const [learningStoryStatus, setLearningStoryStatus] = useState("init");
  const [message, setMessage] = useState();

  /**
   * a handler to handle learning story creation and update.
   * @param {learning story submit} event
   */
  const handleLearningStory = async learningStory => {
    try {
      setLearningStoryStatus("processing");
      await API.createLearningStory({
        ...learningStory,
        startDate: learningStory.startDate.toFormat("dd/MM/yyyy")
      });
      setTimeout(() => setLearningStoryStatus("successMessage"), 500);
      setMessage({
        message: `${learningStory.title} learning story created successfully`,
        severity: "success"
      });
      // wait for 3 seconds
      setTimeout(() => setLearningStoryStatus("done"), 3000);
    } catch (error) {
      setLearningStoryStatus("error");
      setMessage({
        message: "Failed To Create Learning Story. Please try again.",
        severity: "error"
      });
    }
  };

  return (
    <Container className={classes.root}>
      <LearningStory
        handleLearningStory={handleLearningStory}
        learningStoryStatus={learningStoryStatus}
        message={message}
      />
    </Container>
  );
};

export default NewLearningStoryContainer;
