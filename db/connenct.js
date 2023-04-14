const mongoose = require('mongoose')

//const connectionString = 'mongodb+srv://suraj:suraj2012@todo.rc1ikbk.mongodb.net/TODO?retryWrites=true&w=majority'

const connectDB = (url) => {
    return mongoose.connect(url)
}
module.exports = connectDB