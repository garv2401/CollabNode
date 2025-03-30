const mongoose=require('mongoose');

const MONGO_URI=process.env.MONGO_URI;

export const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        
        console.log('MongoDB connected');

    }catch(e){
        console.error('MongoDB connection error:',e);
    }
}