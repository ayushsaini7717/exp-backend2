import express from 'express';
import { Response,Request,NextFunction } from "express";

const app = express();

// CSP Middleware
const setCSPHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self' https://vercel.live"
  );
  next();
};


export default setCSPHeaders
