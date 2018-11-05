"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("./graphql");

var _graphqlTools = require("graphql-tools");

var auth = _interopRequireWildcard(require("./Auth"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

var _App = _interopRequireDefault(require("./client/App"));

var _Html = _interopRequireDefault(require("./client/Html"));

//import reload from 'express-reload';
//GraphQL dependencies
//React Server-side rendering 
// <-- renderToString() will take our React app and turn it into a string to be inserted into our Html template function.
// <-- importing ServerStyleSheet
var app = (0, _express.default)();
app.use((0, _cors.default)()); // parse application/x-www-form-urlencoded

app.use(_bodyParser.default.urlencoded({
  extended: false
})); // parse application/json

app.use(_bodyParser.default.json()); //session

app.use((0, _expressSession.default)({
  secret: '3dPc7PCn8JVgf4LJ',
  resave: true,
  saveUninitialized: true
}));
app.use('/graphql', (0, _expressGraphql.default)({
  schema: (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _graphql.typeDefs,
    resolvers: _graphql.resolvers
  }),
  graphiql: true
})); //--------server-side rendering
// app.get('/app', async (req, res) => {
//     const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
//     const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
//     const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
//     const title = 'Home';
//     res.send(
//         Html({
//             body,
//             styles, // <-- passing the styles to our Html template
//             title
//         })
//     );
// });

app.use('/public', _express.default.static(_path.default.join(__dirname + '/client/public'))); //--------- Home

app.get('/', function (req, res) {
  res.sendFile(_path.default.join(__dirname + '/client/Home.html'), {
    name: "TEAM NAME"
  });
  /*
  if (req.query.subscription) {
      //register a new team
  } else
      res.render(path.join(__dirname + '/client/Home.html'), { name: "TEAM NAME" });*/
});
/*** Register - server-side rendering ***/

app.get('/register',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /* const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
             const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
             const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
             const title = 'Home';
               res.send(
                 Html({
                     body,
                     styles, // <-- passing the styles to our Html template
                     title
                 })
             );
               console.log(req.query.subscription);
            */
            res.sendFile(_path.default.join(__dirname + '/client/Register.html'));

          case 1:
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
app.use('/static', _express.default.static(__dirname + '/client/team/static'));
app.get('/team',
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
            return (0, auth.ValidateRequest)(teamId, editKey, viewKey);

          case 5:
            keysAuth = _context2.sent;
            console.log(keysAuth);
            if (!keysAuth.canEdit && !keysAuth.canView) res.redirect('/error?type=0');
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
app.get('/error',
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(req, res) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.sendFile(_path.default.join(__dirname + '/client/Error.html'));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //user routering

app.get('/login',
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(req, res) {
    var config, register, id, editKey, viewKey;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!req.query.config) {
              _context4.next = 8;
              break;
            }

            config = JSON.parse(decodeURIComponent(req.query.config)); //console.log('config',config);

            _context4.next = 4;
            return auth.RegisterUser(config.user, config.subscription);

          case 4:
            register = _context4.sent;

            if (register) {
              id = register.id, editKey = register.editKey, viewKey = register.viewKey;
              console.log("/team?id=".concat(id, "&edit=").concat(editKey));
              if (editKey) res.redirect("/team?id=".concat(id, "&edit=").concat(editKey));else res.redirect("/team?id=".concat(id, "&view=").concat(viewKey));
            }

            _context4.next = 9;
            break;

          case 8:
            res.redirect('/error?type=1');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var port = process.env.PORT;
app.listen(process.env.PORT || 8080);
console.log("\uD83D\uDE80 Running a GraphQL API server at localhost:".concat(process.env.PORT, "/graphql"));
console.log("Serving at http://localhost:".concat(port));