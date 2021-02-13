import { render } from "react-dom"
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

class StopwatchApp extends Component {
    state = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        isStarted: false
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">Секундомер</h1>
                </div>

                <h1>{this.zeroPad(this.state.hours, 2)}:{this.zeroPad(this.state.minutes, 2)}:{this.zeroPad(this.state.seconds, 2)}</h1>

                <StartStopButton onStartBtn={this.startTheClock.bind(this)} isStarted={this.state.isStarted} />
                <ResetButton onResetBtn={this.resetTheClock.bind(this)} />
            </div>
        )
    }

    startTheClock = () => {
        this.setState({
            isStarted: !this.state.isStarted
        });
    }

    resetTheClock = () => {
        this.setState({
            seconds: 0,
            minutes: 0,
            hours: 0,
            isStarted: false
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (!this.state.isStarted) {
            return;
        }

        let seconds = this.state.seconds + 1;
        let minutes = this.state.minutes;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }


        this.setState({
            seconds: seconds,
            minutes: minutes

        });
    }

    zeroPad(num, places) {
        num = num.toString();
        while (num.length < places) {
            num = "0" + num;
        }
        return num;
    } 

}

class StartStopButton extends Component {

    render() {
        const { onStartBtn, isStarted } = this.props;
        return (
            <div >
                <button onClick={onStartBtn}>
                    {!isStarted ? 'start' : 'stop'}
                </button>
            </div>
        )
    }
}



class ResetButton extends Component {
    render() {
        const { onResetBtn } = this.props;
        return (
            <div>
                <button onClick={onResetBtn}>reset</button>
            </div>
        )
    }
}

render(<StopwatchApp />, document.getElementById("root"));