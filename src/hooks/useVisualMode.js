import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    //Add the new mode to history
    const transition = (newMode, replace = false) => {
        //if replace is true, replace the current mode in history with a new one
        if (replace) {
            setMode(newMode);
        } else {
            setMode(newMode);
            setHistory([...history, newMode])
        }
    }

    //Set the mode to previous item in history array
    const back = () => {
        if (history.length > 1) {
            history.pop();
            setMode(history[history.length - 1]);
        }
    }


    return { mode, transition, back };
}

