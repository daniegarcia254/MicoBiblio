const GraphQLEnumType = require('graphql').GraphQLEnumType;

exports.OrientationType = new GraphQLEnumType({
    name: 'orientation',
    values: {
        NORTE: { value: 'Norte' },
        ESTE: { value: 'Este' },
        SUR: { value: 'Sur' },
        OESTE: { value: 'Oeste' }
    }
});