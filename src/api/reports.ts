import { client, Response } from '.';
import { Report, ReportFormType, ReportType } from '../types/report';

export const reportsURL = '/reports';

export const fetchReport = async ({
  type,
  year,
  month
}: ReportFormType): Promise<Response<Report>> => {
  const params =
    type === ReportType.monthly && month
      ? {
          report_type: type,
          month: month + 1,
          year
        }
      : {
          report_type: type,
          year
        };

  try {
    const { data } = await client.get<Report>(reportsURL, { params });
    return {
      data: {
        // @ts-ignore
        type: data.report_type,
        ...data
      }
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
