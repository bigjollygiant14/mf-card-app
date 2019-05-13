module.exports = {
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/mf-card-app/" : "/",
  devServer: {
    proxy: {
      "/FOOL_API/*": {
        target: "https://www.fool.com",
        secure: false,
        preserverHeaderKeyCase: true,
        pathRewrite: { "^/FOOL_API": "/the-ascent/api" }
      }
    }
  }
};
