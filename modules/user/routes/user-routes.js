import express from "express";
import { addFriend, addUser, getUser, viewUser } from "../controller/user-controller.js"; 

export const userRoutes = express.Router();

userRoutes.get("/view-user",viewUser);
userRoutes.post("/add-user", addUser);
userRoutes.post("/add-friend",addFriend);
userRoutes.post("/get-user",getUser);

