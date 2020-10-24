import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularIndeterminate from "../CircularIndeterminate";
import MessageAlert from "../MessageAlert";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { DateTime } from "luxon";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  }
}));

const LearningStory = props => {
  const classes = useStyles();
  useEffect(() => {
    initLearningStory();
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [sessionCount, setSessionCount] = useState("");
  const [subject, setSubject] = useState("Computer Science");
  const [startTime, setStartTime] = useState("");
  const [storyStatus, setStoryStatus] = useState("draft");
  const [storyContent, setStoryContent] = useState("");
  const [storyNote, setStoryNote] = useState("");
  const [url, setUrl] = useState("");

  /**
   * intialize various form fields with learning story sent as prop
   */
  function initLearningStory() {
    if (props.learningStoryToEdit) {
      setTitle(props.learningStoryToEdit.title);
      setStoryContent(props.learningStoryToEdit.content);
      setSessionCount(props.learningStoryToEdit.sessionCount);
      setSubject(props.learningStoryToEdit.subject);
      setStartDate(
        DateTime.fromFormat(props.learningStoryToEdit.startDate, "dd/MM/yyyy")
      );
      setStartTime(props.learningStoryToEdit.startTime);
      setStoryStatus(props.learningStoryToEdit.status);
      setStoryNote(props.learningStoryToEdit.notes);
      setUrl(props.learningStoryToEdit.sessionLink);
    }
  }
  switch (props.learningStoryStatus) {
    case "done":
      return <Redirect to="/" />;
    case "processing":
      return (
        <Container component="main" maxWidth="sm">
          <CircularIndeterminate />
        </Container>
      );
    case "successMessage":
      return (
        <Container component="main" maxWidth="md">
          <MessageAlert {...props.message} />
        </Container>
      );
    case "init":
    default:
      return (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
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
                      value={title}
                      onChange={event => setTitle(event.target.value)}
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
                      value={sessionCount}
                      onChange={event => setSessionCount(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="subject">Subject</InputLabel>
                      <Select
                        labelId="Subject"
                        id="subject"
                        required
                        defaultValue="Computer Science"
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                      >
                        <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
                        <MenuItem value={"Computer Science"}>
                          Computer Science
                        </MenuItem>
                        <MenuItem value={"English"}>English</MenuItem>
                        <MenuItem value={"Hindi"}>Hindi</MenuItem>
                        <MenuItem value={"Maths"}>Maths</MenuItem>
                        <MenuItem value={"Physics"}>Physics</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                      <FormHelperText>Select Related Subject</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Start Date"
                      required
                      helperText="when will be the first session?"
                      format="dd/MM/yyyy"
                      disablePast={true}
                      value={startDate}
                      onChange={date => setStartDate(date)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="time"
                      id="time"
                      label="time"
                      helperText="at what time will be the first session?"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={startTime}
                      onChange={event => setStartTime(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="storyStatus">Status</InputLabel>
                      <Select
                        labelId="Story Status"
                        id="storyStatus"
                        defaultValue="draft"
                        value={storyStatus}
                        renderValue={() => {
                          switch (storyStatus) {
                            default:
                            case "draft":
                              return "Draft";
                            case "published":
                              return "Publish";
                            case "cancelled":
                              return "Cancel";
                          }
                        }}
                        onChange={event => setStoryStatus(event.target.value)}
                      >
                        <MenuItem value={"draft"}>Draft</MenuItem>
                        <MenuItem value={"published"}>Publish</MenuItem>
                        <MenuItem value={"cancelled"}>Cancel</MenuItem>
                      </Select>
                      <FormHelperText>
                        publish once all fields are populated
                      </FormHelperText>
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
                      value={storyContent}
                      onChange={event => setStoryContent(event.target.value)}
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
                      value={storyNote}
                      onChange={event => setStoryNote(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="sessionUrl"
                      label="Session URL"
                      helperText="link to join the learning session"
                      name="sessionUrl"
                      value={url}
                      onChange={event => setUrl(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={event => {
                    event.preventDefault();
                    const ls = {
                      title: title.trim(),
                      content: storyContent.trim(),
                      sessionCount: sessionCount,
                      subject: subject,
                      startDate: startDate,
                      startTime: startTime,
                      status: storyStatus,
                      notes: storyNote,
                      sessionLink: url
                    };
                    props.handleLearningStory(ls);
                  }}
                >
                  Submit
                </Button>
                <MessageAlert {...props.message} />
              </form>
            </div>
          </Container>
        </MuiPickersUtilsProvider>
      );
  }
};

LearningStory.propTypes = {
  learningStoryToEdit: PropTypes.object,
  learningStoryStatus: PropTypes.string.isRequired,
  message: PropTypes.object,
  handleLearningStory: PropTypes.func.isRequired
};

export default LearningStory;
