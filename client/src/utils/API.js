import axios from "axios";
export default {
    signUpUser : function(user) {
        return axios.post("/api/signup", user);
    },
    login : function(userDetails) {
        return axios.post("/api/login", userDetails);
    }
}