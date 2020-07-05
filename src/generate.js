const fs = require("fs");
const { Type, Schema, load } = require("js-yaml");
const paths = require("./paths");

function loadYaml(name) {
  return {
    pro: fs.readFileSync(paths["pro"], "utf8"),
    basic: fs.readFileSync(paths[name], "utf8"),
  };
}

module.exports = (name) => {
  // define yaml schema
  const withAlphaType = new Type("!alpha", {
    kind: "sequence",
    construct: ([hexRGB, alpha]) => hexRGB + alpha,
    represent: ([hexRGB, alpha]) => hexRGB + alpha,
  });
  const schema = Schema.create([withAlphaType]);

  // load yaml files with pro
  const yamls = loadYaml(name);

  // yaml file converted to js object.
  const pro = load(yamls.pro, { schema });
  const basic = load(yamls.basic, { schema });

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
      tokenColors: [...basic.tokenColors, ...pro],
    },
  };
};
