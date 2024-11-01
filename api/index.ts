import express, { NextFunction,Response,Request } from 'express';
const port=3000;
const app=express();
import router from "../Routes/userRoute";
import expense from '../Routes/expenseRoute';
import cors from 'cors';


import bodyParser from 'body-parser';
import path from 'path';


app.use(cors());

const cspMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src-elem 'self' https://trusted-cdn.com"
  );
  next();
};

// Apply the CSP middleware
app.use(cspMiddleware);


app.use('/api/v1/user',router);
app.use('/api/v1/expense',expense);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})


	

