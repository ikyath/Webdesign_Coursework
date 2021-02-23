"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _todo = _interopRequireDefault(require("./../controllers/todo.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // * Search - GET /todos
// * Create - Post /todos


router.route('/todos').get(_todo["default"].index).post(_todo["default"].create);
/**
 * Retrieve - GET /todos/${id}
 * Update - GET /todos/${id}
 * Delete - DELETE /todos/${id}
 */

router.route('/todos/:id').get(_todo["default"].get).put(_todo["default"].update)["delete"](_todo["default"].remove);
var _default = router;
exports["default"] = _default;