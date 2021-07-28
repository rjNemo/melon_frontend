import { PaymentMethod, PaymentStatus, Platform, Room } from './enums';

export type BillFormType = {
  name: string;
  phoneNumber: string;
  price: number;
  start: Date;
  end: Date;
  room: Room;
  customers: number;
  platform: Platform;
  taxes: boolean;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

export interface Bill {
  id: number;
  phoneNumber: string;
  name: string;
  price: number;
  start: Date;
  end: Date;
  room: Room;
  customers: number;
  platform: Platform;
  taxes: boolean;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}

export const billFrom = (bill: any): Bill =>
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
