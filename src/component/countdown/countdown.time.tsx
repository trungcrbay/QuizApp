import { useEffect, useState } from "react";
import ModalQuizResult from "../quiz/modal.result";


const CountDown = (props: any) => {
    const [timer, setTimer] = useState(90)
    const {open, setOpen, countTotal, countCorrect,handleSubmit} = props
    const format = (time: number) => {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + String(mins).padStart(2, '0') + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    useEffect(() => {
        if (timer === 0){
            setOpen(true)
            handleSubmit()
            return
        }
        const timerCountDown = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)
        return () => {
            clearInterval(timerCountDown)
        }
    }, [timer])

    return (
        <>
            {format(timer)}
        </>
    )
}

export default CountDown;