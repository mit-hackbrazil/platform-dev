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

var cryptoRandomString = require('crypto-random-string');

var model = {
  name: null,
  link: null,
  members: [],
  logo: null,
  contacts: null
};
var typeDef = "\n\n  type File{\n    id: Int,\n    name: String,\n    type: String,\n    author_meteor: String,\n    data: String,\n    timestamp: String\n  }\n\n  extend type Query {\n    file(args:JSON): [File]\n  }\n  \n";
exports.typeDef = typeDef;
var resolver = {
  Query: {
    file: function () {
      var _file = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_, args) {
        var file;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = null; //all

                if (!(args.id === undefined)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return _Database.db.many("SELECT * FROM files");

              case 4:
                file = _context.sent;

              case 5:
                return _context.abrupt("return", file);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function file(_x, _x2) {
        return _file.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    /*
    //ADD
    async addTeam(_, { args }, req) {
        let subscription_key = await GenerateKey();
        let input = args;
         let query = await db.none(`INSERT INTO 
        teams(name, subscription_key, logo, members, link, contacts) 
        VALUES($1,$2,$3,$4,$5,$6)
        `, [input.name, subscription_key, input.logo, input.members, input.link, input.contact]);
         return true;
    },
     async updateTeam(_, { args }, req) {
         let original = await db.one(`SELECT * FROM teams WHERE id=${args.id}`);
        let input = Object.assign(original, args);
         let query = await db.one(`UPDATE teams SET
        (name, subscription_key, logo, members, link, contacts) = ($1,$2,$3,$4,$5,$6) WHERE id=${args.id} RETURNING *
        `, [input.name, input.subscription_key, input.logo, input.members, input.link, input.contact]);
         return true;
    }*/
  }
};
exports.resolver = resolver;

var GenerateKey =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(key) {
    var keyIsUsed, new_key, findKey;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            keyIsUsed = true;

          case 1:
            if (!keyIsUsed) {
              _context2.next = 9;
              break;
            }

            new_key = cryptoRandomString(10);
            _context2.next = 5;
            return _Database.db.any("SELECT * FROM teams WHERE subscription_key='".concat(new_key, "'"));

          case 5:
            findKey = _context2.sent;
            keyIsUsed = findKey.length > 0 ? true : false;
            _context2.next = 1;
            break;

          case 9:
            return _context2.abrupt("return", new_key);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function GenerateKey(_x3) {
    return _ref.apply(this, arguments);
  };
}();