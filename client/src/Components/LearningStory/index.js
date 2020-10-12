import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from "../Footer";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
}));

const LearningStory = (props) => {
    const classes = useStyles();
    return (
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
                                autoComplete="title"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                autoFocus
                                helperText="Give a catchy title to get attention."
                                inputRef={props.titleRef}
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
                                helperText="How many hours of sessions?"
                                inputRef={props.sessionCountRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="subject">Subject</InputLabel>
                                <Select
                                    labelId="Subject"
                                    id="subject"
                                    required
                                    defaultValue="computerScience"
                                    inputRef={props.subjectRef}
                                >
                                    <MenuItem value={"chemistry"}>Chemistry</MenuItem>
                                    <MenuItem value={"computerScience"}>Computer Science</MenuItem>
                                    <MenuItem value={"english"}>English</MenuItem>
                                    <MenuItem value={"hindi"}>Hindi</MenuItem>
                                    <MenuItem value={"Maths"}>Maths</MenuItem>
                                    <MenuItem value={"physics"}>Physics</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                                <FormHelperText>Select Related Subject</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="datetime-local"
                                id="startDate"
                                label="Start Date & Time"
                                helperText="when will be the first session?"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={props.startDateRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="storyStatus">Status</InputLabel>
                                <Select
                                    labelId="Story Status"
                                    id="storyStatus"
                                    defaultValue="draft"
                                    inputRef={props.storyStatusRef}
                                >
                                    <MenuItem value={"draft"}>Draft</MenuItem>
                                    <MenuItem value={"publish"}>Publish</MenuItem>
                                    <MenuItem value={"cancel"}>Cancel</MenuItem>
                                </Select>
                                <FormHelperText>publish once all fields are populated</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                id="storyContent"
                                label="Story Content"
                                helperText="what will be discussed?"
                                name="storyContent"
                                inputRef={props.storyContentRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                id="storeNote"
                                label="Notes For Student:"
                                helperText="Any additional information to pass on to students?"
                                name="storyContent"
                                inputRef={props.storyNoteRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="sessionUrl"
                                label="Session URL"
                                helperText="link to join the learning session"
                                name="storyContent"
                                inputRef={props.urlRef}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.handleLearningStory}
                    >
                        Submit
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Footer />
            </Box>
        </Container>
    );
}

export default LearningStory;