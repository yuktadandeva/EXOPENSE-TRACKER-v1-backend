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

export const addFriend = async (request, response)=>{
    try{
        const {userId, friendId} = request.body;
        const user = await userModel.findOne({userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        const friend =await userModel.findOne({friendId});
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found'});
        }
        user.friendList.push(friendId);
        await user.save(); 

    }catch{
    response.status(500).json({message:"error in adding"})
    }
}