import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import API from "../../utils/API";
import MessageAlert from "../MessageAlert";
import CircularIndeterminate from "../CircularIndeterminate";

const initChartdata = {
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56',    
			"#a05195",
			"#d45087",
			"#f95d6a",
			"#ff7c43",
		],
		hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56',    
			"#a05195",
			"#d45087",
			"#f95d6a",
			"#ff7c43",
		]
	}]
};

const LearningStoryStatusPieChart = () => {
	const [chartData, setChartData] = useState(initChartdata);
	const [chartStatus, setChartStatus] = useState("init");
	const [message, setMessage] = useState();
	const getStorySubjectData = (learningStories, uniqueSubjects) => {
		const chartData = [];
		if (learningStories && learningStories.length) {
			for (let i = 0; i < uniqueSubjects.length; i++) {
				chartData[i] = 0;
				learningStories.forEach(ls => {
					if (ls.subject === uniqueSubjects[i]) {
						chartData[i]++;
					}
				});
			}
		}
		return chartData;
	}
	const getUniqueSubjects = learningStories => {
		const uniqueSubjects = [];
		console.log(learningStories);
		if (learningStories && learningStories.length) {
			learningStories.forEach(ls => {
				if (!uniqueSubjects.includes(ls.subject)) {
					uniqueSubjects.push(ls.subject);
				}
			});
		}
		return uniqueSubjects;
	}
	useEffect(() => {
		setChartStatus("processing");
		API.getUser()
			.then(response => {
				initChartdata.labels = getUniqueSubjects(response.data.subscribedStories);
				initChartdata.datasets[0].data = getStorySubjectData(
					response.data.subscribedStories, initChartdata.labels);
				setChartData(initChartdata);
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
				<Container>
					<Typography variant="h6" style={{ textAlign: "center" }}>Subscribed Courses Subject Distribution</Typography>
					<Pie data={chartData} />	
				</Container>
			);
	}
};

export default LearningStoryStatusPieChart;