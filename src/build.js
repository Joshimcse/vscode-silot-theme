const fs = require("fs");
const path = require("path");
const generate = require("./generate");

const variants = ["dark-classic", "dark-blue"];

const THEME_DIR = path.join(__dirname, "..", "themes");

// check theme dir is exists or not. if not then create new dir.
if (!fs.existsSync(THEME_DIR)) {
  fs.mkdirSync(THEME_DIR);
}

variants.forEach((variant) => {
  let {basic, pro} = generate(variant);

  // write basic theme
  fs.writeFileSync(
    path.join(THEME_DIR, `silot-${variant}.json`),
    JSON.stringify(basic, null, 2)
  );
  // write pro theme
  fs.writeFileSync(
    path.join(THEME_DIR, `silot-pro-${variant}.json`),
    JSON.stringify(pro, null, 2)
  );
});