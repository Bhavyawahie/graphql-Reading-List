const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList} = graphql
const Book = require('../models/bookModel')
const Author = require('../models/authorModel')
//Dummy Data of books

// const books = [
//     {name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1"},
//     {name: "The Final empire", genre: "Fantasy", id: "2", authorId: "2"},
//     {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"},
//     {name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2"},
//     {name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3"},
//     {name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3"},
// ] 

// // Dummy Data of Authors

// const authors =[
//     {name: "Patrick Rothfuss", age: 44, id: "1"},
//     {name: "Brandon Sanderson", age: 42, id: "2"},
//     {name: "Terry Pratchett", age: 66, id: "3"},
// ]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                const author = await Author.findOne({_id: parent.authorId})
                return author
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
            async resolve(parent, args){
                const books = await Book.find({authorId: parent.id})
                return books
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
            async resolve(parent, args){
                const book = await Book.findById(args.id)
                return book
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                const author = await Author.findById(args.id)
                return author
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                return await Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args){
                return await Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            async resolve(parent, args){
                const author = new Author({
                    name: args.name,
                    age: args.age
                })
                return await author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID},
            },
            async resolve(parent, args){
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return await book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
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



