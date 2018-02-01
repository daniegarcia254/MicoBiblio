const GraphQLEnumType = require('graphql').GraphQLEnumType;

exports.orientationType = new GraphQLEnumType({
    name: 'orientation',
    values: {
        NORTE: { value: 0 },
        ESTE: { value: 1 },
        SUR: { value: 2 },
        OESTE: { value: 3 }
    }
});