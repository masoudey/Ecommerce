import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query Products($skip: Int, $take: Int, $where: FilterInput) {
        productSearch(skip: $skip, take: $take, where: $where) {
            products {
                Manufacturer
                categories {
                    name
                    id
                }
                code
                colors {
                    availability
                    createdAt
                    description
                    name
                    price
                    value
                    updatedAt
                    id
                    imageUrl
                }
                createdAt
                createdBy {
                    name
                    id
                    logo
                }
                description
                discount
                features
                eventId
                id
                images
                isArchived
                isFeatured
                name
                price
                reviews {
                    body
                    date
                    id
                    rate
                    userId
                    user {
                        username
                    }
                }
                salesCount
                sizes {
                    availability
                    createdAt
                    id
                    description
                    name
                    price
                    updatedAt
                    value
                }
                stock
                storeId
                tags
                updatedAt
            }
            tottal
        }
    }
`;

export const PRODUCT = gql`
    query Product($productId: ID!) {
        product(id: $productId) {
            Manufacturer
            categories {
                name
                id
            }
            code
            colors {
                availability
                createdAt
                description
                id
                imageUrl
                name
                price
                updatedAt
                value
            }
            createdAt
            createdBy {
                ownerId
                name
                logo
            }
            description
            images
            isFeatured
            isArchived
            name
            price
            discount
            features
            id
            reviews {
                body
                rate
                date
                user {
                    username
                }
                userId
            }
            salesCount
            stock
            storeId
            tags
            updatedAt
            sizes {
                availability
                description
                name
                price
                updatedAt
                value
                id
                createdAt
            }
        }
    }
`;
