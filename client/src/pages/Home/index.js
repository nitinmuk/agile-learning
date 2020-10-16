import React, { useState } from 'react';
import Navigation from "../../Components/Navigation";
import { Route, Switch } from 'react-router-dom';
import NewLearningStoryContainer from "../../Components/NewLearningStoryContainer";
import ExistingLearningStoryContainer from "../../Components/ExistingLearningStoryContainer";
import PrivateRoute from '../../Components/PrivateRoute';

import Logout from "../../Components/Logout";
import LearningStoriesContainer from '../LearningStoriesContainer';
const Home = (homeProps) => {
    const [learningStoryToEdit, setLearningStoryToEdit] = useState();
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
                <PrivateRoute
                    path="/reviewLearningStory"
                    component={LearningStoriesContainer}
                    handleEditStory={handleEditStory}
                />
                <Route
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