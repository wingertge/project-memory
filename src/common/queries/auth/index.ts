import gql from "graphql-tag"

const getProfile = gql`
    query GetProfile($sub: ID) {
        user(sub: $sub) {
            sub
            username
            email
            name
            picture
            identities {
                isSocial,
                provider
            }
            languages {
                id
                languageCode
                name
                nativeName
            }
        }
    }
`

export {getProfile}
