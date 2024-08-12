import { request, response } from "express";
import { billModel } from "../model/bill-model.js";

export const addBill = async (request, response, next)=>{
    try{
        const bill= request.body.bill;
        console.log("billDetails are", bill);

        const doc = await billModel.create(bill);
        if(doc && doc._id){
            response.status(200).json({message:"bill successfully made", billId:doc._id})
            console.log("bill added")
        }else{
            console.log("bill not added")
            response.status(400).json({message:"bill not added some error"})
        }
    }catch(error){
        console.log("Error", error)
      response.status(500).json({message:"error"})

    }
}

export const addFriendGroup = async(request, response, next)=>{
    try{
        const {billId, friendIds} = request.body;

        const bill= await billModel.findOne({_id:billId});
        if (!bill) {
            return response.status(404).json({ message: "Bill not found" });
        }
        const alreadyAddedFriends=[];

       for(let friendId of friendIds){
            if(bill.friendGroup.includes(friendId)){
                alreadyAddedFriends.push(friendId)
            }else{
            bill.friendGroup.push(friendId);
        }

        };
        await bill.save();
        if(alreadyAddedFriends.length>0){
           return response.status(400).json({message:"friend already added", alreadyAdded: alreadyAddedFriends})
        }

        return response.status(200).json({message:"friend added successfully"})

    }catch{
       return response.status(400).json({message:"error cannot be added"})
    }
}

export const updateShare=()=>{
    try{
        const {billId, share}= request.body;

        const updatedBill = billModel.findOneAndUpdate({_id: billId},{share: share},{ new: true });
        if(!updatedBill){
            return response.status(404).json({message:"share not updated"})
        }

    }catch(error){
        return response.status(400).json({message:"cannot update share"})
    }
}