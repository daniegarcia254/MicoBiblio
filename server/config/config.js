env = process.env.NODE_ENV || 'development';

module.exports = {
    //MongoDB configuration
    development: {
        port: 10008,
        GoogleApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        db: {
            base: 'mongodb://',
            user: 'dgarcia',
            password: '',
            host: 'danigarcia-dev.com',
            port: '10007',
            name: 'micobiblio'
        },
        app: {
            name: 'micobiblio'
        }
    },
    production: {
        GoogleApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        db: {
            base: 'mongodb://',
            user: '<username>',
            password: '<password>',
            host: 'danigarcia-dev.com',
            port: '10007',
            name: 'micobiblio'
        },
        app: {
            name: 'micobiblio'
        }
    },
    getDatabaseURL: function() {
        var dbData = this[env].db;
        var dbUser = dbData.user + (dbData.password ? (':' + dbData.password) : '');
        var dbHost = dbData.host + (dbData.port ? (':' + dbData.port) : '');
        return dbData.base + dbUser + '@' + dbHost + '/' + dbData.name;
    }
};