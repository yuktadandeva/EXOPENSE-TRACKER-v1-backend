import { billModel } from "../model/bill-model.js";

export const addBill = async (request, response, next)=>{

    try{

        const bill = request.body;
        console.log("billDetails are", bill);

        const doc = await billModel.create(bill);
        if(doc && doc._id){
            response.status(200).json({message:"bill successfully madeS"})
        }else{
            response.status(400).json({message:"bill not added some error"})
        }
    
    }catch{
      response.status(400).json({message:"error"})

    }
}