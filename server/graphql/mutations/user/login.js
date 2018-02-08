
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config')[env];
const UserModel = require('../../../models/user');
const UserType = require('../../types/user').UserType;
const UserInputType = require('../../types/user').UserInputType;
const Auth = require('../../../utils/auth').Auth;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = {
    type: UserType,
    args: {
        user: {
            type: UserInputType
        }
    },
    resolve(parent, params, ctx) {
        const { email, password } = params.user;

        return UserModel.findOne({ email: email }).then((user) => {
            if (user) {
                // validate password
                return bcrypt.compare(password, user.password).then((res) => {
                    if (res) {
                        // create jwt
                        const token = jwt.sign({
                            id: user.id,
                            email: user.email
                        }, config.JWT_SECRET);
                        user.jwt = token;
                        ctx.user = Promise.resolve(user);
                        user.password = '';
                        return user;
                    }

                    return Promise.reject('Incorrect password');
                });
            }

            return Promise.reject('Not user found with email' + email);
        });
    }
}