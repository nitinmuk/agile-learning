import React, { useState } from "react";
import Navigation from "../../Components/Navigation";
import { Route, Switch } from "react-router-dom";
import NewLearningStoryContainer from "../NewLearningStoryContainer";
import ExistingLearningStoryContainer from "../ExistingLearningStoryContainer";
import Logout from "../../Components/Logout";
import LearningStoriesContainer from "../LearningStoriesContainer";
import AvailableLearningStoryContainer from "../AvailableLearningStoryContainer";
import SubscribedLearningStoryContainer from "../SubscribedLearningStoryContainer";
import ViewLearningStoryContainer from "../ViewLearningStoryContainer";
import Footer from "../../Components/Footer";
import Box from '@material-ui/core/Box';

const Home = (homeProps) => {
    const [learningStoryToEdit, setLearningStoryToEdit] = useState();
    const [learningStoryToView, setLearningStoryToView] = useState();
    /**
     * once user clicks edit, this function will prepopulate data as
     * fetched from database.
     * @param {story id which user wants to edit} id 
     */
    const handleEditStory = learningStory => {
        setLearningStoryToEdit(learningStory);
    }
    const handleViewStory = learningStory => {
        setLearningStoryToView(learningStory);
    }
    return (
        <React.Fragment>
            <Navigation relevantLinks={getRelevantLinks()} />
            <Switch>
                <Route path="/createLearningStory">
                    <NewLearningStoryContainer />
                </Route>
                <Route
                    path="/editLearningStory"
                    render={(props =>
                        <ExistingLearningStoryContainer {...props}
                            learningStoryToEdit={learningStoryToEdit}
                        />)}
                />
                <Route
                    path="/reviewLearningStory"
                    render={(props =>
                        <LearningStoriesContainer {...props}
                            handleEditStory={handleEditStory}
                        />)}
                />
                <Route
                    path="/availableStories"
                    render={(props =>
                        <AvailableLearningStoryContainer {...props}
                            handleViewStory={handleViewStory}
                        />)}
                />
                <Route
                    path="/subscribedStories"
                    render={(props =>
                        <SubscribedLearningStoryContainer {...props}
                            handleViewStory={handleViewStory}
                        />)}
                />
                <Route
                    path="/viewLearningStory"
                    render={(props =>
                        <ViewLearningStoryContainer {...props}
                            learningStoryToView={learningStoryToView}
                        />)}
                />
                <Route
                    path="/logout"
                    render={(props =>
                        <Logout {...props}
                            handleLogout={homeProps.handleLogout}
                        />)}
                />
            </Switch>
            <Box mt={5}>
                <Footer />
            </Box>
        </React.Fragment>
    );

    function getRelevantLinks() {
        if (homeProps.studentUser) {
            return ["subscribedStories", "availableStories", "logOut", "home"]
        } else {
            return ["createLearningStory", "reviewLearningStory", "logOut", "home"]
        }
    }
}

export default Home;