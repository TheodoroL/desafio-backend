import {Sequelize} from 'sequelize'; 
import { Url } from './Model/Url';
import dotenv from 'dotenv'; 
dotenv.config({path:'./src/.env'}); 

export const db = new Sequelize(process.env.DATABASE||"", {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
    ,logging:false
});

export async function init(){
    try{
        await db.authenticate(); 
        console.log('banco de dados on'); 
        Url.sync({
            force:true
        });
        console.log("tabela criada com sucesso :)") ; 
     }catch(e){
        console.error(e); 
     }
}