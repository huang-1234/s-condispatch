'use strict';
module.exports = app => {
  console.log('call admin interface');
  const { router, controller } = app;
  router.get('/admin/index', controller.admin.main.index);
  // router.post('/admin/checkOpenID', controller.admin.main.checkLogin);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
};
