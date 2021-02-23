"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _app = _interopRequireDefault(require("./../app"));

var _todo = _interopRequireDefault(require("./../controllers/todo.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // * Search - GET /todos
// * Create - Post /todos
// app.use('/todos',router);


router.route('/todos').get(_todo["default"].index); // .post(todoController.create);

/**
 * Retrieve - GET /todos/${id}
 * Update - GET /todos/${id}
 * Delete - DELETE /todos/${id}
 */

router.route('/todos/:id').get(_todo["default"].get); // .put(todoController.update)
// .delete(todoController.remove);

router.route('/todos/add').post(_todo["default"].create);
router.route('/todos/view/:id').get(_todo["default"].get);
router.route('/todos/update/:id').post(_todo["default"].update);
var _default = router;
exports["default"] = _default;