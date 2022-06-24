const litPlugin = require("@lit-labs/eleventy-plugin-lit");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

function getLitComponents(...components) {
  const root = "src/assets/js/";
  return components.map((x) => `${root}${x}.js`);
}

function serverlessAssets() {
    return [
      ...getLitComponents("app"),
      "src/assets/js/package.json"
    ];
  }

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("node_modules/@webcomponents");
  eleventyConfig.addPassthroughCopy("node_modules/@lit");
  eleventyConfig.addPassthroughCopy("node_modules/lit");
  eleventyConfig.addPassthroughCopy("node_modules/lit-element");
  eleventyConfig.addPassthroughCopy("node_modules/lit-html");

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverless",
    functionsDir: "./netlify/functions/",
    copy: serverlessAssets(),
  });

  eleventyConfig.addPlugin(litPlugin, {
    mode: "worker",
    componentModules: getLitComponents("app"),
  });

  return {
    dir: {
      input: "src/",
      output: "public/",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
