import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      email
      username
      confirmed
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        email
        username
        confirmed
      }
    }
  }
`;
