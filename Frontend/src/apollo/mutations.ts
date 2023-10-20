import { gql } from '@apollo/client';

export const SIGNIN = gql`
    mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
            token
            user {
                password
                role
                username
                profile {
                    bio
                    firstName
                    lastName
                    phoneNumber
                    picture
                }
            }
        }
    }
`;

export const SIGNUP = gql`
    mutation Mutation($input: SignUpInput!) {
        signUp(input: $input) {
            token
            user {
                username
                email
                id
            }
        }
    }
`;

export const SIGNOUT = gql`
    mutation Mutation {
        signOut
    }
`;
export const CREATESTORE = gql`
    mutation Mutation($store: StoreCreateInput!) {
        createStore(store: $store) {
            description
            logo
            name
            ownerId
            updatedAt
            createdAt
            address {
                city
                country
                id
                phoneNumber
                postalCode
                state
                street
            }
            totalSales
        }
    }
`;

export const CREATEPRODUCT = gql`
    mutation ProductCreate($input: ProductCreateInput!) {
        productCreate(input: $input) {
            product {
                name
                Manufacturer
                categories {
                    name
                    id
                }
                code
                colors {
                    availability
                    name
                    price
                    value
                    description
                }
                createdAt
                createdBy {
                    name
                }
                description
                discount
                features
                id
                images
                isArchived
                isFeatured
                price
                sizes {
                    availability
                    description
                    name
                    value
                }
                stock
                storeId
                tags
            }
        }
    }
`;
