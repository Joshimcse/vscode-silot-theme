const path = require("path");

const DARK_CLASSIC = path.join(__dirname, "..", "schema", "dark-classic.yaml");
const DARK_BLUE = path.join(__dirname, "..", "schema", "dark-blue.yaml");
const PRO = path.join(__dirname, "..", "schema", "pro.yaml");

module.exports = {
  pro: PRO,
  "dark-classic": DARK_CLASSIC,
  "dark-blue": DARK_BLUE,
};