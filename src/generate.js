const fs = require("fs");
const { Type, Schema, load } = require("js-yaml");
const paths = require("./paths");

const YamlsFile = {};
YamlsFile["pro"] = fs.readFileSync(paths["pro"], "utf8");
YamlsFile["dark-classic"] = fs.readFileSync(paths["dark-classic"], "utf8");

module.exports = (name) => {
  const withAlphaType = new Type("!alpha", {
    kind: "sequence",
    construct: ([hexRGB, alpha]) => hexRGB + alpha,
    represent: ([hexRGB, alpha]) => hexRGB + alpha,
  });
  const schema = Schema.create([withAlphaType]);

  /** @type {Theme} */
  const pro = load(YamlsFile.pro, { schema });
  const basic = load(YamlsFile[`${name}`], { schema });

  // Remove nulls and other falsy values from colors
  for (const key of Object.keys(basic.colors)) {
    if (!basic.colors[key]) {
      delete basic.colors[key];
    }
  }

  return {
    basic,
    pro: {
      ...basic,
      tokenColors: [
        ...basic.tokenColors,
        ...pro
      ]
    },
  };
};