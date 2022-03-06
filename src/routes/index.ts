import { Router, Request, Response } from 'express'
import { validateParams } from '../middlewares'
import { resize, getImagePath } from '../utilities'
import { promises, existsSync } from 'fs'

const router = Router()

interface Params {
  filename: string
  width: number
  height: number
}

router.get('/convert', validateParams, async (req: Request, res: Response) => {
  const { width, height, filename } = req.query as unknown as Params
  const input = getImagePath(filename as string)
  const output = getImagePath(`thumbnails/${width}-${height}-${filename}`)

  if (existsSync(output)) {
     res.status(200).sendFile(output)
  } else {
    resize(input, { width: +width, height: +height }).then(async (data) => {
        await promises.writeFile(output, data);
         res.status(200).sendFile(output);
        
    }).catch((err :string)=>{
       res.status(404).json({
        code: 404,
        message: `Can't resize This file : ${err}`,
      });
      
    });
  }
})

export default router