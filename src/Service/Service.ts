import { Op } from "sequelize";
import { Url } from "../Model/Url";

export class Service{

    public async createUrl(urlOriginal: string){
         if(!urlOriginal){
            throw new Error("url invalida"); 
         }
         const tempoEntrada= new Date(); 
         const tempoEsgotado = new Date(tempoEntrada.getTime()+2*60*1000); 
         const urlShort = `http://localhost:8080/${this.gerarValue()}`; 
         const myUrl =  await Url.create({
            urlOriginal, 
            urlShort, 
            tempoEntrada, 
            tempoEsgotado
         });
         return  myUrl.get('urlShort'); 
    }
    
     public async getUrl(urlShort: string){
        const urlOriginal = await Url.findOne({
            where:{
                urlShort: urlShort
            }
        }); 
        if(urlOriginal === null){
            throw new Error("url invalida"); 
             
        }else{
            return  urlOriginal.get('urlOriginal'); 
        }

    }

    public async deleteUrl(){
        const nowDate = new Date(); 
        try{
             await Url.destroy({
                where:{
                    tempoEsgotado:{
                        [Op.lte]: nowDate
    
                    }
                }
            }); 

        }catch(e){
            console.error(e); 
        }
    }


    private gerarValue():string{
        let value:string = "";
        const tamanho = Math.floor(Math.random()*(10-5)+5); 
        console.log(tamanho);          
        while (value.length < tamanho) {
         let alfanumeric:string ="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"; 

            let randomIndex = Math.floor(Math.random() * alfanumeric.length);
            let char = alfanumeric[randomIndex];

            if (!value.includes(char)) {
                value += char;
            }
        }
        return value; 
    }
}   