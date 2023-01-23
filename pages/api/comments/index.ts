import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs  from 'fs';

type Data = string

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

      const {id} = req.query;
      const {revalPath, locales, defaultLocale, ...restOfBody} = req.body;
      const content =  {...restOfBody};
      const uid = content.timestamp; // use comment's timetamp as an UID
      
      const filePath = `json/episode-${id}.json`;
      const revalidatePageCache = () => {
        // revalidate default lang or just revalidate when no locales provided
        fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=${revalPath}`);
        if(locales) { // if locales is not undefined, filter out defaultLocale and revalidate all locales
          const filteredLocales = locales.filter((i: string) => i !== defaultLocale);
          filteredLocales.forEach((locale: string) => fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=/${locale}${revalPath}`));
        }          
      }

      try{
        if (fs.existsSync(filePath)) { // check if there is a comments file for this episode
          
          const prevFileContents = fs.readFileSync(filePath, "utf8"); // if is, read its content
          const parsedPrevFileContents = JSON.parse(prevFileContents); // parse it           
          const newFileContents = {[uid]:{...content}, ...parsedPrevFileContents}; // create a new content object, 
                      
          fs.writeFile(filePath, JSON.stringify(newFileContents), revalidatePageCache);  
        } else {
          
          fs.writeFile(filePath, JSON.stringify({[uid]: {...content}}), revalidatePageCache);  
        }
        
        res.status(200).send('Success')
      } catch(err) {
        res.status(500).send('An error occured.')
      }

    }