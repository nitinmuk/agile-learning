import React, { useEffect, useState } from "react";
import InstructorHome from "../../pages/InstructorHome";
import StudentHome from "../../pages/StudentHome";
import CircularIndeterminate from "../CircularIndeterminate";
import { Container } from '@material-ui/core';
import API from "../../utils/API";
import MessageAlert from "../MessageAlert";

const HomeContainer = ({ handleEditStory, handleViewStory }) => {
    const [homeState, setHomeState] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState("processing");
    useEffect(() => {
        API.getUser()
            .then(response => {
                setHomeState(response.data.student ? "Student" : "Instructor");
                setStatus("init");
            })
            .catch(error => {
                console.log(error);
                setMessage({
                    message: "OOPs.. Something went wrong. Please try again.",
                    severity: "error"
                });
                setStatus("error");
            });
    }, []);

    switch (status) {
        case "processing":
        default:
            return (
                <Container component="main" maxWidth="sm">
                    <CircularIndeterminate />
                </Container>
            );
        case "error":
            return (
                <Container>
                    <MessageAlert
                        {...message}
                    />
                </Container>
            );
        case "init":
            return homeState === "Student" ?
                (
                    <StudentHome handleViewStory={handleViewStory} />
                ) :
                (
                    <InstructorHome handleEditStory={handleEditStory} />
                )


    }


}

export default HomeContainer;