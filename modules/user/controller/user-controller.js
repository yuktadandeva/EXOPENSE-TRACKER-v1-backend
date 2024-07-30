import { userModel } from "../model/user-model.js";

export const viewUsers = async ( request,response, next)=>{
    try{
      const docs = await userModel.find({}).exec();
      response.status(200).json({"users":docs})
    }catch(err){
      response.status(500).json({message :"users not found error in database"})
    }
}

export const addUser = async (request, response)=>{
    const user = request.body;

    try{
    const doc = await userModel.create(user);
    if(doc && doc._id){
        response.status(200).json({message:"user added"})
    }else{
        response.status(500).json({message:"user cannot be added in db"})
    } 
    }catch(err){
        console.log("error is", err)
        response.status(500).json({message:"user cannot be added some error"})
    }
}