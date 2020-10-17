import React, { useState, useEffect } from "react";
import MessageAlert from "../../components/MessageAlert";
import LearningStoryListItem from "../../components/LearningStoryListItem";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import API from "../../utils/API";

const LearningStoriesContainer = ({ handleEditStory }) => {
    const [learningStories, setLearningStories] = useState();
    const [containerStatus, setContainerStatus] = useState("init");
    useEffect(
        () => {
            setContainerStatus("processing");
            API.getLearningStories()
                .then(response => {
                    setLearningStories(response.data);
                    setContainerStatus("init");
                })
                .catch(error => {
                    console.log(error);
                    setContainerStatus("error");
                });
        }
        , []);
    /**
     * calls API to delete learning story and also update learningStories state
     * accordingly i.e. filter out deleted learning story
     * @param {id of learning story to delete} id 
     */
    const handleDeleteStory = async id => {
        try {
            setContainerStatus("processing");
            await API.deleteLearningStory(id);
            const filteredLearningStories = learningStories.filter(ls => ls._id !== id);
            setLearningStories(filteredLearningStories);
            setContainerStatus("init");
        } catch (error) {
            setContainerStatus("error");
            console.log("Error during delete: ", error);
        }
    }

    if (!learningStories || containerStatus === "processing") {
        return (
            <Container component="main" maxWidth="sm">
                <CircularIndeterminate />
            </Container>

        );
    }
    else if(containerStatus === "error") {
        return (
            <Container>
                <MessageAlert
                    message="OOPs.. Something went wrong. Please try again."
                    severity="error"
                />
            </Container>
        );
    }
    else if (learningStories && learningStories.length) {
        return (
            <LearningStoryListItem
                learningStories={learningStories}
                handleEditStory={handleEditStory}
                handleDeleteStory={handleDeleteStory} />
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
}

export default LearningStoriesContainer;