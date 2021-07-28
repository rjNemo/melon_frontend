import { enumToList } from '../../lib/enums';

export type ReportFormType = {
  type: ReportType;
  month?: Month;
};

export enum ReportType {
  monthly,
  yearly
}

enum Month {
  January,
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
