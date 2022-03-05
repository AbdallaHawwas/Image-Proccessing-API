import sharp from "sharp";

// resize Parameters
interface resizeParams {
    input:string,
    output: string;
    width: number | string;
    height: number | string;
}

const resizeImg = async (params : resizeParams) : Promise<void | string> =>{
    try{
        await sharp(params.input)
        .resize(parseInt(params.width as string)as number, parseInt(params.height as string) as number)
        .toFormat('jpeg')
        .toFile(params.output);
      return ; 
    }catch{
        return "Error Resizing Images :(";
    }
}

export default resizeImg;