
import { billModel } from "../model/bill-model.js";
import { userModel } from "../model/user-model.js";

export const addBill = async (request, response, next)=>{
    try{
        const bill= request.body.bill;
        console.log("billDetails are", bill);
        
        const userId = request.body.bill.createdBy;
        console.log(userId)

        //making bill
        const doc = await billModel.create(bill);
        if(doc && doc._id){
            response.status(200).json({message:"bill successfully made", billId:doc._id})
            console.log("bill added");
            
            //adding info to the user
            updateUserBills(userId, doc._id);
           
        }else{
            console.log("bill not added")
            response.status(400).json({message:"bill not added some error"})
        }
    }catch(error){
        console.log("Error", error)
      response.status(500).json({message:"error"})

    }
}

//add new bills in user bills
export const updateUserBills= async (userId,billId)=>{
    try{
        console.log("bill",billId,"userId",userId);
        const user = await userModel.findOne({_id:userId});
        console.log("user to add bill", user.userBills);
        user.userBills.push(billId);

        await user.save();
        console.log(user.bills);
        if(user.userBills.includes(billId)){
            console.log("bills", user.userBills);
            console.log("successfully updated user bills")
        }else{
            console.log("bill not added")
        }
    }catch(error){
            console.log("error in updating", error)
    }
   
}

//add friends in bill
export const addFriendGroup = async(request, response, next)=>{
    try{
        const {billId, friendIds} = request.body.data;
        console.log(request.body.data)
        const bill= await billModel.findOne({_id:billId});
        if (!bill) {
            return response.status(404).json({ message: "Bill not found" });
        }
        const alreadyAddedFriends=[];

       for(let friendId of friendIds){
            if(bill.friendGroup.includes(friendId)){
                
                alreadyAddedFriends.push(friendId)

                //adding billId in friends bills
                await updateInFriendsBills(billId, friendId);
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

//updates share in bill
export const updateShare=async(request, response, next)=>{
    try{
        const {billId, share}= request.body;
        console.log(billId, share);
        const updatedBill =await billModel.findOneAndUpdate({_id: billId},{share: share},{ new: true });
        if(!updatedBill){
            response.status(404).json({message:"share not updated"});
            console.log("error in updating share")
        }else{
            response.status(200).json({message:"successfully updated"})
            console.log("successfully updated")
        }

    }catch(error){
        console.log(error)
        return response.status(400).json({message:"cannot update share"})
    }
}

//add new bills in friend's bills

export const updateInFriendsBills = async( billId, friendId)=>{
    try{
       const trackBills = [];
           console.log("current friendId", friendId)
           const user = await userModel.findOne({_id:friendId});
           console.log("user in friend bill", user);
           user.bills.push(billId);
           trackBills.push(billId);
           console.log("friend bills", user);
           await user.save();
   
       
       if(trackBills.includes(billId)){
           console.log("successfully added bill in friends");
       }else{
           console.log("cannot add in friends bills")
       }
    }catch(error){
      console.log("error in adding friends bill", error)
    }
}

