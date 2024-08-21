import Router from "express";
import {urlGerada, encurtar} from '../controllers/controllers'; 
export const routers = Router(); 
routers.get("/:urlGerada", urlGerada); 
routers.post("/encurtar", encurtar); 