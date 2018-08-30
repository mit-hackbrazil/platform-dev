/*
example of props
[
 {
    name: "tarefa 1",
    active: true,
    done: true,
    start: "1/10/2018",
    end: "2/10/2018"
  }, ...
]

*/
import React, { Component } from "react";
import { } from "./tasks-lists.css";
import { TaskOpen, TaskDefault, TaskReady } from "./icons";
import moment from "moment";
moment.locale('pt-BR');

class Task extends Component {

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentWillMount = () => {
        this.updateDimensions();
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        let { name, active, done, start, end } = this.props.task;
        let icon = <TaskDefault />;

        if (active && done)
            icon = <TaskReady />
        else if (active && !done)
            icon = <TaskOpen />
        //converting the dates to readable with moment


        let startDate = moment(start).format('MMM D');
        let endDate = moment(end).format('MMM D');

        let dates = <div className="task-dates">{startDate} - {endDate}</div>;
        let nameLabel = <div>{name}</div>;

        if (this.state.width < 700) {
            nameLabel = <div>{this.props.index}</div>;
            endDate = moment(end).format('D MMM');
            dates = <div className="task-dates">{endDate}</div>;
        }

        return (<div className="task-item" >
            {nameLabel}
            <div className="task-circle-container">
                {icon}
            </div>
            {dates}
        </div >);
    }
}

class TasksList extends Component {


    render() {
        //convert all tasks
        let { tasks } = this.props;
        let tasksList = tasks.map((task, index) => {
            return <Task key={"task-" + index} task={task} index={index} />;
        })

        return <div className="task-list-container">
            <div className="task-line-container" >
                <div className="task-line" />
            </div>
            <div className="task-list">
                {tasksList}
            </div>
        </div>
    }
}

export default TasksList;