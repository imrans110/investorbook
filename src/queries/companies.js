import { gql } from "@apollo/client";

export const GET_Companies = gql`
  query MyQuery($where: company_bool_exp, $limit: Int!, $offset: Int!) {
    company(where: $where, limit: $limit, offset: $offset) {
      name
      id
      investments {
        investor {
          name
        }
      }
    }
    company_aggregate(where: $where) {
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

export const ADD_Company = gql`
  mutation MyMutation($name: String!) {
    insert_company_one(object: { name: $name }) {
      id
      name
    }
  }
`;
