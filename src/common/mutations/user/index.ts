import gql from "graphql-tag"

const login = gql`
    mutation Login($authorizationCode: ID!) {
        authenticate(code: $authorizationCode) {
            accessToken
            expiresIn
        }
    }
`

const updateProfile = gql`
    mutation UpdateProfile($sub: ID!, $profile: UserInput!) {
        editUser(sub: $sub, input: $profile) {
            sub
        }
    }
`

export {updateProfile, login}
