const config = {
  type: "app",
  name: "Event duplicator plugin",
  entryPoints: {
    app: "./src/App.js",
    plugin: "./src/EventFetch.js",
  },
};

module.exports = config;
