"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _db_secret = _interopRequireDefault(require("./db_secret.json"));

var pgp = require('pg-promise')();

var connection = {
  host: _db_secret.default.host,
  port: _db_secret.default.port,
  database: _db_secret.default.database,
  user: _db_secret.default.user,
  password: _db_secret.default.password
};
var db = pgp(connection);
exports.db = db;