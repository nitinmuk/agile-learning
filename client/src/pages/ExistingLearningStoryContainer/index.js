import React, { useRef, useState } from 'react';
import API from '../../utils/API';
import LearningStory from '../../components/LearningStory';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #fff8dc 30%, #fff8dc 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "black",
        padding: "30px",
    },
});
const ExistingLearningStoryContainer = ({ learningStoryToEdit, location }) => {
    const classes = useStyles();
    const titleRef = useRef("");
    const sessionCountRef = useRef("");
    const subjectRef = useRef("");
    const startDateRef = useRef("");
    const startTimeRef = useRef("");
    const storyStatusRef = useRef("");
    const storyContentRef = useRef("");
    const storyNoteRef = useRef("");
    const urlRef = useRef("");
    const [learningStoryStatus, setLearningStoryStatus] = useState("init");
    const [message, setMessage] = useState();

    /**
     * a handler to handle learning story update.
     * @param {learning story submit} event 
     */
    const handleLearningStory = async event => {
        event.preventDefault();
        event.stopPropagation();
        const learningStory = {
            title: titleRef.current.value.trim(),
            content: storyContentRef.current.value.trim(),
            sessionCount: sessionCountRef.current.value,
            subject: subjectRef.current.value,
            startDate: startDateRef.current.value,
            startTime: startTimeRef.current.value,
            status: storyStatusRef.current.value,
            notes: storyNoteRef.current.value,
            sessionLink: urlRef.current.value
        }
        try {
            setLearningStoryStatus("processing");
            if (learningStoryToEdit) {
                await API.updateLearningStory(learningStoryToEdit._id, learningStory);
                setTimeout(() => setLearningStoryStatus("successMessage"), 500);
                setMessage({ message: `${learningStory.title} learning story ${learningStoryToEdit ? "updated" : "created"} successfully`, severity: "success" })
                // wait for 3 seconds
                setTimeout(() => setLearningStoryStatus("done"), 3000);
            }
            else {
                console.log("Error", "learning story id not found");
                setMessage({ message: "Somethig went wrong. Please try again", severity: "error" });

            }
        } catch (error) {
            console.log("Error", error);
            setMessage({ message: "Failed To Create Learning Story. Please try again.", severity: "error" })
        }
    }
    if (learningStoryToEdit) {
        return (
            <Container className={classes.root}>
                <LearningStory
                    titleRef={titleRef}
                    sessionCountRef={sessionCountRef}
                    startDateRef={startDateRef}
                    startTimeRef={startTimeRef}
                    subjectRef={subjectRef}
                    storyStatusRef={storyStatusRef}
                    storyContentRef={storyContentRef}
                    storyNoteRef={storyNoteRef}
                    urlRef={urlRef}
                    handleLearningStory={handleLearningStory}
                    learningStoryStatus={learningStoryStatus}
                    message={message}
                    learningStoryToEdit={learningStoryToEdit}
                />
            </Container>
        );
    } else {
        return (
            (<Redirect to={{pathname: "/reviewLearningStory", state: {from: location}}}/>)
        );

    }
}

export default ExistingLearningStoryContainer;