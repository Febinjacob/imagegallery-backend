//Mongodb connection with node.js




//1 connection library - mongoose - npm i mongoose



//import mongoose
const mongoose = require('mongoose')

//2 define connection between mongoose and node
mongoose.connect('mongodb://localhost:27017/Image-Gallery')

//3 create a model and schema for storing data
const User = mongoose.model('User', {
    username: String,
    acno: Number,
    password: String,
}

)

const addimages = mongoose.model('addimages', {
    id: Number,
    image: String,
    discription: String

}

)

const admins = mongoose.model('admins', {
    id: Number,
    username: String,
    password: String
}
)





module.exports = {
    User,
    addimages,
    admins
}