import{Request, Response} from 'express'; 
import { Service } from '../Service/Service';

const myDb = new Service(); 

export const urlGerada= async(req: Request, res:Response)=>{
    const {urlGerada} = req.params; 
    try {
       const urlReal = await myDb.getUrl(`${req.protocol}://${req.get('host')}/${urlGerada}`);
       
       if (!urlReal) {
         console.error("URL encurtada não encontrada");
         res.status(404).send({ error: "URL encurtada não encontrada" });
       }
       
       res.redirect(`${urlReal}`);
    }catch(e){
          res.status(404).send({error:"não foi possivel encontrar essa url"}); 
       } 
}

export const encurtar = async (req: Request, res: Response)=>{
    const {url} = req.body; 
    if(!url){
        res.status(400).send('url invalida'); 
     }
     const value = await myDb.createUrl(url); 
     res.status(201).json({ urlGerada: value});   
}; 