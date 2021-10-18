'use strict';
module.exports = app => {
  console.log('call admin interface');
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  // const authLogin = app.middleware.authLogin();
  // router.get('/admin/index', adminauth, controller.admin.main.index);
  router.get('/admin/index', controller.admin.main.index);
  // router.post('/admin/checkOpenID', controller.admin.main.checkLogin);
  router.post('/admin/checkLogin', controller.admin.user.checkLogin);
  // 使用中间件实现路由守卫
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);

  router.post('/admin/addArticle', controller.admin.main.addArticle);
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', controller.admin.main.getArticleList);

  // router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  // router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  // copy
  router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById);

};
