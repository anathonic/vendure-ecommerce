import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
      totalItems
      items {
        id
        name
        description
        slug
        variants {
          id
          name
          priceWithTax
          sku
          stockLevel
        }
        featuredAsset {
          id
          preview
        }
        assets {
          id
          preview
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
        id
        name
        description
        slug
        variants {
          id
          name
          priceWithTax
          sku
          stockLevel
        }
        featuredAsset {
          id
          preview
        }
        assets {
          id
          preview
        }
    }
  }
`;