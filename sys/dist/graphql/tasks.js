"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolver = exports.typeDef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("../Database.js");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _teams = require("./teams");

var typeDef = "\n  type Task{\n    id: Int, \n    title: String, \n    open: Boolean,\n    content: String, \n    start_date: String,\n    end_date: String,\n    url: String\n  }\n\n  type TaskContent{\n    id: Int,\n    content: String, \n    files: JSON, \n    team: Int, \n    task: Int\n    timestamp: String\n  }\n\n  extend type Query {\n    tasks(args:JSON): [Task],\n    taskContent(args:JSON): [TaskContent],\n  }\n\n  extend type Mutation{\n      sendTask(args:JSON):Boolean,\n      editTask(args:JSON):TaskContent\n  }\n  \n";
exports.typeDef = typeDef;

function ValidateAction(_x) {
  return _ValidateAction.apply(this, arguments);
}

function _ValidateAction() {
  _ValidateAction = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(args) {
    var team_id, editKey, viewKey, valid;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            team_id = args.team;
            editKey = args.editKey, viewKey = args.viewKey;
            valid = false;

            if (!editKey) {
              _context5.next = 9;
              break;
            }

            _context5.next = 6;
            return (0, _teams.ValidateEditKey)(team_id, editKey);

          case 6:
            valid = _context5.sent;
            _context5.next = 16;
            break;

          case 9:
            if (!viewKey) {
              _context5.next = 15;
              break;
            }

            _context5.next = 12;
            return (0, _teams.ValidateViewKey)(team_id, viewKey);

          case 12:
            valid = _context5.sent;
            _context5.next = 16;
            break;

          case 15:
            return _context5.abrupt("return", false);

          case 16:
            return _context5.abrupt("return", valid);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _ValidateAction.apply(this, arguments);
}

var resolver = {
  Query: {
    tasks: function () {
      var _tasks = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, _ref) {
        var args, tasks;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                args = _ref.args;
                _context.next = 3;
                return _Database.db.many("SELECT * FROM tasks ORDER BY start_date DESC");

              case 3:
                tasks = _context.sent;
                return _context.abrupt("return", tasks);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function tasks(_x2, _x3) {
        return _tasks.apply(this, arguments);
      };
    }(),
    taskContent: function () {
      var _taskContent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_, _ref2) {
        var args, task, team, valid, taskContent;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                args = _ref2.args;
                task = args.task, team = args.team; //only requests with a valid View Or Edit keys 

                _context2.next = 4;
                return ValidateAction(args);

              case 4:
                valid = _context2.sent;

                if (valid) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", null);

              case 7:
                _context2.next = 9;
                return _Database.db.any("SELECT * FROM teams_tasks WHERE team=".concat(team, " AND task=").concat(task));

              case 9:
                taskContent = _context2.sent;
                return _context2.abrupt("return", taskContent);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function taskContent(_x4, _x5) {
        return _taskContent.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    sendTask: function () {
      var _sendTask = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_, _ref3, req) {
        var args, content, team, task, files, editKey, valid, query;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = _ref3.args;
                content = args.content, team = args.team, task = args.task, files = args.files, editKey = args.editKey;
                _context3.next = 4;
                return ValidateAction(args);

              case 4:
                valid = _context3.sent;

                if (valid) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", false);

              case 7:
                _context3.next = 9;
                return _Database.db.none("INSERT INTO \n            teams_tasks(content, team, task, files) \n            VALUES($1,$2,$3,$4)\n            ", [content, team, task, files]);

              case 9:
                query = _context3.sent;
                return _context3.abrupt("return", true);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function sendTask(_x6, _x7, _x8) {
        return _sendTask.apply(this, arguments);
      };
    }(),
    editTask: function () {
      var _editTask = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(_, _ref4, req) {
        var args, valid, original, _Object$assign, content, files, tasks;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                args = _ref4.args;
                _context4.next = 3;
                return ValidateAction(args);

              case 3:
                valid = _context4.sent;

                if (valid) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", false);

              case 6:
                _context4.next = 8;
                return _Database.db.one("SELECT * FROM teams_tasks WHERE id=".concat(args.id));

              case 8:
                original = _context4.sent;
                _Object$assign = Object.assign(original, args), content = _Object$assign.content, files = _Object$assign.files;
                _context4.next = 12;
                return _Database.db.one("UPDATE teams_tasks SET\n            (content, files, timestamp) = ($1,$2,now()) WHERE id=".concat(args.id, " RETURNING *"), [content, files]);

              case 12:
                tasks = _context4.sent;
                return _context4.abrupt("return", tasks);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function editTask(_x9, _x10, _x11) {
        return _editTask.apply(this, arguments);
      };
    }()
  }
};
exports.resolver = resolver;