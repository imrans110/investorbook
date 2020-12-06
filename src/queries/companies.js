import { gql } from "@apollo/client";

export const GET_Companies = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    company(limit: $limit, offset: $offset) {
      name
      id
      investments {
        investor {
          name
        }
      }
    }
    company_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_Companies_Lite = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    company(limit: $limit, offset: $offset) {
      name
      id
    }
  }
`;
