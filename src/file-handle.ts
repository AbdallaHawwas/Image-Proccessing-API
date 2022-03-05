import { promises as fs  } from "fs";
import path from 'path' ;
import  resizeImg from './img-process';

const errArray : string[] = [];
// Query Parameters
interface queryParams {
    filename?:string,
    width?:number,
    height?:number,
}
// Images Path
const imgPath = path.resolve(__dirname,'..','assets');
const imgThumbPath = path.resolve(__dirname,'..','assets/thumbnails');

console.log(imgPath + '<br>' +imgThumbPath);

// ===== Functions =====

    // Get Image Path
    const getImgPath = async(params:queryParams) : Promise<void|string>=>{  
    // Check filename existing
    if(!params.filename){ 
        errArray.push("You didn't Enter Filename");
    }

    // Create Path 
    const imagePath  = ((params.width && params.height) ? 
                 path.resolve(imgThumbPath,`${params.filename}-${params.width}x${params.height}.jpg`)  
                : path.resolve(imgPath, `${params.filename}.jpg`)
    );            
    
    // Check created path existance
    try {
        await fs.access(imagePath);
        return imagePath;
      } catch {
        return "sorry path not found";
      }
    }

    // Check Image Existance
    const isImageAvailable = async(filename : string = ''): Promise<boolean | void> =>{
            // Check filename existing
        if(!filename){ 
            errArray.push("You didn't Enter Filename");
            return false;
        }

        return (await getImagesNames()).includes(filename);
    }

    // Check Image Thumbnail Existance
    const isImageThumbAvailable = async(params:queryParams): Promise<boolean | void> =>{
        if (!params.filename || !params.width || !params.height) {
            errArray.push("You didn't Enter required Parameters for image thumbnail");
            return false;
          }
        
          try {
            await fs.access(path.resolve(imgThumbPath,`${params.filename}-${params.width}x${params.height}.jpg`));
            return true;
          } catch {
            errArray.push("Thumbnails Doesn't exist");
            return false;
          }
    }
    // Get Images Names
    const getImagesNames = async():  Promise<string[]> =>{
        try {
            return (await fs.readdir(imgPath)).map(
              (filename: string): string => filename.split('.')[0]
            );
          } catch {
            return [];
          }
    }
    // Create Thumbnails Path 
    const createThumbPath = async(): Promise<void> =>{
        try {
          await fs.access(imgThumbPath);
        } catch {
          fs.mkdir(imgThumbPath);
        }
      }
    // send data of resizing image
    const resizeImgData = async(params : queryParams): Promise<string|void> =>{
        // Check Params
        if (!params.filename || !params.width || !params.height) {
            if(!errArray.includes("You didn't Enter required Parameters")){
                errArray.push("You didn't Enter required Parameters");
            }
        }

        const input: string = path.resolve(imgPath,`${params.filename}.jpg`);
        const output: string = path.resolve(imgThumbPath,`${params.filename}-${params.width}x${params.height}.jpg`);  
        
        return await resizeImg({
            input: input,
            output: output,
            width: params.width !,
            height: params.height!
          });
    }
    export {resizeImgData , isImageAvailable,createThumbPath ,isImageThumbAvailable, getImagesNames,getImgPath,errArray} ;
    
