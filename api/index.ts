import express, { NextFunction,Response,Request } from 'express';
const port=3000;
const app=express();
import router from "../Routes/userRoute";
import expense from '../Routes/expenseRoute';
import cors from 'cors';


import bodyParser from 'body-parser';
import path from 'path';


app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self' https://vercel.live; img-src 'self'  https://expense-backend-xpxu.vercel.app;");
  next();
});






app.use('/api/v1/user',router);
app.use('/api/v1/expense',expense);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})


	

