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
  const ids = data.episodes.results.map((i: object) => i.id) // jak nadefinovat ten tajp i.id tady?

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

export function makeDateAndTime(timestamp: number) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  
  return date.toLocaleDateString('en-US', options) // 

}

export async function postComment (
  id: string | string[] | undefined,
  formData: {
    name?: string;
    email: string;
    message: string;
    publicationConsent: boolean;
  }
)  {
  const timestamp = Date.now();
  const { publicationConsent, ...restOfForm } = formData; // get rid of consent proprty, dont need it
  const requestBody = {...restOfForm, timestamp};
  
  const response = await fetch(`/api/comments?id=${id}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  console.log(process.env.BASE_URL);
  
  return response.json();
};