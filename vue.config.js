module.exports = {
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
