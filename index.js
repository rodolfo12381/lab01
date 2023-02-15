const { GraphQLClient } = require('graphql-request');
const endpoint = 'https://api.github.com/graphql';
const token = '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';
const express = require('express');
const app = express();

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const query = `
  query {
    search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 100) {
      edges {
        node {
          ... on Repository {
            name
            url
            pullRequests {
              totalCount
            }
          }
        }
      }
    }
  }
`;


app.get('/',(req,res) => {
  graphQLClient.request(query).then((data) => {
    res.json(JSON.stringify(data))
  });
})

app.listen('8080',()=>{
  console.log('Servidor Rodando !')
})