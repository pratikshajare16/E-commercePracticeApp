
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

let adjustInterval;
const StopWatch = () => {
    const [watch, setWatch] = useState(0);
    const [watchStart, setWatchStart] = useState(false)

    const start = () => {

        adjustInterval = setInterval(() => {
            setWatch((x) => x + 1);
        }, 1000)
        setWatchStart(true);
    }

    const stop = () => {

        clearInterval(adjustInterval);
        setWatchStart(false);
    }

    const reset = () => {
        clearInterval(adjustInterval);
        setWatch(0);
        setWatchStart(false);
    }

    return (
        <div className='App'>
            <h1>Stop Watch </h1>
            <div style={{ marginTop: "5%" }}>
                <h1>{watch}</h1><br />
                <Button className='start' disabled={watchStart} onClick={start}>Start</Button>
                <Button className='stop' onClick={stop}>Stop</Button>
                <Button className='reset' onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}

export default StopWatch