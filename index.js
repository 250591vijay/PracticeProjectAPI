const express = require("express")
const fs =require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8010;

//It is type of Plug in/ middleware
// Post man m jo x-www-form-urlencoded waha s data laega
app.use(express.urlencoded({extende:false}));

// REST API
app.get("/api/users",(req,res)=>{
  res.setHeader("X-MyName","Viyaan");//Custom Header in Response
  // Always add X to custom headers
    return res.json(users);
});
// // app.get("/api/users/:id",(req,res)=>{
// //     const id = Number(req.params.id);
// //     const user = users.find((user)=> user.id ===id);
// //     return res.json(user);
// //   });

//Route
app
.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id ===id);
   // return res.json(user);
   if(!user){
    res.status(402).json({Error: "User not found"});
   }
    return res.status(201).json({Status:"Sucess",Detail:user});
  })
.patch((req,res)=>{
  return res.json({status:"Pending"});
})
.delete((req,res)=>{
    return res.json({status:"Deleted"});
})

app.post("/api/users",(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name||!body.email||!body.gender||!body.job_title){
      return res.status(400).json({Message:"Fill the correct parameter"});
    }
   users.push({...body,id:users.length+1});
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    // if(err){
    //     return res.status(500).json({status:"Error",message:"Failed to add in JSon file"});
    // }
    //return res.json({status:"Sucess",id:users.length});
    return res.status(201).json({status:"Sucess",id:users.length});
   });
});

app.listen(port,()=>{console.log(`Server Started at port:${port}`)})