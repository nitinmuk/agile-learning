import axios from "axios";
import isAuthenticated from "./isAuthenticated";
export default {
    getAxios : function() {
        return axios.create({
            headers: {'Authorization': `Bearer ${isAuthenticated()}`}
        });
    },
    signUpUser: function (user) {
        return axios.post("/api/signup", user);
    },
    login: function (userDetails) {
        return axios.post("/api/login", userDetails);
    },
    getUser: function () {
        return this.getAxios().get("/api/user");
    },
    createLearningStory: function (learningStory) {
        return this.getAxios().post("/api/learningStory", learningStory);
    },
    getLearningStories: function () {
        return this.getAxios().get("/api/learningStories");
    },
    updateLearningStory: function(id, learningStory) {
        return this.getAxios().put(`/api/learningStory/${id}`, learningStory);
    },
    deleteLearningStory: function(id) {
        return this.getAxios().delete(`/api/learningStory/${id}`);
    }
}