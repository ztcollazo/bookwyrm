var dotenv = require("dotenv");
var path = require("path");
var books = require("https://bookwyrm.netlify.app/.netlify/functions/books");

dotenv.config({ path: path.resolve(".env") });

console.log(path.resolve(".env"));

console.log(process.env.GITHUB_SSH_KEY);