import mongoose, { SchemaTypes } from "mongoose";

const friendListSchema = mongoose.Schema({
    name:{type: SchemaTypes.String},
    userId:{type: SchemaTypes.Mixed},
    userImg:{type: SchemaTypes.Mixed}, 
    email: {type: SchemaTypes.Mixed},
    phoneNumber: {type: SchemaTypes.String, max:10},   
})

const userSchema = mongoose.Schema({
    name: {type: SchemaTypes.String, required: true},
    userId: {type: SchemaTypes.Mixed, required: true, unique: true },
    email: {type: SchemaTypes.Mixed, required: true, unique: true },
    userImg:{type: SchemaTypes.Mixed},
    phoneNumber: {type: SchemaTypes.String, max:10, required: true},
    password: {type: SchemaTypes.Mixed, required: true},
    friendList: {type:[friendListSchema], default:[]}
})

export const userModel = mongoose.model('users', userSchema);

