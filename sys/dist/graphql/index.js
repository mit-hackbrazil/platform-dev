"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _lodash = require("lodash");

var _teams = require("./teams");

var _files = require("./files");

var _posts = require("./posts");

var _tasks = require("./tasks");

var _notifications = require("./notifications");

var defaultTypeDef = "\nscalar JSON \n\ntype Query{\n    _empty:String\n}\n\ntype Mutation{\n    _empty:String\n}\n";
var typeDefs = [defaultTypeDef, _teams.typeDef, _files.typeDef, _posts.typeDef, _tasks.typeDef, _notifications.typeDef];
exports.typeDefs = typeDefs;
var resolvers = (0, _lodash.merge)(_teams.resolver, _files.resolver, _posts.resolver, _tasks.resolver, _notifications.resolver);
exports.resolvers = resolvers;