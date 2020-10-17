import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useHistory  } from "react-router-dom";

const ViewLearningStoryContainer = ({ learningStoryToView }) => {
    console.log("learningStoryToView", learningStoryToView);
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();
    return learningStoryToView ?
     (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <DescriptionOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Learning Story
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                InputProps={{
                                    readOnly: true,
                                }}
                                helperText="Course Title"
                                value={learningStoryToView.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                id="sessionCount"
                                label="Duration in hours"
                                helperText="No. of hours"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={learningStoryToView.sessionCount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Subject"
                                id="subject"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={learningStoryToView.subject}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                type="date"
                                id="startDate"
                                label="Start Date"
                                helperText="First Session Start Date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={learningStoryToView.startDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                type="time"
                                id="time"
                                label="time"
                                helperText="Your first session start time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={learningStoryToView.startTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                InputProps={{
                                    readOnly: true,
                                }}
                                id="storyContent"
                                label="Course Content"
                                helperText="topic details which will be discussed"
                                name="storyContent"
                                value={learningStoryToView.content}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                id="storeNote"
                                label="Notes For Student:"
                                helperText="keep checking for any update."
                                name="storyContent"
                                value={learningStoryToView.notes}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={useHistory().goBack}
                    >
                        CLOSE
                    </Button>
                </form>
            </div>
        </Container>
    ) 
    : <Redirect to={{pathname: "/login"}}/>
}

export default ViewLearningStoryContainer;