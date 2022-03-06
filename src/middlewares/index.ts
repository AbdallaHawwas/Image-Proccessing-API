import { NextFunction, Request, Response } from 'express'
import { getImagePath } from './../utilities/'
import { existsSync } from 'fs'

const validateParams = (req: Request, res: Response, next: NextFunction) => {
  const { width, height, filename } = req.query
  const messages:string[] = [];
// check Filename
  if (
    !existsSync(getImagePath(filename as string)) || !filename
  ) {
    messages.push('You Must Enter Valid Filename');
  }
    // Check Width
  if(!Number(width) || !width ){
    messages.push('You Must Enter Valid Width Number');
  }
   // Check height
   if(!Number(height) || !height ){
    
    messages.push('You Must Enter Valid Height Number');
    
  }
  // Display errors
  if(messages.length > 0){
    res.status(404).json({
      code: 404,
      message: messages.join(","),
    })
  } else {
    next()
  }
  
}

export { validateParams }
