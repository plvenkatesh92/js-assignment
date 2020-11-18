/* eslint-disable */
import React, {useState } from 'react';
import ProgressBar from './ProgressBar';
import './progressBar.css';

export default function ProgressBars() {
    let [seconds, setSeconds] = useState(0);
    let [progressBarList, setProgressBarList] = useState([]);
    let [animateCheckedProgressBars, setAnimateCheckedProgressBars] = useState([]);
    let [animateCounter, setAnimateCounter] = useState(0);

    const onSecondsChange = (e) => {
        setSeconds(e.target.value);
    }

    const addProgressBar = (e) => {
        if (progressBarList.length == 0 && seconds == 0) {
            setSeconds(3);
        }

        setProgressBarList([
            ...progressBarList,
            {
              id: progressBarList.length + 1,
              seconds: (progressBarList.length == 0 || (progressBarList.length >= 0 && seconds == 0)) ? 5 : seconds,
              isChecked: false
            }
          ]);
    }

    const selectProgressBar = (id) => {
        let checkedIds = [];
        const index = animateCheckedProgressBars.findIndex(x => x === id);
        // remove item if index already exists
        if (index > -1) {
            checkedIds = animateCheckedProgressBars.filter(x => x !== id);
        } 
        else {  // add item if it doesn't exist
            checkedIds = [...animateCheckedProgressBars, id]
        }
        setAnimateCheckedProgressBars(checkedIds);
    }

    // this enables progress bar animation only for the selected items
    const animateSelectedProgressBars = () => {
        setAnimateCounter((animateCounter) => {
           return animateCounter + 1
        })
        if (progressBarList.length > 0 && animateCheckedProgressBars.length > 0) {
            const data =   progressBarList.map(x => {
                const isChecked = (animateCheckedProgressBars.find(id => id === x.id)) ? true : false;
                return { ...x, isChecked }
            });
            setProgressBarList(data);
        } else {
            alert("Please select atleast one progress bar to animate");
        }
    }

    return (
        <div className="main">
            {
                (progressBarList.length > 0) &&
                   progressBarList.map(x=> {
                    return (
                        <React.Fragment key={x.id}> 
                            <ProgressBar {...x} selectProgressBar={selectProgressBar} animateCounter={animateCounter} />
                        </React.Fragment>
                      )
                    })
            }

            <div style={{marginTop: "1em"}}>
            {
                (progressBarList.length > 0) &&
                    <input type="text" className='input-field' maxLength="1" name="seconds" value={seconds} onChange={onSecondsChange} />
            }
            <button onClick={() => { addProgressBar() }} className='add-btn'>Add Progress Bar</button>
            {
                (progressBarList.length > 0) &&
                    <button onClick={() => { animateSelectedProgressBars() }} className='add-btn'>Animate Selected Progress Bars</button>
            }
            </div>
        </div>
    )
}
