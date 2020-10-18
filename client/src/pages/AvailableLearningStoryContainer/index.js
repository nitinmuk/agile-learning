import React, { useState, useEffect } from "react";
import MessageAlert from "../../components/MessageAlert";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import API from "../../utils/API";
import AvailableLearningStoryListItem from "../../components/AvailableLearningStoryListItem";

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

const AvailableLearningStoryContainer = ({ handleViewStory, latestOnly }) => {
    const classes = useStyles();
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
     * @param {id of learning story to subscribe} id 
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
            <Container component="main" maxWidth="md">
                <MessageAlert
                    {...message}
                />
            </Container>
        );
    }
    else if (availableLearningStories && availableLearningStories.length) {
        return (
            <Container className={classes.root}>
                <AvailableLearningStoryListItem
                    availableLearningStories={latestOnly ? availableLearningStories.slice(0,1):availableLearningStories}
                    handleViewStory={handleViewStory}
                    handleSubscribeStory={handleSubscribeStory}
                    reduceText={latestOnly ? true : false}
                />
            </Container>
        );
    }
    else if (availableLearningStories && availableLearningStories.length === 0) {
        return (
            <Container component="main" maxWidth="md">
                <MessageAlert
                    message="Sorry! There are no more available stories to subscribe. Please check again in few days."
                    severity="info"
                />
            </Container>
        );
    }
}

export default AvailableLearningStoryContainer;