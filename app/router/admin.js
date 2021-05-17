'use strict';
module.exports = app => {
  console.log('call admin interface');
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  // router.post('/admin/checkOpenID', controller.admin.main.checkLogin);
  // router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 使用中间件实现路由守卫
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);

  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);

  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);

  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);

};
