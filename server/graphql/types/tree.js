const GraphQLEnumType = require('graphql').GraphQLEnumType;

exports.TreeType = new GraphQLEnumType({
    name: 'tree',
    values: {
      PINO: { value: "Pino" },
      HAYA: { value: "Haya" },
      ENCINA: { value: "Encina" },
      ROBLE: { value: "Roble" }
    }
});