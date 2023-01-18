import type { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import { promises as fs } from 'fs';

type Data = string

export default async function handler(req: NextApiRequest,
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