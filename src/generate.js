const fs = require("fs");
const path = require("path");
const { Type, Schema, load } = require("js-yaml");

// return yaml file location
function getLocation (name) {
  return path.join(__dirname, "..", "schema", name + ".yaml")
}

// return yaml files
function getYaml(name) {
  return {
    pro: fs.readFileSync(getLocation('pro'), "utf8"),
    basic: fs.readFileSync(getLocation(name), "utf8"),
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
  const yamls = getYaml(name);

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
