import mongoose, { mongo, SchemaTypes } from "mongoose";

const billSchema = mongoose.Schema({
    billAmount: { type: SchemaTypes.Number, required: true },
    billActivity : { type: SchemaTypes.String, required: true },
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    friendGroup: {type:[{type: mongoose.Schema.Types.ObjectId, ref:"users"}], default:[]},
    share:{type:SchemaTypes.Number, default:0}
});
billSchema.index({ billActivity: 1 }, { unique: false });


export const billModel = mongoose.model('bills', billSchema);

