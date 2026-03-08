const desertFun = require("./desertFun/desertFun.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(desertFun);
    // ~cb-add-configure-service-name~
};
