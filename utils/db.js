import mongoose from 'mongoose';



const connectDatabase = ()=>{
    return mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bhci9is.mongodb.net/DocBooker`)
}


export default connectDatabase