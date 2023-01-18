import type { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import { promises as fs } from 'fs';

type Data = string

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

      switch (req.method) {
        case 'GET':
          await getComments(req, res);
          break;
        case 'POST':
          await addComment(req, res);
          break;
        default:
          res.status(405).send(`Method ${req.method} not allowed.`);
          break;
      }
    }
    
      

async function getComments(req: NextApiRequest,
      res: NextApiResponse<Data>) {

  const { id } = req.query;

  const jsonDirectory = path.join(process.cwd(), 'json');
  const filePath = jsonDirectory + `/episode-${id}.json`;
    
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    res.status(200).json(fileContents);
  } catch(error) {
    res.status(500).send('Source file not found.'); // no such file, send back empty object
  } 
}

async function addComment(req: NextApiRequest,
      res: NextApiResponse<Data>) {

        const {id} = req.query;
        const {revalPath, ...restOfBody} = req.body;
        const content = JSON.stringify({comment: {...restOfBody}});
        
        const jsonDirectory = path.join(process.cwd(), 'json');
        const filePath = jsonDirectory + `/episode-${id}.json`;

        try{
          fs.writeFile(filePath, content); // je potreba nejdrive precist obsah toho file (existuje-li) a pridat k nemu novy comment
          const reval = fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=${revalPath}`)
          res.status(200).send('Success')
        } catch(err) {
          res.status(500).send('An error occured.')
        }
}