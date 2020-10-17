import React, { useState, useEffect } from "react";
import MessageAlert from "../../components/MessageAlert";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import API from "../../utils/API";
import SubscribedLearningStoryListItem from "../../components/SubscribedLearningStoryListItem";

const SubscribedLearningStoryContainer = ({ handleViewStory }) => {
    const [subscribedLearningStories, setSubscribedLearningStories] = useState();
    const [containerStatus, setContainerStatus] = useState("init");
    const [message, setMessage] = useState();
    useEffect(
        () => {
            setContainerStatus("processing");
            API.getSubscribedLearningStories()
                .then(response => {
                    setSubscribedLearningStories(response.data);
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
     * calls API to unsubscribe learning story and also update 
     * subscribed learningStories state
     * accordingly i.e. filter out unsubscribed learning story
     * @param {id of learning story to unsubscribe} id
     */
    const handleUnsubscribeStory = async id => {
        try {
            setContainerStatus("processing");
            const selectedLearningStory = subscribedLearningStories.filter(ls => ls._id === id);
            await API.unSubscribeLearningStory(id);
            const filteredLearningStories = subscribedLearningStories.filter(ls => ls._id !== id);
            setSubscribedLearningStories(filteredLearningStories);
            setTimeout(() => setContainerStatus("displayMessage"), 500);
            setMessage({
                message: `You have successfully unsubscribed from 
            ${selectedLearningStory[0].title}. We will miss you. See you soon.`, severity: "success"
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

    if (!subscribedLearningStories || containerStatus === "processing") {
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
    else if (subscribedLearningStories && subscribedLearningStories.length) {
        return (
            <SubscribedLearningStoryListItem
                subscribedLearningStories={subscribedLearningStories}
                handleViewStory={handleViewStory}
                handleUnsubscribeStory={handleUnsubscribeStory} />
        );
    }
    else if (subscribedLearningStories && subscribedLearningStories.length === 0) {
        return (
            <Container>
                <MessageAlert
                    message="You are not subscribed to any learning story currently. Please subscribe few."
                    severity="info"
                />
            </Container>
        );
    }
}

export default SubscribedLearningStoryContainer;