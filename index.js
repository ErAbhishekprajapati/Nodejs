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
// app.get('/',(req,res))// ye routs hai 
// const express=require('express');
// const app=express();
// app.get('/',(req,res)=>{
//     res.send('this is home pageasdsdfghfg');
// });

// app.get('/about',(req,res)=>{
//     res.send('this is about page');
// });
// app.listen(5000);
 



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
// const con = require('./config');
// const express = require('express');
// const app = express();
// app.get('/',(req,resp)=>{
//     con.query("select * from user",(err,result)=>{
//         if(err){ resp.send("error in api")}
//         else{ resp.send(result)}
//     })
// });
// app.post("/",(req,resp)=>{
//     const data={Name:"bhaskar",email:"preeti@512gmail.com",mobile:"95321263728",address:"sonar gaali"};
//     con.query('INsert INTO user SET?',data,(error,result,fields)=>{
//         if(error) throw error;
//         resp.send(result)
//     })
// });

// app.listen(5000);

//PUT method api 

// const con = require('./config');
// const express = require('express');
// const app = express();

// // Middleware to parse JSON request bodies
// app.use(express.json());

// app.get('/', (req, resp) => {
//     con.query("SELECT * FROM user", (err, result) => {
//         if (err) {
//             resp.send("Error in API");
//         } else {
//             resp.send(result);
//         }
//     });
// });
// app.listen(5000);

// app.post("/", (req, resp) => {
//     // const data = req.body; // Ensure you pass data in the body of the POST request
//     const data = { Name: "preeti", email: "preeti@512gmail.com", mobile: "95321263728", address: "sonar gaali" };
    
//     con.query('INSERT INTO user SET ?', data, (error, result,fields) => {
//         if (error) {
//             resp.send("Error in inserting data");
//         } else {
//             resp.send(result);
//         }
//     });
// });
// app.listen(5000,()=>{
//     console.log("Server is running on port 5000");

// });
// update ke liye query API
// app.put('/', (req, resp) => {
//     const { newName,oldName } = req.body;  // Expecting the body to have both the new and old name aur fir hum postman me ja kr body raw me {"newName":"Raj" and "oldName":"bashkar"}
//     con.query("UPDATE user SET Name = ? WHERE Name = ?", [newName, oldName], (err, result) => {
//         if (err) {
//             resp.send("Error in updating data");
//         } else {
//             resp.send(result);
//         }
//     });
// });
// app.listen(5000,()=>{
//     console.log("Server is running on port 5000");

// });
// app.delete('/', (req, resp) => {
//     const { Name } = req.body; // Assuming Name is sent in the request body
//     con.query("DELETE FROM user WHERE Name=?", [Name], (error, results) => {
//         if (error) {
//             return resp.status(500).send({ error: error.message });
//         }
 
//         resp.send({ message: "User deleted successfully", results });
//     });
// });

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });

// // const con = require('./config');
// const express = require('express');
// const jwt = require('jsonwebtoken'); // Import jsonwebtoken
// const app = express();
// const secretkey = "secretkey";

// // Middleware function to verify the token
// function verifyToken(req, resp, next) {
//     const bearerHeader = req.headers['authorization'];

//     // Check if token is provided
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const token = bearer[1]; // Get token from the authorization header
//         req.token = token; // Attach the token to the request object
//         next(); // Proceed to the next middleware or route handler
//     } else {
//         resp.send({
//             result: "Token is missing"
//         });
//     }
// }

// // A simple route
// app.get('/', (req, resp) => {
//     resp.json({
//         message: "A simple API"
//     });
// });

// // Profile API route
// app.post("/profile", verifyToken, (req, resp) => {
//     jwt.verify(req.token, secretkey, (err, authData) => {
//         if (err) {
//             resp.send({ result: "Invalid token" });
//         } else {
//             resp.json({
//                 message: "Profile access",
//                 authData
//             });
//         }
//     });
// });

