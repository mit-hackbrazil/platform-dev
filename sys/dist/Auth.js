"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTeamById = GetTeamById;
exports.GetTeamFromSubscriptionKey = GetTeamFromSubscriptionKey;
exports.RegisterUser = RegisterUser;
exports.ValidateEditKey = ValidateEditKey;
exports.ValidateViewKey = ValidateViewKey;
exports.ValidateRequest = ValidateRequest;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("./Database.js");

function GetTeamById(_x) {
  return _GetTeamById.apply(this, arguments);
}

function _GetTeamById() {
  _GetTeamById = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(id) {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Database.db.one("SELECT * FROM teams WHERE id=".concat(id));

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));
  return _GetTeamById.apply(this, arguments);
}

function GetTeamFromSubscriptionKey(_x2) {
  return _GetTeamFromSubscriptionKey.apply(this, arguments);
}

function _GetTeamFromSubscriptionKey() {
  _GetTeamFromSubscriptionKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(subscrition_key) {
    var result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Database.db.one("SELECT id, name, edit_key, view_key FROM teams WHERE subscription_key='".concat(subscrition_key, "'"));

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));
  return _GetTeamFromSubscriptionKey.apply(this, arguments);
}

function RegisterUser(_x3, _x4) {
  return _RegisterUser.apply(this, arguments);
}

function _RegisterUser() {
  _RegisterUser = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(user, subscrition_key) {
    var team, userInDB, isMentor, query, editKey, viewKey, _editKey, _viewKey;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return GetTeamFromSubscriptionKey(subscrition_key);

          case 3:
            team = _context3.sent;
            console.log("team", team);
            _context3.next = 7;
            return _Database.db.any("SELECT * FROM users WHERE uid='".concat(user.uid, "'"));

          case 7:
            userInDB = _context3.sent;
            console.log("user", userInDB);
            _context3.next = 11;
            return _Database.db.any("SELECT * FROM mentors WHERE email='".concat(user.email, "'"));

          case 11:
            isMentor = _context3.sent;

            if (isMentor.length) {
              isMentor = true;
            }

            if (userInDB.length) {
              _context3.next = 23;
              break;
            }

            //register user
            console.log("registering user");
            _context3.next = 17;
            return _Database.db.none("INSERT INTO \n            users(uid, name, email, team, is_mentor) \n            VALUES($1,$2,$3,$4,$5)\n            ", [user.uid, user.displayName, user.email, team.id, isMentor]);

          case 17:
            query = _context3.sent;
            editKey = team.edit_key;
            viewKey = team.view_key;
            return _context3.abrupt("return", {
              id: team.id,
              editKey: editKey,
              viewKey: viewKey
            });

          case 23:
            console.log("user already in db");
            _context3.next = 26;
            return GetTeamById(userInDB[0].team);

          case 26:
            team = _context3.sent;
            //user already in database
            _editKey = team.edit_key;
            _viewKey = team.view_key;
            if (isMentor) _editKey = null;else _viewKey = null;
            return _context3.abrupt("return", {
              id: team.id,
              editKey: _editKey,
              viewKey: _viewKey
            });

          case 31:
            return _context3.abrupt("return", null);

          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3["catch"](0);
            console.log("error", _context3.t0);
            return _context3.abrupt("return", false);

          case 38:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 34]]);
  }));
  return _RegisterUser.apply(this, arguments);
}

function ValidateEditKey(_x5, _x6) {
  return _ValidateEditKey.apply(this, arguments);
}

function _ValidateEditKey() {
  _ValidateEditKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(id, edit_key) {
    var result;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Database.db.one("SELECT edit_key FROM teams WHERE id=".concat(id));

          case 3:
            result = _context4.sent;

            if (!(edit_key == result.edit_key && result.edit_key != null)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", true);

          case 8:
            return _context4.abrupt("return", false);

          case 9:
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", false);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));
  return _ValidateEditKey.apply(this, arguments);
}

function ValidateViewKey(_x7, _x8) {
  return _ValidateViewKey.apply(this, arguments);
}

function _ValidateViewKey() {
  _ValidateViewKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(id, view_key) {
    var result;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Database.db.one("SELECT view_key FROM teams WHERE id=".concat(id));

          case 2:
            result = _context5.sent;

            if (!(view_key == result.view_key && result.view_key != null)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", true);

          case 7:
            return _context5.abrupt("return", false);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _ValidateViewKey.apply(this, arguments);
}

function ValidateRequest(_x9, _x10, _x11) {
  return _ValidateRequest.apply(this, arguments);
}

function _ValidateRequest() {
  _ValidateRequest = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(teamId, editKey, viewKey) {
    var canEdit, canView;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            canEdit = false;
            canView = false;
            _context6.prev = 2;
            _context6.next = 5;
            return ValidateViewKey(teamId, viewKey);

          case 5:
            canView = _context6.sent;
            _context6.next = 8;
            return ValidateEditKey(teamId, editKey);

          case 8:
            canEdit = _context6.sent;
            _context6.next = 13;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](2);

          case 13:
            return _context6.abrupt("return", {
              canEdit: canEdit,
              canView: canView
            });

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[2, 11]]);
  }));
  return _ValidateRequest.apply(this, arguments);
}