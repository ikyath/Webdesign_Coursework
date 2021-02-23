"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _todo = _interopRequireDefault(require("./../models/todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//function to filter the record by using id 
var search = function search(filter) {
  var promise = _todo["default"].find(filter).exec();

  return promise;
}; //function to find the records by using id


var get = function get(id) {
  var promise = _todo["default"].findById(id).exec();

  return promise;
}; //function to create a new to do item


var create = function create(newTodo) {
  var todo = new _todo["default"](newTodo);
  var promise = todo.save();
  return promise;
}; //function to update a record with modifying the updated time


var update = function update(updatedTodo) {
  // get the current utc datetime
  // let currentdate = new Date();
  // sets the modified date
  // updatedTodo.lastModifiedDate = currentdate.toLocaleString();
  var promise = _todo["default"].findByIdAndUpdate({
    _id: updatedTodo.id
  }, updatedTodo, {
    "new": true
  }).exec();

  return promise;
}; // function to delelte a record


var remove = function remove(id) {
  var promise = _todo["default"].remove({
    _id: id
  }).exec();

  return promise;
};

var _default = {
  search: search,
  get: get,
  create: create,
  update: update,
  remove: remove
};
exports["default"] = _default;