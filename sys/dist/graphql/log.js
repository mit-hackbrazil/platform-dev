"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("../Database.js");

var Log =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, type, args) {
    var ip, query;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ip = req.socket.address().address;
            console.log("log", ip);
            _context.next = 4;
            return _Database.db.none("INSERT INTO \n            log(type, ipv4, args) \n            VALUES($1,$2,$3)\n            ", [type, ip, JSON.stringify(args)]);

          case 4:
            query = _context.sent;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function Log(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.Log = Log;