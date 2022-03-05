import express from 'express';
import * as fileHandle from '../../file-handle';


// Query Parameters
interface queryParams {
    filename?:string,
    width?:number,
    height?:number,
}

const validation = async(params :queryParams):Promise<string|void> =>{
      // Check if file is available
    if (!(await fileHandle.isImageAvailable(params.filename))) {
        const availableImageNames: string = ( await fileHandle.getImagesNames()).join(', ');
        fileHandle.errArray.push(`Please enter  filename . Available filenames are: ${availableImageNames}.`);
    }
        // Check if width & height is available
    if (!params.width && !params.height && !fileHandle.errArray.includes("You didn't Enter required Parameters")) {
        fileHandle.errArray.push(`You didn't Enter required Parameters Please Enter Width And Height`);
    }
        // Check for valid Params(width & height) value
    const width = params.width! ;
    const height = params.height! ;
    
    if(Number.isNaN(width) || width < 1 || Number.isNaN(height) || height < 1){
            fileHandle.errArray.push("Please add a positive number value for the 'width & height' parameters.");
    }
    
    return;

}

const imageApi:express.Router = express.Router();

imageApi.get('/',
    async(req:express.Request,res:express.Response): Promise<void>=>{
        let error : string | void = '';
        if (!(await fileHandle.isImageThumbAvailable(req.query))) {
            error = await fileHandle.resizeImgData(req.query);
            res.send(error);
            return;
        }
        if(await validation(req.query)){
           res.send(validation(req.query)) 
        }
        // Display Errors 
        if(fileHandle.errArray.length > 0){
            res.send(fileHandle.errArray.join("<br>"))
            return;
        }
        // Return Image Path
        const imgPath = await fileHandle.getImgPath(req.query);
        if (imgPath) {
            res.sendFile(imgPath);
          } else {
            res.send('Path Is in correct .. Please try again');
          }
    }
);
export default imageApi;
