import { gql } from "@apollo/client";

export const GET_INVESTORS = gql`
  query MyQuery($where: investor_bool_exp, $limit: Int!, $offset: Int!) {
    investor(where: $where, limit: $limit, offset: $offset) {
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

    investor_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_INVESTOR = gql`
  query MyQuery($id: Int!) {
    investor_by_pk(id: $id) {
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
