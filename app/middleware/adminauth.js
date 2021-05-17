'use strict';
module.exports = options => {
  return async function adminauth(ctx, next) {
    console.log('ctx.session.openID:', ctx.session.openID);
    console.log('ctx.session:', ctx.session);
    console.log('ctx:', ctx);
    // ctx.session.openID: undefined  因为一直拿不到session
    if (ctx.session.openID) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
  // return adminauth;
};
