"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.books = void 0;

var _pg = require("pg");

var _pgtools = _interopRequireDefault(require("pgtools"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var booksConfig = {
  database: process.env.PGDB1,
  connectionString: process.env.PGCSTRING1
};
var usersConfig = {
  database: process.env.PGDB2,
  connectionString: process.env.PGCSTRING2
};

_pgtools["default"].createdb(booksConfig, 'books', function (err, res) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }

  console.log(res);
});

_pgtools["default"].createdb(usersConfig, 'users', function (err, res) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }

  console.log(res);
});

var books = new _pg.Client(booksConfig);
exports.books = books;
var users = new _pg.Client(usersConfig);
exports.users = users;
books.connect();
users.connect();
books.query("CREATE TABLE books IN books (id INTEGER PRIMARY KEY AUTO_INCREMENT, title TEXT, author TEXT, summary TEXT);");