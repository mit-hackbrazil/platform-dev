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

//api key
//3dPc7PCn8JVgf4LJ
var cryptoRandomString = require('crypto-random-string');
/*
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
*/


var API_KEY = '3dPc7PCn8JVgf4LJ';
var typeDef = "\n  type User{\n    id: Int,\n    name: String,\n    email: String,\n    uid: String,\n    timestamp:String,\n    team: Int,\n    editKey: String,\n    viewKey: String,\n    isMentor: Boolean\n  }\n\n  extend type Query {\n    validateUser(args:JSON): Boolean\n  }\n";
exports.typeDef = typeDef;
var resolver = {
  Query: {
    validateUser: function () {
      var _validateUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, _ref) {
        var args, apiKey, user, userOnDB;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                args = _ref.args;
                apiKey = args.apiKey, user = args.user;
                _context.next = 4;
                return _Database.db.any("SELECT * from users WHERE uid='".concat(user.uid, "'"));

              case 4:
                userOnDB = _context.sent;

                if (!(apiKey != API_KEY)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", false);

              case 7:
                if (userOnDB) {//Login
                } else {} //Register user
                  //all


                if (!(args.id === undefined)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return _Database.db.many("SELECT * FROM users WHERE ");

              case 11:
                file = _context.sent;

              case 12:
                return _context.abrupt("return", file);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function validateUser(_x, _x2) {
        return _validateUser.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    addTeam: function () {
      var _addTeam = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_, _ref2, req) {
        var args, query;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                args = _ref2.args;
                _context2.next = 3;
                return _Database.db.none("INSERT INTO \n            teams(name, subscription_key, logo, members, link, contacts) \n            VALUES($1,$2,$3,$4,$5,$6)\n            ", [input.name, subscription_key, input.logo, input.members, input.link, input.contact]);

              case 3:
                query = _context2.sent;
                return _context2.abrupt("return", true);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function addTeam(_x3, _x4, _x5) {
        return _addTeam.apply(this, arguments);
      };
    }()
  }
};
exports.resolver = resolver;

var GenerateKey =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(key) {
    var keyIsUsed, new_key, findKey;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            keyIsUsed = true;

          case 1:
            if (!keyIsUsed) {
              _context3.next = 9;
              break;
            }

            new_key = cryptoRandomString(10);
            _context3.next = 5;
            return _Database.db.any("SELECT * FROM teams WHERE subscription_key='".concat(new_key, "'"));

          case 5:
            findKey = _context3.sent;
            keyIsUsed = findKey.length > 0 ? true : false;
            _context3.next = 1;
            break;

          case 9:
            return _context3.abrupt("return", new_key);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function GenerateKey(_x6) {
    return _ref3.apply(this, arguments);
  };
}();