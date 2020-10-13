import React, { useEffect, useState } from "react";
import API from '../../utils/API';
import MessageAlert from "../../Components/MessageAlert";
import RenderLearningStories from "../../Components/RenderLearningStories";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../Components/CircularIndeterminate";


const LearningStoriesContainer = () => {
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
            <RenderLearningStories learningStories={learningStories} />
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