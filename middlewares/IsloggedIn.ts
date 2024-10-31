import { Response,Request,NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'


import express from 'express';


const app = express();

// CSP Middleware
const setCSPHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self' https://vercel.live"
  );
  next();
};

// Attach CSP middleware
app.use(setCSPHeaders);



export const IsloggedIn=(async (req:Request,res:Response,next:NextFunction)=>{
    try{
        let token:string=req.headers.authorization ?? "";
        token = token.split(" ")[1];
        const verify=jwt.verify(token,'ayush-secret');
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

