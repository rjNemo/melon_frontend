import { client, Response } from '.';
import { Bill, BillFormType, billFrom } from '../types/bill';

export const billsURL = '/bills';

export const createBill = async (data: BillFormType) => {
  try {
    const { data: response } = await client.post<number>(billsURL, data);
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
export const updateBill = async (id: number, data: BillFormType): Promise<Response<void>> => {
  try {
    const { data: response } = await client.put<void>(`${billsURL}/${id}`, data);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
export const fetchOneBill = async (id: number): Promise<Response<Bill>> => {
  try {
    const { data } = await client.get<Bill>(`${billsURL}/${id}`);
    return { data: billFrom(data) };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
export const fetchAllBills = async () => {
  try {
    const { data } = await client.get<Bill[]>(billsURL);
    return data;
  } catch (error) {
    console.error(error);
    return [] as Bill[];
  }
};

export const sendBillAsPDF = async (id: number) => {
  try {
    const { data } = await client.post<boolean>(`${billsURL}/${id}/send`);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
