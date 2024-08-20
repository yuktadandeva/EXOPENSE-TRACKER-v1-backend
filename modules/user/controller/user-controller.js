import { userModel } from "../model/user-model.js";

export const viewUser = async ( request,response, next)=>{
    try{
      const {name} = request.query;
      const user = await userModel.findOne({name}).exec();
      response.status(200).json({"user":user})
    }catch(err){
      response.status(500).json({message :"user not found error in database"})
    }
}

export const addUser = async (request, response)=>{
    const user = request.body.info;
    console.log(request.body)
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
        console.log("request body", request.body)
        const user = await userModel.findOne({userId});
console.log(user)
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
          }

        const friend =await userModel.findOne({userId:friendId});
console.log(friend)
        if (!friend) {
            return response.status(404).json({ message: 'Friend not found'});
        }

        const friendObjectId =friend._id;
        
        if(user.friendList.includes(friendId)){
          return response.status(400).json({message:"friend already added "})
        }

        user.friendList.push(friendObjectId);
        await user.save(); 
        response.status(200).json({message:"added successfully"})

    }catch(error){
    console.log("error in adding", error)
    response.status(500).json({message:"error in adding"})
    }
}

export const getFriendList = async (request, response, next)=>{
    try{
        const {name} = request.query;

        const doc =await userModel.find({name}).populate({
            path: 'friendList',
            select:'name userId userImg'
        }).exec();

        return response.status(200).json({user:doc})
    }catch(error){
        return response.status(500).json({message:"error in getting friend list"})
    }
}

export const getUser = async (request, response, next)=>{
    try{
        const {userId, password} = request.body;
        console.log(request.body)
        const user = await userModel.findOne({userId}).populate({
            path: 'friendList',
            select: 'name userId userImg'
        }).populate({
            path: 'bills',
            select:'billAmount billActivity createdBy friendGroup share'
        }).exec();

        if(!user){
        return response.status(400).json({message:"user not found"})
        }

        console.log(user.password);
        if(user.password!== password){
        return response.status(400).json({message:"invalid password"})
        }

        console.log(user);
        response.status(200).json({"user": user})
    }catch(error){
        response.status(500).json({message:"error in getting friendList"})
    }

}