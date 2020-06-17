const fs = require("fs");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');  // https://www.npmjs.com/package/eleventy-plugin-lazyimages

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats(["html", "liquid", "njk", "ejs", "md", "hbs", "mustache", "haml", "pug", "11ty.js", "pdf", "gif"]);
  // eleventyConfig.addPassthroughCopy("src/resources");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/data");

  // Plugins
  eleventyConfig.addPlugin(lazyImagesPlugin);

  // For 404 redirecting:
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      // layouts: "_includes/_layouts",
    },
    pathPrefix: "/organicchemistrydata/",
    htmlTemplateEngine: "njk"
  };
};