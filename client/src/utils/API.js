import axios from "axios";
export default {
    signUpUser : function(user) {
        return axios.post("/api/signup", user);
    },
    isAuthenticated :  function() {return localStorage.getItem("token")}
}