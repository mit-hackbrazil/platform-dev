"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolver = exports.typeDef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("../Database.js");

var typeDef = "\n\n  type Notification{\n    type:String, \n    content:String, \n    icon:String,\n    timestamp: Date,\n    active: Boolean\n  }\n\n  extend type Query {\n    notifications: [Notification]\n  }\n  \n";
exports.typeDef = typeDef;
var resolver = {
  Query: {
    notifications: function (_notifications) {
      function notifications(_x, _x2) {
        return _notifications.apply(this, arguments);
      }

      notifications.toString = function () {
        return _notifications.toString();
      };

      return notifications;
    }(
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, args) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Database.db.many("SELECT * FROM notifications WHERE active=true ORDER BY timestamp");

              case 2:
                notifications = _context.sent;
                return _context.abrupt("return", notifications);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};
exports.resolver = resolver;