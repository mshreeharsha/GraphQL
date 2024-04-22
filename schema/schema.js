
export const typeDefs = `#graphql
    type User{
        id: ID!,
        name: String!,
        username: String!
        age: Int!,
        nationality: NationalityCheck!
        
        friends: [User!]
    }

    type Query{
        users: [User]
        user(id : ID!): User
    }

    enum NationalityCheck{
        INDIA
        AUSTRALIA
        JAMICA
    }
`