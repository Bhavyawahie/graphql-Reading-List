const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList} = graphql

//Dummy Data of books

const books = [
    {name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1"},
    {name: "The Final empire", genre: "Fantasy", id: "2", authorId: "2"},
    {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"},
    {name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2"},
    {name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3"},
    {name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3"},
] 

// Dummy Data of Authors

const authors =[
    {name: "Patrick Rothfuss", age: 44, id: "1"},
    {name: "Brandon Sanderson", age: 42, id: "2"},
    {name: "Terry Pratchett", age: 66, id: "3"},
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books.filter(book => parent.id === book.authorId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return books.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return authors.find(author => author.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})


// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: {type: GraphQLString},
//         name: {type: GraphQLString},
//         genre: {type: GraphQLString}
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: {id: {type: GraphQLString}},
//             resolve(parent, args){
//                 return books.find(book => args.id === book.id)
//             }
//         }
//     }
// })


// module.exports = new GraphQLSchema({
//     query: RootQuery
// })



