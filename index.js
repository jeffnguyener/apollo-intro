const books = [
    {id: 0, title: 'The Hobbit', authorID: 0},
    {id: 1, title: 'Harry Potter and Prisoner of Azkaban', authorID: 1},
    {id: 2, title: 'Harry Potter and the Socerers Stone', authorID: 1},
    {id: 3, title: 'Go Dog Go', authorID: 2}
]

const authors = [
    {name: 'JRR Tolkien', id: 0},
    {name: 'JK Rowling', id:1},
    {name: 'PD Eastman', id: 2}
]

const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')
const app = express()

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Author {
        name: String
        books: [Book]
    }

    type Query {
        getBooks: [Book]
        getAuthors: [Author]
    }
`
const resolvers = {
    Query: {
        getBooks: () => books,
        getAuthors: () => authors
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({app, path: '/graphql'})
const PORT = 3333
app.listen(PORT, () => console.log(`Running on ${PORT}/graphql`))