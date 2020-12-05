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
