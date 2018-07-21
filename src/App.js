import React, { Component } from 'react';
import './App.css';
import './SliderInput.css';
import './SideBar.css';
import Clock from './Clock';
import RoundBorder from './RoundBorder';
import ButtonsWrapper from './ButtonsWrapper';
import SideBar from './SideBar';

import alarmSound from './sound/alarm-work.mp3';
import alarmBreak from './sound/alarm-break.mp3';


class App extends Component {
  constructor(props) {
    super(props);
    this.timerID = 0;
    this.defaultWork = 1500;
    this.defaultBreak = 300;
    this.state = {
      seconds: this.defaultWork,
      timeObj: {},
      isCounting: false,
      working: true,
      showSidebar: false };

    this.audioWork = new Audio(alarmSound);
    this.audioBreak = new Audio(alarmBreak);
  }

  componentDidMount() {
    let timeObj = this.secondsToTime(this.state.seconds);
    this.setState({ timeObj: timeObj });
  }

  componentWillUnmount() {
    this.stop();
  }

  secondsToTime(secs){
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let timeObj = {
      minutes: minutes,
      seconds: seconds
    };
    return timeObj;
  }

  setUserChoice = (inputType, value) => {
    let valueInSeconds = value * 60;
    // set the default value
    if(inputType === 'Work') {
      this.defaultWork = valueInSeconds;
    }
    else {
      this.defaultBreak = valueInSeconds;
    }

    // update the UI
    if((this.state.working && inputType === 'Work') || (!this.state.working && inputType === 'Break')) {
      this.setState({
        timeObj: this.secondsToTime(valueInSeconds),
        seconds: valueInSeconds
      });
    }
  }

  start = () => {
    if (this.timerID === 0) {
      this.timerID = setInterval(
        () => this.countDown(),
        1000
      );
      this.setState({
        isCounting: true,
        showSidebar: false
      });
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      timeObj: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.stop();
      if (this.state.working) {
      // alarm sound
        this.audioWork.play();
        let timeObj = this.secondsToTime(this.defaultBreak);
        this.setState({
          working: false,
          seconds: this.defaultBreak,
          timeObj: timeObj });
      }
      else {
        this.audioBreak.play();
        let timeObj = this.secondsToTime(this.defaultWork);
        this.setState({
          working: true,
          seconds: this.defaultWork,
          timeObj: timeObj });
      }
    }
  }

  stop = () => {
    clearInterval(this.timerID);
    this.timerID = 0;
    let seconds = this.state.working ? this.defaultWork : this.defaultBreak;
    this.setState({
      timeObj: this.secondsToTime(seconds),
      seconds: seconds,
      isCounting: false
    });
  }

  pause = () => {
    clearInterval(this.timerID);
    this.timerID = 0;
    this.setState({
      isCounting: false
    });
  }

  restart = () => {
    this.pause();
    this.toggleSideBar();
  }

  toggleSideBar = () => {
    let status = this.state.showSidebar ? false : true;
    this.setState({ showSidebar: status });
  }

  render() {
    let bgColor = {
      backgroundColor: this.state.working ? 'crimson' : '#3ebb22'
    };

    return (
      <div className="App" style={bgColor}>
        <h1>Pomodoro Clock</h1>
        <RoundBorder size='340px'>
          <RoundBorder size='300px' border='3px solid #fff'>
            <RoundBorder size='260px'>
              <Clock {...this.state.timeObj} headline={this.state.working ? 'Work' : 'Break'}/>
            </RoundBorder>
          </RoundBorder>
        </RoundBorder>
        <ButtonsWrapper restart={this.restart} isCounting={this.state.isCounting} pause={this.pause} start={this.start} stop={this.stop}/>
        {this.state.showSidebar ? <SideBar updateDefaultValues={this.setUserChoice} toggleSideBar={this.toggleSideBar}/> : null}
      </div>
    );
  }
}

export default App;
