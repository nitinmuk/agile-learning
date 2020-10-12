import React, { useRef } from 'react';
import Navigation from "../../Components/Navigation";
import { Route, Switch } from 'react-router-dom';
import LearningStory from "../../Components/LearningStory";
import PrivateRoute from '../../Components/PrivateRoute';
import API from '../../utils/API';
import Logout from "../../Components/Logout";
const Home = (homeProps) => {
    const titleRef = useRef("");
    const sessionCountRef = useRef("");
    const subjectRef = useRef("");
    const startDateRef = useRef("");
    const storyStatusRef = useRef("");
    const storyContentRef = useRef("");
    const storyNoteRef = useRef("");
    const urlRef = useRef("");    
    const handleLearningStory = async event => {
        event.preventDefault();
        event.stopPropagation();
        const learningStory = {
            title: titleRef.current.value.trim(),
            content: storyContentRef.current.value.trim(),
            sessionCount: sessionCountRef.current.value,
            subject: subjectRef.current.value,
            startDate: startDateRef.current.value,
            status: storyStatusRef.current.value,
            notes: storyNoteRef.current.value,
            sessionLink: urlRef.current.value
        }
        try {
            await API.saveLearningStory(learningStory);
        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <React.Fragment>
            <Navigation relevantLinks={getRelevantLinks()} />
            <Switch>
                <PrivateRoute
                    path="/learningStory"
                    titleRef={titleRef}
                    sessionCountRef={sessionCountRef}
                    startDateRef={startDateRef}
                    subjectRef={subjectRef}
                    storyStatusRef={storyStatusRef}
                    storyContentRef={storyContentRef}
                    storyNoteRef={storyNoteRef}
                    urlRef={urlRef}
                    handleLearningStory={handleLearningStory}
                    component={LearningStory}
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