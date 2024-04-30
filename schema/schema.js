
export const typeDefs = `#graphql
    type User{
        _id: ID!,
        name: String!,
        username: String!
        age: Int!,
        nationality: NationalityCheck!

        friends: [User!],
        favouriteMovies: [Movie!]
    }

    type Movie{
        _id: ID!,
        title: String!,
        yearOfRelease: Int!,
        inTheaters: Boolean!,
        languages: [String!]!
    }
    
    type Query{
        users: [User],
        user(id : ID!): User,

        movies: [Movie]
        movie(id: ID!):Movie
    }

    enum NationalityCheck{
        INDIA
        AUSTRALIA
        JAMICA
    }

    type Mutation{
        addNewUser(newUser : NewUserType!):[User],
        updateUser(id: ID!,updateUser : UpdateUserType!) : User
        deleteUser(id: ID!) : [User]

        addNewMovie(newMovie: NewMovieType!): [Movie],
        updateMovie(updateMovie : UpdateMovieType!, id: ID!) : Movie
        deleteMovie(id: ID!) : [Movie]
    }

    input NewUserType{
        name:String!,
        username:String!,
        age: Int!,
        nationality: String! = INDIA #Default Value
        friends:[ID!],
        favouriteMovies:[ID!]
    }
    input UpdateUserType{
        name:String,
        username: String,
        age:Int,
        Nationality: NationalityCheck,
        friends:[ID!],
        favouriteMovies:[ID!]
    }

    input NewMovieType{
        title: String!,
        yearOfRelease: Int!,
        inTheaters: Boolean!,
        languages: [String!]!

    }
    input UpdateMovieType{
        title: String,
        yearOfRelease: Int,
        inTheaters: Boolean,
        languages: [String!]
    }
`