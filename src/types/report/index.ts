import { enumToList } from '../../lib/enums';
import { Bill } from '../bill';

export type ReportFormType = {
  type: ReportType;
  month?: Month;
  year: number;
};

export interface Report {
  type: ReportType;
  month?: Month;
  year: number;
  revenue: number;
  profit: number;
  bookings: number;
  bills: Bill[];
}

export enum ReportType {
  monthly = 'monthly',
  yearly = 'yearly'
}

enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export const monthToList = () => enumToList(Month);
