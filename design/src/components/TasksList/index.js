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
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from "moment";

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " Bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
    else return (bytes / 1073741824).toFixed(3) + " GB";
};

class Task extends Component {
    constructor(props) {
        super(props);
        let { task } = this.props;
        this.state = {
            ready: false,
            editorOpen: false,
            viewerOpen: false,
            sent: false,
            content: null,
            files: [],
            timestamp: null,
            contentEdit: null,
            filesEdit: null,
            filesDiv: null,
            showLoading: false
        }

        this.loadTask();
    }

    loadTask = async () => {
        let { task } = this.props;
        let { id, editKey, viewKey } = api.getCredentials();
        let { taskContent } = await api.tasks.getTaskContent(id, task.id, viewKey, editKey);

        //check if data was loaded
        if (taskContent && taskContent.length) {
            //task was sent / completed
            console.log("task content", taskContent);
            let { content, files, timestamp } = taskContent[0];
            let filesDiv = [];

            if (files && files.list && files.list.length)
                filesDiv = files.list.map((file) => {
                    return <div>{file.name} |  {file.type} |{formatBytes(file.size)} | <a href={file.url}>Download</a> </div>
                });

            console.log("files Div", filesDiv);

            this.setState({ ready: true, sent: true, content, files, filesDiv, timestamp, contentEdit: content, filesEdit: files })
        }
        else {
            this.setState({ ready: true, sent: false })
        }
    }

    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen, showLoading: false });
    }

    toggleViewer = () => {
        this.setState({ viewerOpen: !this.state.viewerOpen });
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

    onNewLogo = async (team_id, editKey, task_id, url, name, type, size) => {
        let _task = {
            content: this.state.contentEdit,
            files: {
                list: [{
                    name,
                    type,
                    size,
                    url
                }]
            }
        }

        let res = await api.tasks.sendTask(team_id, task_id, editKey, _task);
        this.toggleEditor();

        this.props.onChange();
    }

    onSaveChanges = async () => {
        let { task } = this.props;
        let { contentEdit, taskFile } = this.state;
        let { id, editKey } = api.getCredentials();

        let team_id = id;
        let task_id = task.id;

        //check if needs to upload file
        if (this.state.taskFile) {
            this.setState({ showLoading: true })
            api.tasks.uploadFile(this.state.taskFile, null, (url, name, type, size) => {
                this.onNewLogo(team_id, editKey, task_id, url, name, type, size);
            });
        }

        else {
            let _task = {
                content: this.state.contentEdit,
                files: null
            };

            let res = await api.tasks.sendTask(id, task.id, editKey, _task);
            this.toggleEditor();

            this.props.onChange();
        }
    }

    render() {
        let { task } = this.props;

        console.log("task", task);
        let start_date = moment(parseInt(task.start_date));
        let end_date = moment(parseInt(task.end_date));

        let side = this.props.index % 2 == 0 ? " right" : " left";

        let modalEditor = (<Modal
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
        </Modal>);


        //Viewer
        let modalViewer = (<Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.viewerOpen}
            onClose={this.handleClose}
            className="modal-editor-container"
        >
            <div className="modal-editor" >
                <div className="modal-inner">
                    <Typography variant="h6" id="modal-title">
                        {task.title}
                    </Typography>
                    <div className="task-modal-dates">
                        <i>{start_date.format("DD/MM/YYYY")}</i> - <strong>{end_date.format("DD/MM/YYYY")}</strong>
                        <p>Enviado em:{moment(parseInt(this.state.timestamp)).format("DD/MM/YYYY hh:mm:ss")}</p>
                    </div>
                    <div className="task-modal-content">{this.state.content}</div>
                    <div className="task-modal-content">{this.state.filesDiv}</div>

                    <Button onClick={this.toggleViewer}>Fechar</Button>
                </div>
            </div>
        </Modal>);


        //loading
        if (!this.state.ready) {
            return <div className={"container" + side}>
                <div className="content">
                    <p>Carregando Conteúdo da Tarefa...</p>
                    <LinearProgress />
                </div>
            </div>
        }

        return (<div className={"container" + side}>
            <div className="content">
                <div className="task-dates">
                    <div>{start_date.format("DD/MM/YYYY")}</div>
                    <div> até </div>
                    <div>{end_date.format("DD/MM/YYYY")}</div>
                </div>

                <h2>{task.title}</h2>
                <p>{task.content}</p>

                <div className="buttons">
                    {this.props.canEdit && !this.state.sent ? <Button variant="contained" onClick={this.toggleEditor}>Enviar</Button> : null}
                    {this.state.sent ? < Button onClick={this.toggleViewer}>Abrir</Button> : null}
                    {this.props.canEdit && this.state.sent ? <Button onClick={this.toggleEditor}>Editar</Button> : null}

                </div>

                {this.props.canEdit ? modalEditor : null}
                {modalViewer}
            </div>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.showLoading}
                onClose={this.handleClose}
                className="modal-editor-container"
            >
                <div className="card loading-card">
                    <CircularProgress
                        size={100}
                    />
                    <br />
                    <p><i className="fa fa-file-upload fa-lg"></i> Enviando Arquivos...</p>
                </div>

            </Modal>

        </div >);
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

    onChange = () => {
        this.state = {
            ready: false,
            tasks: []
        }
        this.loadTasks();
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
            return <Task key={"task-" + index} task={task} index={index} canEdit={this.props.canEdit} onChange={this.onChange} />;
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