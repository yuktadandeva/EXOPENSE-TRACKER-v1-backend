import e from "express";
import { addBill, addFriendGroup, updateShare } from "../controller/bill-controller.js";

export const billRoutes = e.Router();

billRoutes.post('/add-bill', addBill)
billRoutes.post('/add-friend-bill',addFriendGroup)
billRoutes.post('/update-share', updateShare)