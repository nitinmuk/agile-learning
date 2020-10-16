import React from "react";
import { Link } from 'react-router-dom';
export function Navigation({ relevantLinks, restoreState }) {
    const prepareLinks = () => {
        if (relevantLinks) {
            return relevantLinks.map(link => 
            <li key={link} style={{ margin: "0 1em" }}><Link to={getLink(link)}>{getCaption(link)}</Link></li>);
        }
    }
    const getCaption = (linkName) => {
        switch (linkName) {
            case "home":
                return "Home";
            case "createLearningStory":
                return "Create Learning Story";
            case "signUp":
                return "SignUp";
            case "logIn":
                return "SignIn";
            case "logOut":
                return "SignOut";
            case "reviewLearningStory":
                return "review Learning Story"
            default:
                return linkName;
        }
    }
    const getLink = (linkName) => {
        switch (linkName) {
            case "home":
                return "/";
            case "createLearningStory":
                return "/createLearningStory";
            case "signUp":
                return "/signup";
            case "logIn":
                return "/login";
            case "logOut":
                return "/logout";
            case "reviewLearningStory":
                return "/reviewLearningStory";
            default:
                return linkName;
        }
    }
    return (
        <nav>
            <ul style={{ display: "flex", listStyle: "none" }}>
                {prepareLinks()}
            </ul>
        </nav>
    )
}

export default Navigation;