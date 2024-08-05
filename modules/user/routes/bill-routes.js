import e from "express";
import { addBill } from "../controller/bill-controller.js";

export const billRoutes = e.Router();

billRoutes.post('/add-bill', addBill)