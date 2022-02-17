const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const morgan = require('morgan')
const colors = require('colors')
const path = require('path')
const dotenv = require('dotenv')
const schema = require('./schema/schema')
const connectDb = require('./config/db')

dotenv.config({path: './.env'})
connectDb()
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(3000, () => {
    console.log("Server started running at http://localhost:3000".yellow.inverse)
})