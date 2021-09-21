/* eslint-disable */
const { print, isSpecifiedScalarType, isSpecifiedDirective } = require('graphql');
const { gql } = require('apollo-server-express');

const printSchemaWithDirectives = (schema) => {
  const str = Object.keys(schema.getTypeMap())
    .filter((k) => !k.match(/^__/))
    .reduce((accum, name) => {
      const type = schema.getType(name);
      return !isSpecifiedScalarType(type) ? accum + `${print(type.astNode)}\n` : accum;
    }, '');

  return schema
    .getDirectives()
    .reduce(
      (accum, d) => (!isSpecifiedDirective(d) ? accum + `${print(d.astNode)}\n` : accum),
      str + `${print(schema.astNode)}\n`,
    );
};

// This utils allows reexporting the whole schema (after merge) in destination file
const plugin = (schema) => {
  const schemaString = printSchemaWithDirectives(schema);
  const doc = gql(schemaString);

  return `export default ${JSON.stringify(doc)} as any as import('graphql').DocumentNode`;
};

module.exports = { plugin };
