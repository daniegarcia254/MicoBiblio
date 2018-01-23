module.exports = {
    //MongoDB configuration
    development: {
	port: 10008,
        db: 'mongodb://127.0.0.1/micobiblio',
        app: {
            name: 'micobiblio'
        }
    },
    production: {
        db: 'mongodb://<username>:<password>@ds157325.mlab.com:57325/micobiblio-prod',
        app: {
            name: 'micobiblio'
        }
    }
};
