"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _todo = _interopRequireDefault(require("./../services/todo.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// to call a function either by get,push, push , delete request
var index = function index(request, response) {
  _todo["default"].search({}).then(function (todos) {
    response.status(200);
    response.json(todos);
  })["catch"](handleError(response));
}; //get


var get = function get(request, response) {
  var id = request.params.id;

  _todo["default"].get(id).then(function (todos) {
    response.status(200);
    response.json(todos);
  })["catch"](handleError(response));
}; //create


var create = function create(request, response) {
  var newTodo = Object.assign({}, request.body);

  _todo["default"].create(newTodo).then(function (todos) {
    response.status(200);
    response.json(todos);
  })["catch"](handleError(response));
}; //update call


var update = function update(request, response) {
  var id = request.params.id;
  var updateTodo = Object.assign({}, request.body);
  updateTodo.id = id;

  _todo["default"].update(updateTodo).then(function (todos) {
    response.status(200);
    response.json(todos);
  })["catch"](handleError(response));
}; //remove call


var remove = function remove(request, response) {
  var id = request.params.id; // const updateTodo = Object.assign({},request.body);

  _todo["default"].remove(id).then(function (todos) {
    response.status(200);
    response.json({
      message: 'Delete Successful'
    });
  })["catch"](handleError(response));
};

var handleError = function handleError(response) {
  return function (error) {
    response.status(500);
    response.json({
      message: error.message
    });
  };
};

var _default = {
  index: index,
  get: get,
  create: create,
  update: update,
  remove: remove
};
exports["default"] = _default;