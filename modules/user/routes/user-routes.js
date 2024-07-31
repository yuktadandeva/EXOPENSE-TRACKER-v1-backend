import express from "express";
import { addFriend, addUser, getUser, viewUsers } from "../controller/user-controller.js";

export const userRoutes = express.Router();

userRoutes.get("/view-users",viewUsers);
userRoutes.post("/add-user", addUser);
userRoutes.post("/add-friend",addFriend);
userRoutes.get("/get-user",getUser);