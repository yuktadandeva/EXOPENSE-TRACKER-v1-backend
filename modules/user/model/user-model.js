import mongoose, { SchemaTypes } from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: SchemaTypes.String, required: true },
    userId: { type: SchemaTypes.String, required: true, unique: true },
    email: { type: SchemaTypes.String, required: true, unique: true },
    userImg: { type: SchemaTypes.String }, 
    phoneNumber: { type: SchemaTypes.String, max: 10, required: true },
    password: { type: SchemaTypes.String, required: true },
    friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


export const userModel = mongoose.model('users', userSchema);

