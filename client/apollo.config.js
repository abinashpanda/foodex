module.exports = {
  client: {
    excludes: ['**/*.old/**'],
    service: {
      name: 'graphql-dev',
      url: 'http://localhost:1337/graphql',
    },
  },
}
