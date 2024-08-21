import { DataTypes } from "sequelize";
import { db } from "../sequelize.config";

export const Url = db.define('Url', {
    id:{
        type : DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    }, 
    urlOriginal:{
        type : DataTypes.STRING, 
        allowNull : false
    }, 
    urlShort:{
        type : DataTypes.STRING, 
        allowNull : false, 
        unique : true
    }, 
    tempoEntrada:{
        type : DataTypes.DATE
    }, 
    tempoEsgotado: {
        type: DataTypes.DATE
    }
},  {
    tableName: 'encurta-ai'
}); 