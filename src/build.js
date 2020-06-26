const fs = require("fs");
const path = require("path");
const generate = require("./generate");

const variants = ["dark-classic"];

const THEME_DIR = path.join(__dirname, "..", "themes");

if (!fs.existsSync(THEME_DIR)) {
  fs.mkdirSync(THEME_DIR);
}

variants.forEach((variant) => {
  let theme = generate(variant);
  
  fs.writeFileSync(
    path.join(THEME_DIR, `silot-${variant}.json`),
    JSON.stringify(theme, null, 2)
  );
});
