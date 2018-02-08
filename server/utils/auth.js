
const getAuthenticatedUser = function(ctx) {
    return ctx.user.
      then((user) => {
        if (!user) {
          return Promise.reject('Unauthorized');
        }
        return user;
      })
}

const checkBelongsToUser = function(user, id, model, objectName, action) {
  return model.findById(id)
    .then((instance) => {
      if (!instance.user.equals(user._id)) {
        return Promise.reject('Unauthorized: user must own '+objectName+' to '+action+' it.');
      }
      return instance;
    })
}

exports.Auth = {
    getAuthenticatedUser,
    checkBelongsToUser
}