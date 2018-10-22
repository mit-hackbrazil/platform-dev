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
import api from "../../apiConnect";
import { } from "./tasks-lists.css";

import { Button, TextField, Modal, LinearProgress, Typography } from "@material-ui/core";
import moment from "moment";
moment.locale('pt-BR');

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOpen: false,
            viewerOpen: false
        }
    }
    
    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen });
    }

    render() {
        let { task } = this.props;

        let start_date = moment(task.start_date);
        let end_date = moment(task.end_date);

        let side = this.props.index % 2 == 0 ? " right" : " left";

        return (<div className={"container" + side}>
            <div className="content">
                <div className="task-dates">
                    <div>
                        início: <i>{start_date.format("DD/MM/YYYY")}</i>
                    </div>
                    <div>
                        encerra:<strong>{end_date.format("DD/MM/YYYY")}</strong>
                    </div>
                </div>

                <h2>{task.title}</h2>
                <p>{task.content}</p>

                <div className="buttons">
                    <Button onClick={this.toggleEditor}>Abrir</Button>
                    {this.props.canEdit ? <Button onClick={this.toggleEditor}>Editar</Button> : null}
                </div>

            </div>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.editorOpen}
                onClose={this.handleClose}
                className="modal-editor-container"
            >

                <div className="modal-editor" >
                    <Typography variant="h6" id="modal-title">
                        Editar Tarefa
                    </Typography>

                    <TextField
                        id="standard-name"
                        label="Content"
                        value={this.state.facebookEdit}
                        onChange={this.onEditFacebook}
                        margin="normal"
                        placeholder="Grupo do Facebook..."
                        className="editor-text"
                    />
                    <Button onClick={this.toggleEditor}>Cancelar</Button>
                    <Button onClick={this.onSaveChanges}>Salvar</Button>
                </div>
            </Modal>
        </div>);
    }
}



class TasksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            tasks: []
        }

        //loading tasks from database
        this.loadTasks();
    }

    loadTasks = async () => {
        let tasks = await api.tasks.getAll();
        console.log("Tasks", tasks);
        let sentTasks = await api.tasks.getCurrent();

        this.setState({ tasks: tasks.tasks, ready: true });
    }

    render() {
        //convert all tasks
        let { tasks } = this.state;
        /*
                let tasksList = tasks.map((task, index) => {
                    return <Task key={"task-" + index} task={task} index={index} />;
                })
        */

        if (!this.state.ready) {
            return <LinearProgress />
        }

        let tasksList = tasks.map((task, index) => {
            return <Task key={"task-" + index} task={task} index={index} canEdit={this.props.canEdit} />;
        });
        /*
                return <div className="timeline">
                    <div className="container left">
                        <div className="content">
                            <h2>2017</h2>
                            <p>Lorem ipsum.. jaskdja kdjasdk ajdaksj dakaskdaldkalds kald kals dkalsdkald klaskd la dklaksd lakdslkassdaklasdkrsj </p>
                        </div>
                    </div>
                    <div className="container right">
                        <div className="content">
                            <h2>2016</h2>
                            <p>Lorem ipsum..</p>
                        </div>
                    </div>
                </div>*/

        return <div className="timeline">
            {tasksList}
        </div>
    }
}

export default TasksList;