'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// module.exports = app => {
//   const { router, controller } = app;
//   router.get('/', controller.home.index);
// };
module.exports = app => {
  require('./router/default')(app);
  require('./router/admin')(app);
};
