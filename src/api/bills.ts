import { client, Response } from '.';
import { Bill, BillFormType, billFrom } from '../types/bill';

export const createBill = async (data: BillFormType) => {
  try {
    const { data: response } = await client.post<number>('/bills', data);
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const updateBill = async (id: number, data: BillFormType): Promise<Response<void>> => {
  try {
    const { data: response } = await client.put<void>(`/bills/${id}`, data);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchOneBill = async (id: number): Promise<Response<Bill>> => {
  try {
    const { data } = await client.get<Bill>(`/bills/${id}`);
    return { data: billFrom(data) };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const fetchAllBills = async () => {
  try {
    const { data } = await client.get<Bill[]>('/bills');
    return data;
  } catch (error) {
    console.error(error);
    return [] as Bill[];
  }
};

export const sendBillAsPDF = async (id: number) => {
  try {
    const { data } = await client.post<boolean>(`/bills/${id}/send`);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
