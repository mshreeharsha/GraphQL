
export const typeDefs = `#graphql
    type User{
        id: ID!,
        name: String!,
        username: String!
        age: Int!,
        nationality: NationalityCheck!

        friends: [User!],
        favouriteMovies: [Movie!]
    }

    type Movie{
        id: ID!,
        title: String!,
        yearOfRelease: Int!,
        inTheaters: Boolean!,
        languages: [String!]!
    }
    
    type Query{
        users: [User],
        user(id : ID!): User,

        movies: [Movie]
        movie(title: String!):Movie
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

        addNewMovie(newMovie: NewMovieType!): Movie,
        updateMovie(updateMovie : UpdateMovieType!, name: String!) : [Movie]
        deleteMovie(name: String!) : [Movie]
    }

    input NewUserType{
        name:String!,
        username:String!,
        age: Int!,
        nationality: NationalityCheck!
    }
    input UpdateUserType{
        name:String,
        username: String,
        age:Int,
        Nationality: NationalityCheck
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