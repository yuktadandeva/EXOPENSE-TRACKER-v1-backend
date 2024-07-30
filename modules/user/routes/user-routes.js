import express from "express";
import { addUser, viewUsers } from "../controller/user-controller.js";

export const userRoutes = express.Router();

userRoutes.get("/view-users",viewUsers);
userRoutes.post("/add-user", addUser);