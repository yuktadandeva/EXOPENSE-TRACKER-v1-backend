import mongoose, { SchemaTypes } from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: SchemaTypes.String, required: true },
    userId: { type: SchemaTypes.String, required: true, unique: true },
    email: { type: SchemaTypes.String, required: true },
    userImg: { type: SchemaTypes.String }, 
    phoneNumber: { type: SchemaTypes.String, max: 10, required: true },
    password: { type: SchemaTypes.String, required: true },
    friendList: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], default: [] },
    userBills:{type:[{type:mongoose.Schema.Types.ObjectId, ref:'bills'}],default:[]},
    bills:{type:[{type:mongoose.Schema.Types.ObjectId, ref:'bills'}],default:[]},
    notifications :{type:SchemaTypes.String, required: false, default:null}
});

export const userModel = mongoose.model('users', userSchema);

