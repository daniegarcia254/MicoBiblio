const GraphQLEnumType = require('graphql').GraphQLEnumType;

exports.treeType = new GraphQLEnumType({
    name: 'tree',
    values: {
      ENCINA: { value: 0 },
      HAYA: { value: 1 },
      PINO: { value: 2 },
      ROBLE: { value: 3 }
    }
});