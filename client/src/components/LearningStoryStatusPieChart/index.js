import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import API from "../../utils/API";
import MessageAlert from "../MessageAlert";
import CircularIndeterminate from "../CircularIndeterminate";

const initChartdata = {
	labels: [
		'Draft',
		'Published',
		'Cancelled'
	],
	datasets: [{
		data: [0, 0, 0],
		backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		],
		hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		]
	}]
};

const LearningStoryStatusPieChart = () => {
	const [chartData, setChartData] = useState(initChartdata);
	const [chartStatus, setChartStatus] = useState("init");
	const [message, setMessage] = useState();
	const getStoryStatusData = learningStories => {
		const chartData = [];
		let draftCount = 0, publishedCount = 0, cancelledCount = 0;
		if (learningStories && learningStories.length) {
			learningStories.forEach(ls => {
				switch (ls.status) {
					case "draft":
						draftCount++;
						break;
					case "published":
						publishedCount++;
						break
					case "cancelled":
						cancelledCount++;
						break;
					default:
						console.log(`Error: Invalid status ${ls.status}`);
				}

			});
			chartData.push(draftCount ? draftCount : 0);
			chartData.push(publishedCount ? publishedCount : 0);
			chartData.push(cancelledCount ? cancelledCount : 0);
		}
		return chartData;
	}
	useEffect(() => {
		setChartStatus("processing");
		API.getUser()
			.then(response => {
				initChartdata.datasets[0].data = getStoryStatusData(response.data.learningStories);
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
					<Pie data={chartData} />
					<Typography style={{ textAlign: "center" }}>Learning Story Status Distribution</Typography>
				</Container>
			);
	}
};

export default LearningStoryStatusPieChart;