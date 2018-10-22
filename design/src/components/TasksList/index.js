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
            ready: false,
            editorOpen: false,
            viewerOpen: false,
            sent: false,
            content: null,
            files: [],
            timestamp: null,
            contentEdit: null,
        }
        let { task } = this.props;

        this.loadTask();
    }

    loadTask = async () => {
        let { task } = this.props;
        let { id, editKey, viewKey } = api.getCredentials();
        let { taskContent } = await api.tasks.getTaskContent(id, task.id, viewKey, editKey);

        if (taskContent.length) {
            //task was sent / completed
            console.log("task content", taskContent);
            let { content, files, timestamp } = taskContent[0];

            this.setState({ ready: true, sent: true, content, files, timestamp })
        }
        else {
            this.setState({ ready: true, sent: false })
        }
    }

    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen });
    }

    onEditContent = event => {
        this.setState({
            contentEdit: event.target.value,
        });
    };

    onInputChange = async (event) => {
        let file = event.target.files[0];
        this.setState({ taskFile: file, fileName: file.name });
    }

    onSaveChanges = async () => {
        let { contentEdit, taskFile } = this.state;

    }

    render() {
        let { task } = this.props;

        let start_date = moment(task.start_date);
        let end_date = moment(task.end_date);

        let side = this.props.index % 2 == 0 ? " right" : " left";

        //loading
        if (!this.state.ready) {
            return <div className={"container" + side}>
                <div className="content">
                    <p>Carregando Conteúdo da Tarefa...</p>
                    <LinearProgress />
                </div>
            </div>
        }

        //task is empty - e.g. not sent yet
        if (!this.state.sent) {
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
                        {this.props.canEdit ? <Button variant="contained" color="primary" onClick={this.toggleEditor}>Enviar</Button> : null}
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
                        <div className="modal-inner">
                            <Typography variant="h6" id="modal-title">
                            <i class="fas fa-tasks"></i> Enviar Tarefa
                        </Typography>

                            <TextField
                                id="outlined-multiline-flexible"
                                label="Texto da Tarefa"
                                multiline
                                value={this.state.contentEdit}
                                onChange={this.onEditContent}
                                fullWidth
                                rows="6"
                                helperText="Escreva comentários que auxiliem o entendimento da atividade"
                            />
                            <p>Anexar Arquivo (.pdf - máximo 20Mb) </p>
                            <div className="upload-file">
                                <button className="btn"> <i className="fa fa-file-upload fa-lg"></i>  {this.state.fileName ? this.state.fileName : "Selecionar Arquivo.."}</button>
                                <input type="file" name="task-file" onChange={this.onInputChange} />
                            </div>

                            <Button onClick={this.toggleEditor}>Cancelar</Button>
                            <Button color="primary" onClick={this.onSaveChanges}>Enviar</Button>
                        </div>
                    </div>
                </Modal>
            </div>);
        }
        //task was sent
        else {
            let { content } = this.state;

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