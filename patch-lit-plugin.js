// https://github.com/lit/lit/pull/3006

const fs = require("fs");
const path = require("path");

const filename = "node_modules/@lit-labs/eleventy-plugin-lit/index.js";

const fileLocation = path.resolve(__dirname, filename);

const fileContents = fs.readFileSync(fileLocation, "utf8");

const stringMatch = `if (!outputPath.endsWith('.html'))`;
const stringReplace = `if (outputPath && !outputPath.endsWith('.html'))`;

const newContents = fileContents.replaceAll(stringMatch, stringReplace);

fs.writeFileSync(fileLocation, newContents, "utf8");
