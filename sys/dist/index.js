"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("./graphql");

var _graphqlTools = require("graphql-tools");

var _Auth = require("./Auth");

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

var _App = _interopRequireDefault(require("./client/App"));

var _Html = _interopRequireDefault(require("./client/Html"));

var bodyParser = require('body-parser'); //import reload from 'express-reload';
//GraphQL dependencies


//import Home from "./client/Home.html";
var app = (0, _express.default)();
app.use((0, _cors.default)()); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json());
app.use('/graphql', (0, _expressGraphql.default)({
  schema: (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _graphql.typeDefs,
    resolvers: _graphql.resolvers
  }),
  graphiql: true
})); //hot reload

var clientPath = _path.default.join(__dirname, '/client/'); //app.use(reload(clientPath));


var chokidar = require('chokidar');

var watcher = chokidar.watch(clientPath);
watcher.on('ready', function () {
  watcher.on('all', function () {
    console.log("Clearing /app/ module cache from server");
    Object.keys(require.cache).forEach(function (id) {
      if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});
/*** Home ***/

app.get('/',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var sheet, body, styles, title;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sheet = new _styledComponents.ServerStyleSheet(); // <-- creating out stylesheet

            body = (0, _server.renderToString)(sheet.collectStyles(_react.default.createElement(_App.default, null))); // <-- collecting styles

            styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet

            title = 'Home';
            res.send((0, _Html.default)({
              body: body,
              styles: styles,
              // <-- passing the styles to our Html template
              title: title
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use('/public', _express.default.static(__dirname + '/client/public'));
app.use('/home', function (req, res) {
  res.sendFile(_path.default.join(__dirname + '/client/home.html'));
});
app.use('/register', function (req, res) {
  res.sendFile(_path.default.join(__dirname + '/client/register.html'));
});
app.use('/static', _express.default.static(__dirname + '/client/team/static'));
app.use('/team',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(req, res) {
    var teamId, editKey, viewKey, keysAuth;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            teamId = req.query.id;
            editKey = req.query.edit;
            viewKey = req.query.view;
            _context2.next = 5;
            return (0, _Auth.ValidateRequest)(teamId, editKey, viewKey);

          case 5:
            keysAuth = _context2.sent;
            console.log(keysAuth);
            if (!keysAuth.canEdit && !keysAuth.canView) res.redirect('/home');
            res.sendFile(_path.default.join(__dirname + '/client/team/index.html'));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var port = process.env.PORT;
app.listen(process.env.PORT || 8080);
console.log("\uD83D\uDE80 Running a GraphQL API server at localhost:".concat(process.env.PORT, "/graphql"));
console.log("Serving at http://localhost:".concat(port));