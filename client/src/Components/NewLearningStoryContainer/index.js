import React, { useRef, useState } from 'react';
import API from '../../utils/API';
import LearningStory from '../LearningStory';
const NewLearningStoryContainer = () => {
    const titleRef = useRef("");
    const sessionCountRef = useRef("");
    const subjectRef = useRef("");
    const startDateRef = useRef("");
    const startTimeRef = useRef("");
    const storyStatusRef = useRef("");
    const storyContentRef = useRef("");
    const storyNoteRef = useRef("");
    const urlRef = useRef("");
    const [learningStoryStatus, setLearningStoryStatus] = useState("init");
    const [message, setMessage] = useState();    
    /**
     * a handler to handle learning story creation and update.
     * @param {learning story submit} event 
     */
    const handleLearningStory = async event => {
        event.preventDefault();
        event.stopPropagation();
        const learningStory = {
            title: titleRef.current.value.trim(),
            content: storyContentRef.current.value.trim(),
            sessionCount: sessionCountRef.current.value,
            subject: subjectRef.current.value,
            startDate: startDateRef.current.value,
            startTime: startTimeRef.current.value,
            status: storyStatusRef.current.value,
            notes: storyNoteRef.current.value,
            sessionLink: urlRef.current.value
        }
        try {
            setLearningStoryStatus("processing");            
            await API.createLearningStory(learningStory);
            setTimeout(() => setLearningStoryStatus("successMessage"), 500);
            setMessage({ message: `${learningStory.title} learning story created successfully`, severity: "success" })
            // wait for 3 seconds
            setTimeout(() => setLearningStoryStatus("done"), 3000);
        } catch (error) {
            console.log("Error", error);
            setMessage({ message: "Failed To Create Learning Story. Please try again.", severity: "error" })
        }
    }

    return (
        <LearningStory
            titleRef={titleRef}
            sessionCountRef={sessionCountRef}
            startDateRef={startDateRef}
            startTimeRef={startTimeRef}
            subjectRef={subjectRef}
            storyStatusRef={storyStatusRef}
            storyContentRef={storyContentRef}
            storyNoteRef={storyNoteRef}
            urlRef={urlRef}
            handleLearningStory={handleLearningStory}
            learningStoryStatus={learningStoryStatus}
            message={message}
        />
    );
}

export default NewLearningStoryContainer;