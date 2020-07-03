const path = require("path");

const DARK_CLASSIC_YAML_PATH = path.join(
  __dirname,
  "..",
  "schema",
  "dark-classic.yaml"
);

const PRO_YAML_PATH = path.join(__dirname, "..", "schema", "pro.yaml");

module.exports = {
  pro: PRO_YAML_PATH,
  "dark-classic": DARK_CLASSIC_YAML_PATH,
};
