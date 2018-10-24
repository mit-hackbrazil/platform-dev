"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTeamById = GetTeamById;
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

function ValidateEditKey(_x2, _x3) {
  return _ValidateEditKey.apply(this, arguments);
}

function _ValidateEditKey() {
  _ValidateEditKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(id, edit_key) {
    var result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Database.db.one("SELECT edit_key FROM teams WHERE id=".concat(id));

          case 3:
            result = _context2.sent;

            if (!(edit_key == result.edit_key && result.edit_key != null)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", true);

          case 8:
            return _context2.abrupt("return", false);

          case 9:
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));
  return _ValidateEditKey.apply(this, arguments);
}

function ValidateViewKey(_x4, _x5) {
  return _ValidateViewKey.apply(this, arguments);
}

function _ValidateViewKey() {
  _ValidateViewKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(id, view_key) {
    var result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Database.db.one("SELECT view_key FROM teams WHERE id=".concat(id));

          case 2:
            result = _context3.sent;

            if (!(view_key == result.view_key && result.view_key != null)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", true);

          case 7:
            return _context3.abrupt("return", false);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _ValidateViewKey.apply(this, arguments);
}

function ValidateRequest(_x6, _x7, _x8) {
  return _ValidateRequest.apply(this, arguments);
}

function _ValidateRequest() {
  _ValidateRequest = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(teamId, editKey, viewKey) {
    var canEdit, canView;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            canEdit = false;
            canView = false;
            _context4.prev = 2;
            _context4.next = 5;
            return ValidateViewKey(teamId, viewKey);

          case 5:
            canView = _context4.sent;
            _context4.next = 8;
            return ValidateEditKey(teamId, editKey);

          case 8:
            canEdit = _context4.sent;
            _context4.next = 13;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);

          case 13:
            return _context4.abrupt("return", {
              canEdit: canEdit,
              canView: canView
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[2, 11]]);
  }));
  return _ValidateRequest.apply(this, arguments);
}