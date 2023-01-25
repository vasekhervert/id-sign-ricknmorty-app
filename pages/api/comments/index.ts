import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs  from 'fs';

type Data = string

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

      const {id} = req.query;
      const {revalPath, locales, defaultLocale, ...restOfBody} = req.body;
      const content =  {...restOfBody};
      const uid = content.timestamp; // use comment's timetamp as an UID
      const dir = 'comments'
      let error: unknown = null;
      
      if(!fs.existsSync(dir)) {
        error = `Error: Directory '${dir}' doesn't exist.`;
      } else {
        const filePath = `${dir}/episode-${id}.json`;
        
        const revalidatePageCache = () => {
          // revalidate default lang or just revalidate when no locales provided
          fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=${revalPath}`);
          if(locales) { // if locales is not undefined, filter out defaultLocale and revalidate all locales
            const filteredLocales = locales.filter((i: string) => i !== defaultLocale);
            filteredLocales.forEach((locale: string) => fetch(`${process.env.BASE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=/${locale}${revalPath}`));
          }          
        }
        
        const writeComment = (content: object) => {
          fs.writeFile(filePath, JSON.stringify(content), (err) => {
            if(err) {
              console.log(err);
              error = err;
            }
            else {
              revalidatePageCache();               
            }
          });
        }
      
        if (fs.existsSync(filePath)) { // check if there is a comments file for this episode
          const prevFileContents = fs.readFileSync(filePath, "utf8"); // if is, read its content
          const parsedPrevFileContents = JSON.parse(prevFileContents); // parse it           
          const newFileContents = {[uid]:{...content}, ...parsedPrevFileContents}; // create a new content object and write it in the file.
          writeComment(newFileContents);          
        } 
        else {
           // if there is not a comments file for this episode, just write the comment in a new file.
          writeComment({[uid]: {...content}});
        }

      }


      if(error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error))
      } else {
        res.status(200).json('{"message": "Comment added."}')
      }
}