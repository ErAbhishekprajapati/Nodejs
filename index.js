// const my=require("./second");
// //const os=require("os");

// // console.log(os.hostname())
// // console.log(os.release())
// // console.log(os.platform())
// // console.log(os.homedir())
// // console.log(os.type())
// console.log("Hellow word i am abhishek prajapati",my)
// create a our server :
// const http=require('http');

// http.createServer((req,res)=>{
//     res.write("<h1>hi i am abhishek</h1>");
//     res.end()
// }).listen(4500);

// this is here ki node.js is a asyncronous file hai 
// 1. asyncronous means without wait any lines of code run the continue .
// 2. syncronous means wait lines of code run the the first line run and then second line jump the code.

// console.log("start...");
// setTimeout(()=>{
//     console.log("second")    
// },2000);

// console.log("end...");


// How to work in express js 

// const express=require('express');
// const app=express();
// app.get('/',(req,res)=>{
//     res.send('this is home pageasdsdfghfg');
// });

// app.get('/about',(req,res)=>{
//     res.send('this is about page');
// });
// app.listen(5000);
 


// how to connect db in mysql 

const mysql=require('mysql');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});
con.connect((err)=>{
    if(err){
        console.log("not connected");
    }
    else{
        console.log("connected");
    }
})

con.query("select * from user",(err,result)=>{
    console.log(result);
});
