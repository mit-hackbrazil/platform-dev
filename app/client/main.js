import React, { Component } from "react";
import { render } from "react-dom";
import { Meteor } from 'meteor/meteor';
import App from "../views/App.js";
//import './main.html';

console.log("user", Meteor.user());

Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
});