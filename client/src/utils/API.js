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
    saveLearningStory: function (learningStory) {
        return this.getAxios().post("/api/learningStory", learningStory);
    },
    getLearningStories: function () {
        return this.getAxios().get("/api/learningStories");
    }
}