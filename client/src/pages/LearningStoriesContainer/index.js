import React, { useState, useEffect } from "react";
import MessageAlert from "../../Components/MessageAlert";
import RenderLearningStories from "../../Components/RenderLearningStories";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../Components/CircularIndeterminate";
import API from "../../utils/API";

const LearningStoriesContainer = ({ handleEditStory }) => {
    const [learningStories, setLearningStories] = useState();
    useEffect(
        () => {
            API.getLearningStories()
                .then(response => setLearningStories(response.data))
                .catch(error => console.log(error));
        }
        , []);

    if (learningStories && learningStories.length) {
        return (
            <RenderLearningStories
                learningStories={learningStories}
                handleEditStory={handleEditStory} />
        )
    }
    else if (learningStories && learningStories.length === 0) {
        return (
            <Container>
                <MessageAlert
                    message="You have no learning stories to view."
                    severity="info"
                />
            </Container>
        );
    }
    else {
        return (
            <Container component="main" maxWidth="sm">
                <CircularIndeterminate />
            </Container>
        );
    }
}

export default LearningStoriesContainer;