const fs = require('fs');
const path = require('path');
const { Type, Schema, load } = require('js-yaml');

const SYLOT_YAML_PATH = path.join(__dirname, 'sylot.yaml');
const DARK_YAML_PATH = path.join(__dirname, 'dark.yaml');
const LIGHT_YAML_PATH = path.join(__dirname, 'light.yaml');

const THEME_DIR = path.join(__dirname, '..', 'themes');

const sylotYaml = fs.readFileSync(SYLOT_YAML_PATH, 'utf8');
const darkYaml = fs.readFileSync(DARK_YAML_PATH, 'utf8');
const lightYaml = fs.readFileSync(LIGHT_YAML_PATH, 'utf8');

const toJSON = theme => {
  return JSON.stringify(theme, null, 2);
};

const mergeYaml = themeName => {
  if (themeName === 'dark') return darkYaml + '\n' + sylotYaml;
  else if (themeName === 'light') return lightYaml + '\n' + sylotYaml;
  else return '';
};

const YamlToObject = yamlData => {
  const withAlphaType = new Type('!alpha', {
    kind: 'sequence',
    construct: ([hexRGB, alpha]) => hexRGB + alpha,
    represent: ([hexRGB, alpha]) => hexRGB + alpha
  });
  const schema = Schema.create([withAlphaType]);

  return load(yamlData, { schema });
};

function themeGenerate(themeName, fileName) {
  themeYaml = mergeYaml(themeName);
  finalTheme = YamlToObject(themeYaml);

  if (!fs.existsSync(THEME_DIR)) {
    fs.mkdirSync(THEME_DIR);
  }

  fs.writeFileSync(
    path.join(THEME_DIR, `sylot-${themeName}.json`),
    toJSON(finalTheme)
  );
}

module.exports = {
  themeGenerate
};
