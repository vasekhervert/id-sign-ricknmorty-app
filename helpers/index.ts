import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import { EPISODES_QUERY } from "../queries";

export async function getAllEpisodes() {
  const { data } = await client.query({
    query: EPISODES_QUERY,
  });   
  
  const episodes = data.episodes.results.map((i: object) => i) 

  return {...episodes};
}

export async function getAllEpisodesIds() {
  const { data } = await client.query({
    query: EPISODES_QUERY,
  });   
  //@ts-ignore
  const ids = data.episodes.results.map((i: object) => i.id)

  return ids;
}

export async function getSingleEpisode(id: string | string[] | undefined){
  const {data} = await client.query({
    query: gql`
    query {
      episode(id: ${id}) {
         name
        episode
        air_date
        characters {
          id
          name
          species
          image
          origin {
            name
          }
        }
      }      
    }
    `,
  });

  return data
}

export function makeSlug(string: string) {
  return string.replace('-', ' ').replace(/[^a-z\d\s]+/gi, "").split(' ').join('-').toLowerCase();
}