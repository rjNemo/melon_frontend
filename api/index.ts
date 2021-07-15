import axios from "axios";
import { Bill, BillForm } from "../types/bill";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const client = axios.create({ baseURL: BASE_URL });

export const createBill = async (data: BillForm) => {
  try {
    const { data: response } = await client.post<number>("/", data)
    return response;
  } catch (error) {
    console.error(error);
    return 0;
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
    const { data } = await client.post<boolean>(`/${id}/send`);
    return data;
  } catch (error) {
    console.error(error);
    return false
  }
};
