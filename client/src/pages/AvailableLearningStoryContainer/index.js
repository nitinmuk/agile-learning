import React, { useState, useEffect } from "react";
import MessageAlert from "../../Components/MessageAlert";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../Components/CircularIndeterminate";
import API from "../../utils/API";
import AvailableLearningStoryListItem from "../../Components/AvailableLearningStoryListItem";

const AvailableLearningStoryContainer = ({ handleViewStory }) => {
    const [availableLearningStories, setAvailableLearningStories] = useState();
    const [containerStatus, setContainerStatus] = useState("init");
    const [message, setMessage] = useState();
    useEffect(
        () => {
            setContainerStatus("processing");
            API.getAvailableLearningStories()
                .then(response => {
                    setAvailableLearningStories(response.data);
                    setContainerStatus("init");
                })
                .catch(error => {
                    console.log(error);
                    setContainerStatus("displayMessage");
                    setMessage({
                        message: "OOPs.. Something went wrong. Please try again.",
                        severity: "error"
                    })
                });
        }
        , []);
    /**
     * calls API to subscribe learning story and also update 
     * available learningStories state
     * accordingly i.e. filter out subscribed learning story
     * @param {id of learning story to delete} id 
     */
    const handleSubscribeStory = async id => {
        try {
            setContainerStatus("processing");
            const selectedLearningStory = availableLearningStories.filter(ls => ls._id === id);
            await API.subscribeLearningStory(id);
            const filteredLearningStories = availableLearningStories.filter(ls => ls._id !== id);
            setAvailableLearningStories(filteredLearningStories);
            setTimeout(() => setContainerStatus("displayMessage"), 500);
            setMessage({
                message: `Congrats!! You successfully subscribed for 
            ${selectedLearningStory[0].title}`, severity: "success"
            });
            // wait for 3 seconds
            setTimeout(() => setContainerStatus("init"), 3000);
        } catch (error) {
            setContainerStatus("displayMessage");
            setMessage({
                message: `OOPs.. Something went wrong. Please try again.`,
                severity: "error"
            })
            console.log("Error during subscribe: ", error);
        }
    }

    if (!availableLearningStories || containerStatus === "processing") {
        return (
            <Container component="main" maxWidth="sm">
                <CircularIndeterminate />
            </Container>

        );
    }
    else if (containerStatus === "displayMessage") {
        return (
            <Container>
                <MessageAlert
                    {...message}
                />
            </Container>
        );
    }
    else if (availableLearningStories && availableLearningStories.length) {
        return (
            <AvailableLearningStoryListItem
                availableLearningStories={availableLearningStories}
                handleViewStory={handleViewStory}
                handleSubscribeStory={handleSubscribeStory} />
        );
    }
    else if (availableLearningStories && availableLearningStories.length === 0) {
        return (
            <Container>
                <MessageAlert
                    message="Sorry! There are no more available stories to subscribe. Please check again in few days."
                    severity="info"
                />
            </Container>
        );
    }
}

export default AvailableLearningStoryContainer;