'use strict';
module.exports = app => {
  console.log('call admin interface');
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  // router.post('/admin/checkOpenID', controller.admin.main.checkLogin);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 使用中间件实现路由守卫
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);

  router.post('/admin/addArticle', controller.admin.main.addArticle);

  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);

};
