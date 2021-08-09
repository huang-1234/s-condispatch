'use strict';
module.exports = (options, app) => {

  return async function authLogin(ctx, next) {

    const whiteUrls = options.whiteUrls || [];
    // 如果ctx.url在白名单中
    const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl));
    if (!isWhiteUrl) {
      console.log('authLogin');
      if (!ctx.session.userId) {
        ctx.redirect('/login'); // 让用户去登录
      }
      else {
        console.log('auth ok');
        await next();
      }
    } else {
      // 白名单
      console.log('white url');
      await next();
    }
  };
};

