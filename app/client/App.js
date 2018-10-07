import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

/*custom components*/
import TasksList from "./components/TasksList";
import TeamHeader from "./components/TeamHeader";
import Calendar from "./components/Calendar";
import PostViewer from "./components/PostViewer";

import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base'

//settings
import { settings } from "../settings";
import "./app.css";

const defaultTasks = [
  {
    name: "tarefa 1",
    active: true,
    done: true,
    start: "1/10/2018",
    end: "2/10/2018"
  },
  {
    name: "tarefa 2",
    active: true,
    done: false,
    start: "10/10/2018",
    end: "12/10/2018"
  },
  {
    name: "tarefa 3",
    active: false,
    done: false,
    start: "10/10/2018",
    end: "12/10/2018"
  },
  {
    name: "tarefa 3",
    active: false,
    done: false,
    start: "10/10/2018",
    end: "12/10/2018"
  },
  {
    name: "tarefa 3",
    active: false,
    done: false,
    start: "10/10/2018",
    end: "12/10/2018"
  }
  /*..*/
];

let team = {
  name: "NASA",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png",
  description: "Exploring the Space and Hiring the best MIT undergrads",
  link: 'http://nasa.gov'
}

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

const posts = [
  {
    title: "prototipo 1",
    description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ",
    image: "https://www.nasa.gov/images/content/603294main_PISCES-014g.jpg",
    date: "2018-08-25",
    file: {
      name: "test_prototype.pdf",
      url: "http://hackbrazil.com/api/files/id=?"
    }
  },
  {
    title: "prototipo 2",
    description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ",
    image: "https://www.nasa.gov/images/content/603294main_PISCES-014g.jpg",
    date: "2018-08-25",
    file: {
      name: "test_prototype.pdf",
      url: "http://hackbrazil.com/api/files/id=?"
    }
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, logged: false };

  }

  onUserLogin = () => {
    this.setState({ logged: true });
    console.log("login..");
  }

  onUserLogout = () => {
    this.setState({ logged: false });
  }

  componentWillMount() {
    Tracker.autorun(() => {
      if (Accounts.loginServicesConfigured()) {
        let user = Meteor.user();

        console.log('USER', user._id);

        if (Meteor.user())
          this.setState({ logged: true });
        if (Meteor.user() === null)
          this.setState({ logged: false });
      }
    });
  }

  render() {
    console.log("userid", Meteor.userId());

    if (!this.state.logged)
      return <div>
        <AccountsUIWrapper />
        <div> Home.. log in! ... </div>
      </div>
    else
      return (
        <div>
          <AccountsUIWrapper />
          <TeamHeader team={team} />
          <TasksList tasks={defaultTasks} />
          <h2>CALENDAR</h2>
          <Calendar events={events} />

          <h2>POSTS</h2>
          <PostViewer posts={posts} />
          <h2>EQUIPE</h2>

          <h2>CONTATO</h2>
        </div>
      );
  }
}

export default App;
