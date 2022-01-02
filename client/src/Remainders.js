import React, { Component } from "react";

export default class Remainders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: "",
      alarmTime: "",
      remainTimeH: "",
      remainTimeM: "",
      show: false,
      Description: "",
      message: false,
      remainders: [],
      listStr: "",
    };
    this.setAlarmTime = this.setAlarmTime.bind(this);
  }

  componentDidMount() {
    this.clock = setInterval(() => this.setCurrentTime(), 1000);
    this.interval = setInterval(() => this.checkAlarmClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  setCurrentTime() {
    let today = new Date();
    if (today.getMinutes() < 10) {
      this.setState({
        currentTime: today.getHours() + ":0" + today.getMinutes(),
      });
    } else {
      this.setState({
        currentTime: today.getHours() + ":" + today.getMinutes(),
      });
    }
  }
  setDescription = (event) => {
    this.setState({ Description: event.target.value });
  };

  setAlarmTime(event) {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value;
    this.setState({
      alarmTime: inputAlarmTimeModified,
    });
  }
  setRemainTime = () => {
    let hourAlarm = parseInt(this.state.alarmTime[0] + this.state.alarmTime[1]);
    let hourCurrent = parseInt(
      this.state.currentTime[0] + this.state.currentTime[1]
    );
    let calcMinAlarm = parseInt(
      this.state.alarmTime[3] + this.state.alarmTime[4]
    );
    let currentMinutes = parseInt(
      this.state.currentTime[3] + this.state.currentTime[4]
    );

    if (hourCurrent > hourAlarm) {
      let remain = 24 - (hourCurrent - hourAlarm);
      this.setState({ remainTimeH: remain });
    } else {
      let remain = 0 + (hourAlarm - hourCurrent);
      this.setState({ remainTimeH: remain });
    }
    let minutesRemain = 0;
    if (currentMinutes > calcMinAlarm) {
      minutesRemain = 60 - (currentMinutes - calcMinAlarm);
      this.setState({ remainTimeH: this.state.remainTimeH });
    } else {
      minutesRemain = calcMinAlarm - currentMinutes;
      this.setState({ remainTimeH: this.state.remainTimeH });
    }
    this.setState({ remainTimeM: minutesRemain });
  };
  addToArray = () => {
    let newList = [
      ...this.state.remainders,
      {
        id: this.state.remainders.length + 1,
        description: this.state.Description,
        time: this.state.alarmTime,
      },
    ];

    this.setState({
      show: true,
      remainders: newList,
    });

    
    
    
  };

  checkAlarmClock() {
    if (this.state.alarmTime === "undefined" || !this.state.alarmTime) {
      this.alarmMessage = "Please set your alarm";
    } else {
      this.alarmMessage = "Your alarm is set for " + this.state.alarmTime;
      this.setState({
        remainTime: this.state.alarmTime - this.state.currentTime,
      });

      if (this.state.currentTime === this.state.alarmTime) {
        if (this.state.message === false) {
          alert(this.state.Description);
          this.setState({ message: true });
        }
      }
      this.setRemainTime();
    }
  }

  render() {
    return (
      <div className="card" style={{ color: "white" }}>
         <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEd-j1TtYCTeTbf5ygTFEjIgNxh5NLloSYg&usqp=CAU"
          }
          alt="logo"
        />
        <h1>WLCOME {this.props.username} YOU ARIVED TO ROOM NO : {this.props.room }</h1>
        <h1>React Alarm Clock</h1>
        <h2>It is now: {this.state.currentTime}</h2>
        <h2>{this.alarmMessage}</h2>
        <form>
          <input type="time" onChange={this.setAlarmTime}></input>
        </form>
        <button id="button" onClick={() => this.addToArray()}>
          ADD TIMER +
        </button>
        <input
          placeholder="Description"
          type="text"
          onChange={this.setDescription}
        />
        {this.state.show ? (
          <div className="card">
            <h2>
              YOU SET ALARM TO: {this.state.alarmTime}
              <br /> FOR : {this.state.Description}{" "}
            </h2>
            <h3>
              Your remain Time is : {this.state.remainTimeH}:
              {this.state.remainTimeM}
            </h3>
            <div></div>
          </div>
        ) : null}
        <div>
          LIST:
          {this.state.remainders.map((x) => (
            <div className="carde">
              <h2>REMAINDER NO : {x.id}</h2>
              <div>
                DESCRIPTION : {x.description}
                <br />
                TIME : {x.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
