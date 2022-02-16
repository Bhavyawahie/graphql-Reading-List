const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const morgan = require('morgan')
const colors = require('colors')
const schema = require('./schema/schema')
app.use(morgan('dev'))
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(3000, () => {
    console.log("Server started running at http://localhost:3000".green.inverse)
})