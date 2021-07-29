import { client, Response } from '.';
import { Report, ReportFormType, ReportType } from '../types/report';

export const fetchReport = async ({
  type,
  year,
  month
}: ReportFormType): Promise<Response<Report>> => {
  const baseQueryURL = `/reports/?report_type=${type}&year=${year}`;
  const queryURL =
    type === ReportType.monthly && month
      ? baseQueryURL.concat(`&month=${month + 1}`)
      : baseQueryURL;

  try {
    const { data } = await client.get<Report>(queryURL);
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
