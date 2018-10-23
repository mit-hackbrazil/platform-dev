"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
var Html = function Html(_ref) {
  var body = _ref.body,
      styles = _ref.styles,
      title = _ref.title;
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>".concat(title, "</title>\n      ").concat(styles, "\n    </head>\n    <body style=\"margin:0\">\n      <div id=\"app\">").concat(body, "</div>\n    </body>\n  </html>\n");
};

var _default = Html;
exports.default = _default;