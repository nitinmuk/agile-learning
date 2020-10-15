import React, { useEffect, useRef, useState } from 'react';
import Navigation from "../../Components/Navigation";
import { Route, Switch } from 'react-router-dom';
import LearningStory from "../../Components/LearningStory";
import PrivateRoute from '../../Components/PrivateRoute';
import API from '../../utils/API';
import Logout from "../../Components/Logout";
import LearningStoriesContainer from '../LearningStoriesContainer';
const Home = (homeProps) => {
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
    const [learningStoryToEdit, setLearningStoryToEdit] = useState();
    /**
     * home will not unmount and user can toggle
     * between review and create learning story action
     * therefore, a handler method to clear state related to
     * screen toggle which will be trigerred once user click any navigation link
     */
    const restoreState = () => {
        setLearningStoryStatus("init");
        setMessage(undefined);
        setLearningStoryToEdit(undefined);
        if (titleRef.current) {
            titleRef.current.value = "";
            sessionCountRef.current.value = "";
            subjectRef.current.value = "";
            startDateRef.current.value = "";
            startTimeRef.current.value = "";
            storyStatusRef.current.value = "";
            storyContentRef.current.value = "";
            storyNoteRef.current.value = "";
            urlRef.current.value = "";
        }
    }
    /**
     * a handler to handle learning story creation and update.
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
            }
            else {
                await API.createLearningStory(learningStory);
            }
            setTimeout(() => setLearningStoryStatus("successMessage"), 500);
            setMessage({ message: `${learningStory.title} learning story ${learningStoryToEdit ? "updated" : "created"} successfully`, severity: "success" })
            // wait for 2 seconds
            setTimeout(() => setLearningStoryStatus("done"), 2000);
        } catch (error) {
            console.log("Error", error);
            setMessage({ message: "Failed To Create Learning Story. Please try again.", severity: "error" })
        }
    }
    /**
     * once user clicks edit, this function will prepopulate data as
     * fetched from database.
     * @param {story id which user wants to edit} id 
     */
    const handleEditStory = learningStory => {
        setLearningStoryToEdit(learningStory);
    }
    return (
        <React.Fragment>
            <Navigation relevantLinks={getRelevantLinks()}
                restoreState={restoreState} />
            <Switch>
                <PrivateRoute
                    path="/learningStory"
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
                    component={LearningStory}
                    learningStoryStatus={learningStoryStatus}
                    message={message}
                    learningStoryToEdit={learningStoryToEdit}
                />
                <PrivateRoute
                    path="/review-learning-stories"
                    component={LearningStoriesContainer}
                    handleEditStory={handleEditStory}
                />
                <Route
                    exact
                    path="/logout"
                    render={(props =>
                        <Logout {...props}
                            handleLogout={homeProps.handleLogout}
                        />)}
                />
            </Switch>
        </React.Fragment>
    );

    function getRelevantLinks() {
        if (homeProps.studentUser) {
            return ["subscribedStories", "searchStories", "logOut", "home"]
        } else {
            return ["createLearningStory", "reviewLearningStory", "logOut", "home"]
        }
    }
}

export default Home;