
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config')[env];
const UserModel = require('../../../models/user');
const UserType = require('../../types/user').UserType;
const UserInputType = require('../../types/user').UserInputType;
const Auth = require('../../../utils/auth').Auth;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = {
    type: UserType,
    args: {
        user: {
            type: UserInputType
        }
    },
    resolve(parent, params, ctx) {
        const { email, password, username } = params.user;

        // find user by email
        return UserModel.findOne({ email: email }).then((existing) => {
            if (!existing) {
                // hash password and create user
                return bcrypt.hash(password, 10)
                    .then((hash) => {
                        const uModel = new UserModel({
                            email,
                            password: hash,
                            username: username || email
                        });
                        return uModel.save()
                            .then((user) => {
                                const { id } = user;
                                const token = jwt.sign({ id, email }, config.JWT_SECRET);
                                user.jwt = token;
                                ctx.user = Promise.resolve(user);
                                return user;
                            })
                            .catch(err => new Error(err));
                    });
            }

            return Promise.reject('Email already exists'); // email already exists
        });
    }
}