"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Entering schema for the collections in mongoDB
var todoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: "Title is required"
  },
  description: {
    type: String,
    //Mandatory fields
    required: true
  },
  createdDate: {
    type: Date,
    // date is default 
    "default": Date.now,
    // to not allow users to modify the content
    unmodifiable: true
  },
  lastModifiedDate: {
    type: Date,
    // date is default 
    "default": Date.now,
    // to not allow users to modify the content
    unmodifiable: true
  }
}, {
  versionKey: false
}); // sets the virtual id

todoSchema.virtual('id').get(function () {
  return this._id.toHexString();
}); //sets the JSON format

todoSchema.set('toJSON', {
  virtuals: true
}); //exports the model

var _default = _mongoose["default"].model('Todo', todoSchema);

exports["default"] = _default;