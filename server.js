const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const morgan = require('morgan')
const colors = require('colors')

const app = express()
app.use(morgan('dev'))
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(3000, () => {
    console.log("Server started running at http://localhost:3000".green.inverse)
})