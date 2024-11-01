import express from 'express';
import { Response , Request} from 'express';
const expense = express.Router();
expense.use(express.json());
import IsloggedIn from '../middlewares/IsloggedIn';
import { PrismaClient } from '@prisma/client';
import exp from 'constants';

const prisma = new PrismaClient();



expense.post('/transaction',IsloggedIn,async (req:Request,res: Response)=>{
    const body=req.body;
    let Id:any="";
    try{
        const User=await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        Id=User?.id;
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }

    try{
        const income=await prisma.user.findFirst({
            where:{
                id: Id
            }
        })
        let monthlyBudget:any=income?.monthlyBudget;
        if(monthlyBudget < body.spend){
            return res.send("Spend money is greater than monthly budget");
        }
        const expense=await prisma.expense.create({
            data:{
                categories: body.categories,
                spend: body.spend,
                date: body.date,
                month: body.month,
                year: body.year,
                user: {
                    connect: {id : Id}
                }
            }
        })
        return res.send("Done!");
    }catch(error){
        console.log(error);
        return res.send("Can't make this transaction, Something went wrong");
    }
})

expense.post('/totalincome',IsloggedIn,async (req: Request,res: Response)=>{
    const body=req.body;
    let Id:any="";
    try{
        const User=await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            },select:{
                monthlyBudget: true
            }
        })
        return res.json({
            monthlyBudget: User?.monthlyBudget
        })
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }

  
})

expense.post('/totalexpense',IsloggedIn,async (req:Request,res:Response)=>{
    const body=req.body;
    let totalexpense=0;
    let Id:any="";
    try{
        const User=await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        Id=User?.id;
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }
    const date=new Date();
    const currmonth=date.getMonth()+1;
    // console.log(currmonth);
    const Expense=await prisma.expense.findMany({
        where: {
            userId: Id,
            month: currmonth
        }
    })

    for(let i=0;i<Expense.length;i++){
        totalexpense+=Expense[i].spend;
    }
    return res.json({
        "totalexpense": totalexpense
    })
})

expense.post('/monthlyexpense',IsloggedIn,async (req,res)=>{
    const body=req.body;
    let totalexpense=0;
    let Id:any="";
    try{
        const User=await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        Id=User?.id;
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }
    const userExpense=await prisma.expense.findMany({
        where: {
            userId: Id,
            year: 2024
        }
    })

    let arr=new Array(12).fill(0);
    
    for(let i=0;i<userExpense.length;i++){
        arr[userExpense[i].month-1]+=userExpense[i].spend;
    }
    
    return res.send(arr);

})

expense.post('/expenselist',IsloggedIn,async (req,res)=>{
    const body=req.body;
    let totalexpense=0;
    let Id:any="";
    try{
        const User=await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        Id=User?.id;
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }

    const date=new Date();
    const currmonth=date.getMonth()+1;
    const list=await prisma.expense.findMany({
        where: {
            userId: Id,
            month: currmonth
        },
        select: {
            spend: true,
            categories: true
        }
    })
    // console.log("count is: "+list.length+" array is: "+list);
    // console.log(list);
    return res.json({
        count: list.length,
        list: list
    })
})

export default expense