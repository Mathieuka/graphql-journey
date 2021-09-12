import { ApolloServer, gql } from 'apollo-server';

const { build, fake } = require('@jackfranklin/test-data-bot');

const postBuilder = build('Post', {
  fields: {
    id: fake((f) => f.random.uuid()),
    title: fake((f) => f.random.word()),
    body: fake((f) => f.random.words()),
    published: fake((f) => f.random.boolean()),
  },
});

const post = postBuilder();
const posts = Array.from({ length: 6 }).map((v) => postBuilder());

const typeDefs = gql`
    type Query {
        me: User!
        post: Post!
        posts: [Post!]!
    }
    
    type Post {
      id: ID!
      title: String!
      body: String!
      published: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }
`;

const resolvers = {
  Query: {
    me: () => ({
      id: '12LI1',
      name: 'Doe',
      email: 'bla@gmail.com',
      age: 14,
    }),
    post: () => post,
    posts: () => posts,

  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
