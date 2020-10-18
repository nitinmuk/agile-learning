import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import API from "../../utils/API";
import MessageAlert from "../MessageAlert";
import CircularIndeterminate from "../CircularIndeterminate";

const initChartData = {
    labels: [],
    datasets: [
        {
            label: 'Subcribed Student Count',
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }
    ]
};

const LearningStoryStudentCountBarChart = () => {
    const [chartData, setChartData] = useState(initChartData);
    const [chartStatus, setChartStatus] = useState("init");
    const [message, setMessage] = useState();

    /**
     * returns an array of published learning story titles
     * @param {instructors learning stories} learningStories 
     */
    const getStoryTitles = learningStories => {
        const storyTitles = [];
        if (learningStories && learningStories.length) {
            learningStories.forEach(ls => {
                if (ls.status === "published") {
                    storyTitles.push(ls.title);
                }
            });
        }
        return storyTitles;
    }
    /**
     * returns an array of subscribed student counts 
     * for each published learning story
     * @param {instructor's learning stories} learningStories 
     */
    const getStudentCounts = learningStories => {
        const studentCounts = [];
        if (learningStories && learningStories.length) {
            learningStories.forEach(ls => {
                if (ls.status === "published") {
                    studentCounts.push(ls.subscribers.length);
                }

            });
        }
        return studentCounts;
    }
    useEffect(() => {
        setChartStatus("processing");
        API.getUser()
            .then(response => {
                initChartData.labels = getStoryTitles(response.data.subscribedStories);
                initChartData.datasets[0].data = getStudentCounts(response.data.subscribedStories);
                setChartData(initChartData);
                setChartStatus("init");
            })
            .catch(error => {
                console.log("Error: ", error);
                setChartStatus("error");
                setMessage({
                    message: "OOPs.. Something went wrong. Please try again.",
                    severity: "error"
                });
            })
    }, []);
    switch (chartStatus) {
        case "processing":
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
            )

        default:
            return (
                <Container maxwidth="sm">
                    <Typography variant="h6" style={{ textAlign: "center" }}>Students Count Per Course</Typography>
                    <Bar
                        data={chartData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />                    
                </Container>
            );
    }
};

export default LearningStoryStudentCountBarChart;