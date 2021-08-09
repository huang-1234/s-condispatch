'use strict';
module.exports = (options, app) => {
  return async function adminauth(ctx, next) {
    console.log('ctx.session.openID in adminauth<<:', ctx.session.openID);
    console.log('ctx.session:', ctx.session);
    // ctx.session.openID: undefined  因为一直拿不到session
    if (ctx.session.openID) {
      await next();
    } else {
      ctx.body = { data: 'ctx.session.openID in adminauth is not exist.没有登录' };
    }
  };
  // return adminauth;
};
