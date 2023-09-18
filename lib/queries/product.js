import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products {
    products {
      data {
        id
        attributes {
          name
          description
          price
        }
      }
    }
  }
`;
