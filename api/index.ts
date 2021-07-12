import axios from "axios";
import { Bill, BillForm } from "../types/bill";

const BASE_URL = "http://localhost:8000/api/v1/";

const client = axios.create({ baseURL: BASE_URL });

export const createBill = async (data: BillForm) => {
  try {
    const { data: response } = await client.post("/", JSON.stringify(data));
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchOneBill = async (id: number) => {
  try {
    const { data } = await client.get<Bill>(`/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return {} as Bill;
  }
};

export const fetchAllBills = async () => {
  try {
    const { data } = await client.get<Bill[]>("/");
    return data;
  } catch (error) {
    console.error(error);
    return [] as Bill[];
  }
};

export const sendBillAsPDF = async (id: number) => {
  try {
    const { data } = await client.post(`/${id}/send`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
