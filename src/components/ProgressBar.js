/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineReload } from "react-icons/ai";

const outerProgressStyle =  { 
    width: 200, 
    background: "lightgray",
    height: 15,
    margin: '0 0.5em 0 0.25em',
    borderRadius: '0.5em',
    marginTop: '0.1em' 
}

export default function ProgressBar({ id, seconds, isChecked, selectProgressBar, animateCounter }) {
    const [width, setWidth] = useState(0);
    const [progressInterval, setProgressInterval] = useState(null);
    const [isStartClicked, setStartClicked] = useState(true)
    const [isStopClicked, setStopClicked] = useState(false)
    const PROGRESS_BAR_WIDTH = 200;

    useEffect(() => {
        onStart();
    }, []);

    useEffect(() => {
        if (isChecked) {
            onRestart();
        }
    }, [isChecked, animateCounter]);

    const onStart = () => {
        setStartClicked(true);
        setStopClicked(false);
        const widthPerSecond = PROGRESS_BAR_WIDTH / seconds;
        setProgressInterval(setInterval(() => {
            setWidth((width) => {
                if (width < PROGRESS_BAR_WIDTH) {
                    return (width + widthPerSecond);
                } else {
                    clearInterval(progressInterval);
                    return PROGRESS_BAR_WIDTH;
                }
            });
        }, 1000));
    };

    const onStop = () => {
        setStartClicked(false)
        setStopClicked(true)
        clearInterval(progressInterval);
    };

    const onRestart = () => {
        onStop();
        setWidth(0);
        onStart();
    };

    const handleCheckBoxChange = (e) => {
        selectProgressBar(id);
    }

    return (
        <div className="col-md-8 mt-half">
            <div className="flex">
                <input type="checkbox" name="checked" value={isChecked} onChange={handleCheckBoxChange} />

                <div style={outerProgressStyle}>
                    <div style={{ width: width, background: "#005cc8", height: 15, borderRadius: '0.5em' }}></div>
                </div>

                <AiFillPlayCircle color={isStartClicked ? '#005cc8' : null} onClick={() => onRestart()}/>
                <AiFillPauseCircle color={isStopClicked ? '#005cc8' : null} onClick={() => onStop()}/>
                <AiOutlineReload onClick={() => onRestart()} />
                <span className='seconds'> {seconds} seconds </span>
            </div>
            
        </div>
    );
}