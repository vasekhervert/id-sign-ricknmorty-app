import type { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import { promises as fs } from 'fs';

type Data = string

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    
    const { id } = req.query;
  
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  const filePath = jsonDirectory + `/episode-${id}.json`;
  try {
    console.log('hello');
    const fileContents = await fs.readFile(filePath, 'utf8');
    res.status(200).json(fileContents);
  } catch(error) {
    res.status(500).json('{"error": "No such file."}');
  }  
}