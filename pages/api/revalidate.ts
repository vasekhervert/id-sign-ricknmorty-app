import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  error?: string;
  message?: string;
  revalidated?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const revalidatePath = req.query.path === undefined ? '' : Array.isArray(req.query.path) ? req.query.path[0]  : req.query.path;
    
      if (req.query.secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({
          message: 'Invalid token',
        })
      }      
    
      try {
        await res.revalidate(revalidatePath)
        return res.json({
          revalidated: true,
        })
      } catch (err) {
        console.log('zer iz ej err')
        return res.status(500).send({error: 'Error revalidating'})
      }
}
