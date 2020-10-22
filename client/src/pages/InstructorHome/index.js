import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LearningStoryStatusPieChart from "../../components/LearningStoryStatusPieChart";
import LearningStoriesContainer from "../LearningStoriesContainer";
import StudentCountBarChart from "../../components/StudentCountBarChart";
import PropTypes from "prop-types";

const InstructorHome = ({ handleEditStory }) => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
          <LearningStoriesContainer
            latestOnly={true}
            latestOnlyStatus="draft"
            handleEditStory={handleEditStory}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
          <LearningStoriesContainer
            latestOnly={true}
            latestOnlyStatus="published"
            handleEditStory={handleEditStory}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LearningStoryStatusPieChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StudentCountBarChart />
        </Grid>
      </Grid>
    </Container>
  );
};
InstructorHome.propTypes = {
  handleEditStory: PropTypes.func
};

export default InstructorHome;
