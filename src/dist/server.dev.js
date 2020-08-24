"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewBook = exports.book = exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].connect(process.env.BOOKS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports["default"] = _default;
var book = new _mongoose["default"].Schema({
  bookTitle: {
    type: String,
    required: true
  },
  bookAuthor: {
    type: String,
    required: true
  },
  bookSummary: {
    type: String,
    required: true
  }
});
exports.book = book;

var NewBook = _mongoose["default"].Model();

exports.NewBook = NewBook;