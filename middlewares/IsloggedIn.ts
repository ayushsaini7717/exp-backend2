import { Response,Request,NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'


export const IsloggedIn=(async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const body=req.body;
        const verify=jwt.verify(body.jwt,'ayush-secret');
        if(verify){
            next();
        }else{
            return res.send('Logging out');
        }
    }catch(error){
        console.log(res.send("error is "+error));
    }
})
export default IsloggedIn

