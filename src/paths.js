const path = require("path");

const DARK_CLASSIC_YAML_PATH = path.join(
  __dirname,
  "..",
  "schema",
  "dark-classic.yaml"
);

module.exports = {
  "dark-classic": DARK_CLASSIC_YAML_PATH,
};
