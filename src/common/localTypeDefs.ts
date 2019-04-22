import gql from "graphql-tag"

export default gql`
    extend type Query {
        currentUserUUID: ID!
        now: ID!
    }
    
    extend type Mutation {
        updateNow: ID!
    }
`
