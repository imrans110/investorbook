import { gql } from "@apollo/client";

export const GET_INVESTORS = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    investor(limit: $limit, offset: $offset) {
      name
      id
      photo_thumbnail
      investments {
        company {
          name
          id
        }
      }
    }

    investor_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_INVESTOR = gql`
  query MyQuery($id: Int!) {
    investor(where: { id: { _eq: $id } }) {
      name
      photo_large
      id
      investments {
        amount
        company {
          name
          id
        }
      }
      investments_aggregate {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;
