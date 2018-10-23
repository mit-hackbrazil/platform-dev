"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateEditKey = ValidateEditKey;
exports.ValidateViewKey = ValidateViewKey;
exports.ValidateRequest = ValidateRequest;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("./Database.js");

function ValidateEditKey(_x, _x2) {
  return _ValidateEditKey.apply(this, arguments);
}

function _ValidateEditKey() {
  _ValidateEditKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(id, edit_key) {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Database.db.one("SELECT edit_key FROM teams WHERE id=".concat(id));

          case 3:
            result = _context.sent;

            if (!(edit_key == result.edit_key && result.edit_key != null)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", true);

          case 8:
            return _context.abrupt("return", false);

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));
  return _ValidateEditKey.apply(this, arguments);
}

function ValidateViewKey(_x3, _x4) {
  return _ValidateViewKey.apply(this, arguments);
}

function _ValidateViewKey() {
  _ValidateViewKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(id, view_key) {
    var result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Database.db.one("SELECT view_key FROM teams WHERE id=".concat(id));

          case 2:
            result = _context2.sent;

            if (!(view_key == result.view_key && result.view_key != null)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", true);

          case 7:
            return _context2.abrupt("return", false);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _ValidateViewKey.apply(this, arguments);
}

function ValidateRequest(_x5, _x6, _x7) {
  return _ValidateRequest.apply(this, arguments);
}

function _ValidateRequest() {
  _ValidateRequest = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(teamId, editKey, viewKey) {
    var canEdit, canView;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            canEdit = false;
            canView = false;
            _context3.prev = 2;
            _context3.next = 5;
            return ValidateViewKey(teamId, viewKey);

          case 5:
            canView = _context3.sent;
            _context3.next = 8;
            return ValidateEditKey(teamId, editKey);

          case 8:
            canEdit = _context3.sent;
            _context3.next = 13;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);

          case 13:
            return _context3.abrupt("return", {
              canEdit: canEdit,
              canView: canView
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[2, 11]]);
  }));
  return _ValidateRequest.apply(this, arguments);
}