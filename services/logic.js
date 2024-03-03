const { response } = require('express')
const db=require('./db')

//logic for register
const register=(username,acno,password)=>{
  return db.User.findOne({acno}).then((response)=>{
    console.log(response);
    if(response){
        return{
            statusCode:401,
            message:"Acno is already registered"
        }
    }
    else{
        const newUser=new db.User({
            username, 
            acno,
            password,
           
        })
        //to store the new user in the database
        newUser.save()
        //response send back to the client
        return{
            statusCode:200,
            message:'Registration successful'
        }
    }
  })

}


//logic for login
const login=(acno,password)=>{
  return db.User.findOne({acno,password}).then((response)=>{
    console.log(response);//full details
    if(response){
      //if acno and password are present in db
      return{
        statusCode:200,
        message:"Login Successful",
        currentUser:response.username//current user name send to  frontend
      }
    }
    //acno  and password are not present in db
    else{
      return{
        statusCode:401,
        message:"Invalid Login"
      }
    }
  })
}


//logic for image uploading
const addImage=(id,image,discription)=>{
  return db.addimages.findOne({id}).then((response)=>{
    console.log(response);
    if(response){
      return{
        statusCode:401,
        message:"Image already uploaded"
      }
    }else{
      const newImage= new db.addimages({
        id,
        image,
        discription
      })

      
      newImage.save()
      return{
        statusCode:200,
        message:"image add successfully",
      }
    }
  })
}
//view image
const viewImage=()=>{
  return db.addimages.find().then((response)=>{
    console.log(response);
    if(response){
      return{
        data:response,
        statusCode:200,
        message:"data fetch successfully",
        
      }
    }else{
      return{
        statusCode:401,
        message:'faild to fetch data'
      }
    }
  })
}
//addminview users
const adminviewUser=()=>{
  return db.User.find().then((response)=>{
    console.log(response);
    if(response){
      return{
        data:response,
        statusCode:200,
        message:"User data fetch successfully",
        
      }
    }else{
      return{
        statusCode:401,
        message:'faild to fetch data'
      }
    }
  })
}



//adminview image
const adminviewImage=()=>{
  return db.addimages.find().then((response)=>{
    console.log(response);
    if(response){
      return{
        data:response,
        statusCode:200,
        message:"data fetch successfully",
        
      }
    }else{
      return{
        statusCode:401,
        message:'faild to fetch data'
      }
    }
  })
}
//image id searching
const imageid=(id)=>{
  return db.addimages.find({id}).then((response)=>{
    if (response) {
      return{
        statusCode:200,
        message:"Image Got It "
      }
      
    }
    //id is not present in db
    else{
      return{
        statusCode:401,
        message:"id Not Found"
      }
    }
  })

}

//logic for admin register
const adminregister=(username,id,password)=>{
  return db.admins.findOne({id}).then((response)=>{
    console.log(response);
    if(response){
        return{
            statusCode:401,
            message:"Acno is already registered"
        }
    }
    else{
        const newUser=new db.admins({
            username, 
            id,
            password,
           
        })
        //to store the new user in the database
        newUser.save()
        //response send back to the client
        return{
            statusCode:200,
            message:'Registration successful'
        }
    }
  })

}
//logic for admin login
const adminlogin=(id,password)=>{
  return db.admins.findOne({id,password}).then((response)=>{
    console.log(response);//full details
    if(response){
      //if acno and password are present in db
      return{
        statusCode:200,
        message:"Login Successful",
        currentUser:response.username//current user name send to  frontend
      }
    }
    //acno  and password are not present in db
    else{
      return{
        statusCode:401,
        message:"Invalid Login"
      }
    }
  })
}
//admin delete images
const deleteImages=(id)=>{
  return db.addimages.deleteOne({id}).then((data)=>{
    console.log(data);
    if(data){
      return{
        statusCode:200,
        message:"Image delete Successfully"
      }
    }
    else{
      return{
        statusCode:200,
        message:"Failed to Delete"
      }
    }
  })
}

//admin delete users
const deleteUsers=(acno)=>{
  return db.User.deleteOne({acno}).then((data)=>{
    console.log(data);
    if(data){
      return{
        statusCode:200,
        message:"User deleted Successfully"
      }
    }
    else{
      return{
        statusCode:200,
        message:"Failed to Remove the User"
      }
    }
  })
}

module.exports={
  register,
  login,
  addImage,
  viewImage,
  imageid,
  adminlogin,
  adminregister,
  adminviewImage,
  adminviewUser,
  deleteImages,
  deleteUsers
}