// // Login API route to generate token
// app.post('/login', (req, resp) => {
//     const user = {
//         id: 1,
//         username: "abhishek",
//         email: "abhi@123gmail.com"
//     };

//     // Sign the JWT token with the user details and secret key
//     jwt.sign({ user }, secretkey, { expiresIn: '300s' }, (err, token) => {
//         if (err) {
//             return resp.status(500).json({ error: 'Error generating token' });
//         }
//         resp.json({ token });
//     });
// });

// // Start the server on port 5000
// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });

// const con = require('./config');
// const express = require('express');
// const app = express();
// app.use(express.json());

// app.get("/search/:key",async (req,resp)=>{
//     console.log(req.params.key)
//     let data = await user.find({
//         "$or":[
//             {"Name":{$regex:req.params.key}}  // this is regex rule here
//         ]
//     })
//     resp.send(data)
// });
// app.listen(6000);

//const con=require('./config');
// const express =require('express');
// const app=express();
// app.use(express.json());

// app.get("/",async(req,resp)=>{
//     const response=await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data=await response.json();
//     console.log(data);
//     resp.send(data);
//     //Loop through the data and log the userId for each post
//     // data.forEach(post => {
//     //     console.log(post.userId);
//     // });

// });
//app.listen(5000);

// const express = require('express');
// const app = express();
// const fetch = require('node-fetch');  // Make sure you have node-fetch installed

// app.use(express.json());

// app.get("/posts/:userId", async (req, resp) => {
//     const { userId } = req.params; // Extract userId from the URL
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
//     const data = await response.json();
//     console.log(data);
//     resp.send(data);  // Send the filtered data as the response to the client
// });

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });


// const fetch = require('node-fetch'); // Ensure node-fetch is installed
// async function fetchdata(req,resp) {
//     const response= await fetch('https://jsonplaceholder.typicode.com/posts');
//     console.log(response);
//     //loop throw fetch data to userid
//     // data.forEach(post => {
//     //     console.log(post.userId);
        
//     // });
// }
// fetchdata();
// const express=require('express');
// const app=express();
// app.use(express.json());

// app.get('/',(req,resp)=>{
//     resp.send("hellow Abhishek ji")

// });
// app.listen(6000); 

// const http = require('http');
// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     res.write('Hello, world my name is abhishek!');
//     res.end();
//   });

//   server.on('request',(req,res)=>{
//     console.log("recieved request")
//   });
//   server.listen(3000);

// Import the EventEmitter class from the events module
// const EventEmitter = require('events');

// // Create an instance of EventEmitter
// const myEmitter = new EventEmitter();

// // Create a listener for an event
// myEmitter.on('event', () => {
//   console.log('An event occurred!');
// });
// myEmitter.on('event',()=>{
//     console.log('end of');
// });

// // Emit the event
// myEmitter.emit('event');

// let promise = new Promise((resolve,reject)=>{
//     let success=true;
//     if(success){
//         resolve("operation success")
//     }
//     else{
//         reject("operation failled")
//     }

// });
// promise
//   .then(result => {
//     console.log(result); // This runs if the promise is fulfilled
//   })
//   .catch(error => {
//     console.error(error); // This runs if the promise is rejected
//   });

//  function isPrime(num){
//     if(num<2) return false;
//     for(let i=2;i<num; i++){
//         if( num%i===0) return false;

//     }
//     return true;     
//  } 
//  console.log(isPrime(8));

//  function isPalindrone(n){
//     return n.toString()===n.toString().split('').reverse().join('');

//  }
//  console.log(isPalindrone(123));// this is false
//  console.log(isPalindrone(121));// this is true
//factorial number;
// function fac(n){
//     result=1;
//     for(let i=1;i<=n;i++){
//         result *=i;

//     }
    
//     return result
// }
// console.log(fac(5));

// normal async or await to fetch data
async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
  }
  fetchData();
