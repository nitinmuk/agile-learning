import React, { useState, useEffect } from "react";
import MessageAlert from "../../components/MessageAlert";
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import API from "../../utils/API";
import SubscribedLearningStoryListItem from "../../components/SubscribedLearningStoryListItem";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        padding: "30px",
    },
});

const SubscribedLearningStoryContainer = ({ handleViewStory, latestOnly }) => {
    const classes = useStyles();
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
            <Container component="main" maxWidth="md">
                <MessageAlert
                    {...message}
                />
            </Container>
        );
    }
    else if (subscribedLearningStories && subscribedLearningStories.length) {
        return (
            <Container className={classes.root}>            
            <SubscribedLearningStoryListItem
                subscribedLearningStories={latestOnly ? subscribedLearningStories.slice(0,1) : subscribedLearningStories}
                handleViewStory={handleViewStory}
                handleUnsubscribeStory={handleUnsubscribeStory} 
                reduceText={latestOnly ? true : false}
                />
            </Container>
        );
    }
    else if (subscribedLearningStories && subscribedLearningStories.length === 0) {
        return (
            <Container component="main" maxWidth="md">
                <MessageAlert
                    message="You are not subscribed to any learning story currently. Please subscribe few."
                    severity="info"
                />
            </Container>
        );
    }
}

export default SubscribedLearningStoryContainer;