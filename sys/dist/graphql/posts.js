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

var typeDef = "\n\n  type PostFile{\n        name: String, \n        url: String,\n        size: Int\n  }\n\n  type Post{\n    id: Int,\n    title: String,\n    content: String,\n    team: Int,\n    timestamp: String,\n    thumbnail:String,\n    files:JSON,\n    update:String\n  }\n\n  extend type Query {\n    posts(args:JSON): [Post],\n  }\n\n  extend type Mutation{\n      addPost(args:JSON):Boolean,\n      editPost(args:JSON):Post\n  }\n  \n";
exports.typeDef = typeDef;

function ValidateAction(_x) {
  return _ValidateAction.apply(this, arguments);
}

function _ValidateAction() {
  _ValidateAction = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(args) {
    var team_id, editKey, viewKey, valid;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            team_id = args.team;
            editKey = args.editKey, viewKey = args.viewKey;
            valid = false;

            if (!editKey) {
              _context4.next = 9;
              break;
            }

            _context4.next = 6;
            return (0, _teams.ValidateEditKey)(team_id, editKey);

          case 6:
            valid = _context4.sent;
            _context4.next = 16;
            break;

          case 9:
            if (!viewKey) {
              _context4.next = 15;
              break;
            }

            _context4.next = 12;
            return (0, _teams.ValidateViewKey)(team_id, viewKey);

          case 12:
            valid = _context4.sent;
            _context4.next = 16;
            break;

          case 15:
            return _context4.abrupt("return", false);

          case 16:
            return _context4.abrupt("return", valid);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _ValidateAction.apply(this, arguments);
}

var resolver = {
  Query: {
    posts: function () {
      var _posts = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, _ref) {
        var args, team_id, editKey, viewKey, valid, posts;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                args = _ref.args;
                team_id = args.team;
                editKey = args.editKey, viewKey = args.viewKey;
                _context.next = 5;
                return ValidateAction(args);

              case 5:
                valid = _context.sent;

                if (valid) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", null);

              case 8:
                _context.next = 10;
                return _Database.db.many("SELECT * FROM posts WHERE team=".concat(team_id, " ORDER BY update DESC"));

              case 10:
                posts = _context.sent;
                return _context.abrupt("return", posts);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function posts(_x2, _x3) {
        return _posts.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    addPost: function () {
      var _addPost = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_, _ref2, req) {
        var args, title, content, team, files, thumbnail, editKey, valid, query;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                args = _ref2.args;
                title = args.title, content = args.content, team = args.team, files = args.files, thumbnail = args.thumbnail, editKey = args.editKey;
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
                return _Database.db.none("INSERT INTO \n            posts(title, content, team, files, thumbnail) \n            VALUES($1,$2,$3,$4,$5)\n            ", [title, content, team, files, thumbnail]);

              case 9:
                query = _context2.sent;
                return _context2.abrupt("return", true);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function addPost(_x4, _x5, _x6) {
        return _addPost.apply(this, arguments);
      };
    }(),
    editPost: function () {
      var _editPost = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_, _ref3, req) {
        var args, original, _Object$assign, title, content, team, files, thumbnail, editKey, visible, valid, post;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = _ref3.args;
                _context3.next = 3;
                return _Database.db.one("SELECT * FROM posts WHERE id=".concat(args.id));

              case 3:
                original = _context3.sent;
                _Object$assign = Object.assign(original, args), title = _Object$assign.title, content = _Object$assign.content, team = _Object$assign.team, files = _Object$assign.files, thumbnail = _Object$assign.thumbnail, editKey = _Object$assign.editKey, visible = _Object$assign.visible;
                _context3.next = 7;
                return ValidateAction(args);

              case 7:
                valid = _context3.sent;

                if (valid) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", null);

              case 10:
                _context3.next = 12;
                return _Database.db.one("UPDATE posts SET\n            (title, content, team, files, thumbnail, visible) = ($1,$2,$3,$4,$5,$6) WHERE id=".concat(args.id, " RETURNING *"), [title, content, team, files, thumbnail, visible]);

              case 12:
                post = _context3.sent;
                return _context3.abrupt("return", post);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function editPost(_x7, _x8, _x9) {
        return _editPost.apply(this, arguments);
      };
    }()
  }
};
exports.resolver = resolver;