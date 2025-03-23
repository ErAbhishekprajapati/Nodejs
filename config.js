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

// con.query("select * from user",(err,result)=>{
//     console.log(result);
// });
module.exports=con;