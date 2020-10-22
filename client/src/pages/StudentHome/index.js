import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LearningStorySubjectPieChart from "../../components/LearningStorySubjectPieChart";
import SubscribedLearningStoryContainer from "../SubscribedLearningStoryContainer";
import AvailableLearningStoriesContainer from "../AvailableLearningStoryContainer";
import LearningStoryStudentCountBarChart from "../../components/LearningStoryStudentCountBarChart";
import PropTypes from "prop-types";

const StudentHome = ({ handleViewStory }) => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
          <SubscribedLearningStoryContainer
            latestOnly={true}
            handleViewStory={handleViewStory}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
          <AvailableLearningStoriesContainer
            latestOnly={true}
            handleViewStory={handleViewStory}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LearningStorySubjectPieChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LearningStoryStudentCountBarChart />
        </Grid>
      </Grid>
    </Container>
  );
};

StudentHome.propTypes = {
  handleViewStory: PropTypes.func.isRequired
};

export default StudentHome;
