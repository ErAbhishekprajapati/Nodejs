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

// How to get the mysql data to browser
// const con = require('./config');
// const express = require('express');
// const app = express();

// app.get('/', (req, resp) => {
//     // Run the database query first, then send a response after
//     con.query("SELECT * FROM user", (err, result) => {
//         if (err) {
//             // Log the error and send an error response if the query fails
//             // console.error(err);
//             resp.send("Error fetching users");
//         } else {
//             // Send the result as the response if the query succeeds
//             // console.log(result);
//             resp.json(result); // Assuming you want to return the result as JSON
//         }
//     });
// });

// // Start the server on port 5000
// app.listen(5000, () => {
//     console.log('Server running on port 5000');
// });
// here is post method 
const con = require('./config');
const express = require('express');
const app = express();
app.get('/',(req,resp)=>{
    con.query("select * from user",(err,result)=>{
        if(err){ resp.send("error in api")}
        else{ resp.send(result)}
    })
});
app.post("/",(req,resp)=>{
    const data={Name:"bhaskar",email:"preeti@512gmail.com",mobile:"95321263728",address:"sonar gaali"};
    con.query('INsert INTO user SET?',data,(error,result,fields)=>{
        if(error) error;
        resp.send(result)
    })
});

app.listen(5000);

//PUT method api 

const con = require('./config');
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, resp) => {
    con.query("SELECT * FROM user", (err, result) => {
        if (err) {
            resp.send("Error in API");
        } else {
            resp.send(result);
        }
    });
});

app.post("/", (req, resp) => {
    const data = req.body; // Ensure you pass data in the body of the POST request
    // Example:
    // const data = { Name: "bhaskar", email: "preeti@512gmail.com", mobile: "95321263728", address: "sonar gaali" };
    
    con.query('INSERT INTO user SET ?', data, (error, result,fields) => {
        if (error) {
            resp.send("Error in inserting data");
        } else {
            resp.send(result);
        }
    });
});
// update ke liye query API
app.put('/', (req, resp) => {
    const { newName, oldName } = req.body;  // Expecting the body to have both the new and old name
    con.query("UPDATE user SET Name = ? WHERE Name = ?", [newName, oldName], (err, result) => {
        if (err) {
            resp.send("Error in updating data");
        } else {
            resp.send(result);
        }
    });
});
// delete the name 
app.delete('/',(req,resp)=>{
    con.query("DELETE from user WHERE Name="+req.params.Name,(error,results));
    if(error)throw error;
    resp.send(results);

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
