import { gql } from "@apollo/client";

export const EPISODES_QUERY = gql`
query {
    episodes {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        id
        episode
      }
    } 
  }
`;

