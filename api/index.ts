import express, { NextFunction,Response,Request } from 'express';
const port=3000;
const app=express();
import router from "./userRoute";
import expense from './expenseRoute';
import cors from 'cors';
import helmet from 'helmet';

app.use(cors());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
      reportOnly: true, // Set to 'true' to enable report-only mode for testing
    })
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.use('/api/v1/user',router);
app.use('/api/v1/expense',expense);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})


	

