var dotenv = require("dotenv");
var path = require("path");

dotenv.config({ path: path.resolve(".env") });

console.log(path.resolve(".env"));

console.log(process.env.GITHUB_SSH_KEY);