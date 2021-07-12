export type BillForm = {
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
  phoneNumber: number;
  number: number;
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

export enum Room {
  t2,
  t3,
}

export enum Platform {
  web,
  booking,
  airbnb,
  tripadvisor,
  perso,
}

export enum PaymentMethod {
  card,
  cash,
  cheque,
  transfer,
}

export enum PaymentStatus {
  pending,
  canceled,
  completed,
  refund,
}
