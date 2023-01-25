import { gql } from "@apollo/client";
import { rejects } from "assert";
import client from "../lib/apollo-client";

export async function getEpisodesInfo() {
  const {data} = await client.query({
    query: gql`
      query {
        episodes {
          info {
            count
            pages
            next
            prev
          }
        }
      }
    `
  })

  return data.episodes.info;
}

export async function getEpisodesCount() {
  const { data } = await client.query({
    query: gql`
    query {episodes{
      info {
        count
      }
    }}
      
    `,
  });     

  return data.episodes.info.count;
}

export async function getAllEpisodes(page: number) {
  const { data } = await client.query({
    query: gql`query {
      episodes (page: ${page}) {
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
  `,
  });   
  
  

  return data;
}

export async function getAllEpisodesIds() {
  const count = await getEpisodesCount();
  return Array.from({ length: count }, (_, i) => (i + 1).toString()); 
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
          gender
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

// export function makeSlug(string: string) {
//   return string.replace('-', ' ').replace(/[^a-z\d\s]+/gi, "").split(' ').join('-').toLowerCase();
// }

// export function makeDate(input: number | string, locale: string) {
//   return new Date(input).toLocaleDateString(locale, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

// }

export async function postComment (
  id: string | string[] | undefined,
  revalPath: string,
  locales: string[] | undefined,
  defaultLocale: string | undefined,
  formData: {
    name?: string;
    email: string;
    message: string;
    publicationConsent: boolean;
    timestamp: number;
  }
)  {
  
  const { publicationConsent, ...restOfForm } = formData; // get rid of consent proprty, dont need it
  const requestBody = {...restOfForm, revalPath, locales, defaultLocale};
  
  const response = await fetch(`/api/comments?id=${id}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  if(!response.ok) {
    throw new Error('Error ocurred while adding comment.')
  } else {
    return response.json();
  }
  
  
  
};