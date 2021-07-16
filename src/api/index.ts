import axios from 'axios';
import { Bill, BillFormType } from '../types/bill';

const BASE_URL = process.env.REACT_APP_API_URL;
const client = axios.create({ baseURL: BASE_URL });

export const createBill = async (data: BillFormType) => {
  try {
    const { data: response } = await client.post<number>('/', data);
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

type Response<T> = {
  data?: T;
  error?: any;
};

const billFrom = (bill: any): Bill =>
  ({
    id: bill.id,
    customers: bill.customers_qty,
    end: bill.end_date,
    name: bill.name,
    paymentMethod: bill.payment_method,
    paymentStatus: bill.payment_status,
    phoneNumber: bill.phone_number,
    platform: bill.platform,
    price: bill.price,
    room: bill.room,
    start: bill.start_date,
    taxes: bill.with_tax
  } as Bill);

export const fetchOneBill = async (id: number): Promise<Response<Bill>> => {
  try {
    const { data } = await client.get<Bill>(`/${id}`);
    return { data: billFrom(data) };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchAllBills = async () => {
  try {
    const { data } = await client.get<Bill[]>('/');
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
    return false;
  }
};
