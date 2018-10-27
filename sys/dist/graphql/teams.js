"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateEditKey = ValidateEditKey;
exports.ValidateViewKey = ValidateViewKey;
exports.resolver = exports.typeDef = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Database = require("../Database.js");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _log = require("./log");

var cryptoRandomString = require('crypto-random-string');

var model = {
  name: null,
  link: null,
  members: [],
  logo: null,
  contacts: null
};
var typeDef = "\n  type Team{\n    id: Int,\n    name: String,\n    description: String,\n    link: String,\n    members: JSON, \n    logo: String, \n    contacts: JSON\n  }\n\n  extend type Query {\n    team(args:JSON): [Team],\n    teamEditKey(args:JSON) : Boolean,\n    teamViewKey(args:JSON) : Boolean,\n    teamSubscritionKey(subscription_key:String) : Team\n  }\n\n  extend type Mutation{\n      addTeam(args:JSON): Boolean,\n      updateTeam(args:JSON): Boolean\n  }\n";
exports.typeDef = typeDef;
var resolver = {
  Query: {
    team: function () {
      var _team = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, input) {
        var team, args;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                team = null;
                args = input.args; //console.log('args', args);

                if (!(args && args.id)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return _Database.db.many("SELECT * from teams WHERE id=".concat(args.id));

              case 5:
                team = _context.sent;
                _context.next = 17;
                break;

              case 8:
                if (!(args && args.name)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return _Database.db.many("SELECT * from teams WHERE name=".concat(args.name));

              case 11:
                team = _context.sent;
                _context.next = 17;
                break;

              case 14:
                _context.next = 16;
                return _Database.db.many("SELECT * FROM teams");

              case 16:
                team = _context.sent;

              case 17:
                return _context.abrupt("return", team);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function team(_x, _x2) {
        return _team.apply(this, arguments);
      };
    }(),
    teamEditKey: function () {
      var _teamEditKey = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_, input) {
        var args, result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                args = input.args;
                _context2.next = 3;
                return _Database.db.one("SELECT edit_key FROM teams WHERE id=".concat(args.id));

              case 3:
                result = _context2.sent;

                if (!(args.key == result.edit_key)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", true);

              case 8:
                return _context2.abrupt("return", false);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function teamEditKey(_x3, _x4) {
        return _teamEditKey.apply(this, arguments);
      };
    }(),
    teamViewKey: function () {
      var _teamViewKey = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_, input) {
        var args, result;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = input.args;
                _context3.next = 3;
                return _Database.db.one("SELECT view_key FROM teams WHERE id=".concat(args.id));

              case 3:
                result = _context3.sent;

                if (!(args.key == result.view_key)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", true);

              case 8:
                return _context3.abrupt("return", false);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function teamViewKey(_x5, _x6) {
        return _teamViewKey.apply(this, arguments);
      };
    }(),
    teamSubscritionKey: function () {
      var _teamSubscritionKey = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(_, _ref) {
        var subscription_key, result;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                subscription_key = _ref.subscription_key;
                _context4.next = 3;
                return _Database.db.one("SELECT id, name FROM teams WHERE subscription_key='".concat(subscription_key, "'"));

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function teamSubscritionKey(_x7, _x8) {
        return _teamSubscritionKey.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    //ADD
    addTeam: function () {
      var _addTeam = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(_, _ref2, req) {
        var args, edit_key, view_key, subscription_key, input, query;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                args = _ref2.args;
                _context5.next = 3;
                return GenerateKey('edit_key');

              case 3:
                edit_key = _context5.sent;
                _context5.next = 6;
                return GenerateKey('view_key');

              case 6:
                view_key = _context5.sent;
                _context5.next = 9;
                return GenerateKey('subscription_key');

              case 9:
                subscription_key = _context5.sent;
                input = args;
                _context5.next = 13;
                return _Database.db.none("INSERT INTO \n            teams(name, edit_key, logo, members, link, contacts, view_key, subscription_key) \n            VALUES($1,$2,$3,$4,$5,$6,$7, $8)\n            ", [input.name, edit_key, input.logo, input.members, input.link, input.contacts, view_key, subscription_key]);

              case 13:
                query = _context5.sent;
                (0, _log.Log)(req, "insert@team", args);
                return _context5.abrupt("return", true);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function addTeam(_x9, _x10, _x11) {
        return _addTeam.apply(this, arguments);
      };
    }(),
    updateTeam: function () {
      var _updateTeam = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(_, _ref3, req) {
        var args, original, input, query;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                args = _ref3.args;
                _context6.next = 3;
                return _Database.db.one("SELECT * FROM teams WHERE id=".concat(args.id));

              case 3:
                original = _context6.sent;
                input = Object.assign(original, args);
                console.log("team Update", input); //Only requests containing a valid edit_key are allowed to update db content

                if (!(input.edit_Key == original.edit_Key)) {
                  _context6.next = 15;
                  break;
                }

                console.log("EXECUTING QUERY");
                _context6.next = 10;
                return _Database.db.one("UPDATE teams SET\n                (name, logo, description, members, link, contacts) = ($1,$2,$3,$4,$5, $6) WHERE id=".concat(args.id, " RETURNING *\n                "), [input.name, input.logo, input.description, input.members, input.link, input.contacts]);

              case 10:
                query = _context6.sent;
                (0, _log.Log)(req, "update@team", args);
                return _context6.abrupt("return", true);

              case 15:
                return _context6.abrupt("return", false);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function updateTeam(_x12, _x13, _x14) {
        return _updateTeam.apply(this, arguments);
      };
    }()
  }
};
exports.resolver = resolver;

var GenerateKey =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(key_name) {
    var table_name,
        keyIsUsed,
        new_key,
        findKey,
        _args7 = arguments;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            table_name = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : "teams";
            keyIsUsed = true;

          case 2:
            if (!keyIsUsed) {
              _context7.next = 10;
              break;
            }

            new_key = cryptoRandomString(16);
            _context7.next = 6;
            return _Database.db.any("SELECT * FROM ".concat(table_name, " WHERE ").concat(key_name, "='").concat(new_key, "'"));

          case 6:
            findKey = _context7.sent;
            keyIsUsed = findKey.length > 0 ? true : false;
            _context7.next = 2;
            break;

          case 10:
            return _context7.abrupt("return", new_key);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function GenerateKey(_x15) {
    return _ref4.apply(this, arguments);
  };
}();

function ValidateEditKey(_x16, _x17) {
  return _ValidateEditKey.apply(this, arguments);
}

function _ValidateEditKey() {
  _ValidateEditKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(id, edit_key) {
    var result;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Database.db.one("SELECT edit_key FROM teams WHERE id=".concat(id));

          case 2:
            result = _context8.sent;

            if (!(edit_key == result.edit_key)) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", true);

          case 7:
            return _context8.abrupt("return", false);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _ValidateEditKey.apply(this, arguments);
}

function ValidateViewKey(_x18, _x19) {
  return _ValidateViewKey.apply(this, arguments);
}

function _ValidateViewKey() {
  _ValidateViewKey = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(id, view_key) {
    var result;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _Database.db.one("SELECT view_key FROM teams WHERE id=".concat(id));

          case 2:
            result = _context9.sent;

            if (!(view_key == result.view_key)) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", true);

          case 7:
            return _context9.abrupt("return", false);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _ValidateViewKey.apply(this, arguments);
}