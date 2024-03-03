//1import express
const express =require('express');
//4 import cors
const cors = require('cors');
//import logic
const logic = require('./services/logic')

//2 create a server application using express
const server =express()

//5 use cors
server.use(cors({
    origin:'http://localhost:4200'
}))
//6
server.use(express.json())//return middleware that only parses json


//3setup port for server application
server.listen(5000,()=>{
    console.log('server listening on port 5000');
})

//API call to resolve - localhost:5000
server.get('/',(req,res)=>{
    res.send('welcome to backend')
})
server.post('/',(req,res)=>{
    console.log('server post');
})

//API calls
//Register - http://localhost:5000/register
server.post('/register',(req,res)=>{
    console.log('Inside register API call');
    console.log(req.body);
    //logic to resolve register request
    logic.register(req.body.username,req.body.acno,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
   
})
//Login - http://localhost:5000/login
server.post('/login',(req,res)=>{
    console.log('Inside login API call');
    console.log(req.body);
    //logic to resolve login request
    logic.login(req.body.acno,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})


//User - http://localhost:5000/addimage
server.post('/addImage',(req,res)=>{
    console.log('Inside add image api call');
    logic.addImage(req.body.id,req.body.image,req.body.discription).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

//api call to viewallimages
server.get('/viewImage',(req,res)=>{
    console.log("Inside  API call to view all images");
    logic.viewImage().then((response)=>{
        res.status(response.statusCode).json(response)   
    })
})


//Admin Register - http://localhost:5000/adminregister
server.post('/adminregister',(req,res)=>{
    console.log('Inside register API call');
    console.log(req.body);
    //logic to resolve register request
    logic.adminregister(req.body.username,req.body.id,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
   
})

//Admin Login - http://localhost:5000/login
server.post('/adminlogin',(req,res)=>{
    console.log('Inside login API call');
    console.log(req.body);
    //logic to resolve login request
    logic.adminlogin(req.body.id,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

//image id searching
server.post('/user',(req,res)=>{
    console.log('Inside User API call');
    console.log(req.body);
    logic.imageid(req.body.id).then((response)=>{
        res.status(response.statusCode).json(response)   
    })
}

)

//api call to adminviewallimages
server.get('/adminviewImage',(req,res)=>{
    console.log("Inside  API call to view all images");
    logic.adminviewImage().then((response)=>{
        res.status(response.statusCode).json(response)   
    })
})


//api call to adminviewallusers
server.get('/adminviewUser',(req,res)=>{
    console.log("Inside  API call to view all User");
    logic.adminviewUser().then((response)=>{
        res.status(response.statusCode).json(response)   
    })
})

//admin delete images
server.delete('/deleteImages/:id',(req,res)=>{
    console.log('Iside Api call for deletion of images');
    logic.deleteImages(req.params.id).then((data)=>{
        res.status(data.statusCode).json(data)
    })
})

//admin remove the user
server.delete('/deleteUser/:id',(req,res)=>{
    console.log('Inside Api call for remove the User');
    logic.deleteUsers(req.params.id).then((data)=>{
        res.status(data.statusCode).json(data)
    })
})