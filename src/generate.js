const fs = require("fs");
const path = require("path");
const { Type, Schema, load } = require("js-yaml");
const paths = require("./paths");

const YamlsFile = {};
YamlsFile["dark-classic"] = fs.readFileSync(paths["dark-classic"], "utf8");

module.exports = (name) => {
  const withAlphaType = new Type("!alpha", {
    kind: "sequence",
    construct: ([hexRGB, alpha]) => hexRGB + alpha,
    represent: ([hexRGB, alpha]) => hexRGB + alpha,
  });
  const schema = Schema.create([withAlphaType]);

  /** @type {Theme} */
  const theme = load(YamlsFile[`${name}`], { schema });

  // Remove nulls and other falsy values from colors
  for (const key of Object.keys(theme.colors)) {
    if (!theme.colors[key]) {
      delete theme.colors[key];
    }
  }

  return theme;
};