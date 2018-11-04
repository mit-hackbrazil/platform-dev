import React, { Component } from 'react';

/*custom components*/
import NavBar from "./components/NavBar";
import TasksList from "./components/TasksList";
import TeamHeader from "./components/TeamHeader";
import Calendar from "./components/Calendar";
import PostViewer from "./components/PostViewer";
import TeamViewer from "./components/TeamViewer";
import Contacts from "./components/Contacts";

import { Classes } from "@blueprintjs/core";
import { Grid, Paper } from "@material-ui/core";

//notifications
import { Snackbar, Button } from '@material-ui/core';
import api from "./apiConnect";

const events = [
  {
    start: '2018-08-20',
    end: '2018-09-02',
    eventClasses: 'optionalEvent',
    title: 'test event',
    description: 'This is a test description of an event',
  },
  {
    start: '2018-08-19',
    end: '2018-08-25',
    title: 'test event',
    description: 'This is a test description of an event',
    data: 'you can add what ever random data you may want to use later',
  },
];



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationOpen: true,
      notificationDiv: null,
      canEdit: false
    }
    this.loadCanEdit();
    this.loadNotifications();
  }

  loadCanEdit = async () => {
    let canEdit = await api.teams.CanEdit();
    console.log("CAN EDIT", canEdit);
    this.setState({ canEdit });
  }

  unescapeHTML(html) {
    var escapeEl = document.createElement('div');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }

  loadNotifications = async () => {
    let { notifications } = await api.notifications.getAll();

    if (notifications != null) {
      let notification = notifications[0];
      let div = (<div className="notification">
        <span><i className={notification.icon}></i>{" :: " + this.unescapeHTML(notification.content)}</span>
        <div className="notification-close-button" onClick={this.notificationClose}><i class="fas fa-times"></i></div>
      </div>);

      this.setState({
        notificationDiv: div
      });
    }

  }

  notificationClose = () => {
    this.setState({ notificationOpen: false });
  };

  render() {
    let { canEdit } = this.state;
    return (
      <div className={Classes.DARK}>
        <NavBar />
        <div className="grid-container">
          <Grid container spacing={24} className="main-content">
            <Grid item xs={12} sm={11} >
              <TeamHeader canEdit={canEdit} />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Contacts canEdit={canEdit} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TeamViewer canEdit={canEdit} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="card" ><Calendar events={events} /></div>
            </Grid>
            <div className="divider">
              <div></div>
            </div>
            <Grid item xs={12} sm={6}>
              <h2>Tarefas da Fase maker</h2>
              <p className="sub-text">Envie, abra e edite tarefas enviadas. Anexe arquivos .pdf com suas respostas e adicione texto se for necessário</p>
              <TasksList canEdit={canEdit} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <h2>Posts / Protótipo</h2>
              <PostViewer />
            </Grid>

          </Grid>
        </div>


        {this.state.notificationOpen ? this.state.notificationDiv : null}
      </div>
    );
  }
}

export default App;
