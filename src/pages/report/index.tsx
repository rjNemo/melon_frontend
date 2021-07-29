import { Divider } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchReport } from '../../api/reports';
import { withLayout } from '../../layouts/main';
import { Report, ReportFormType, ReportType } from '../../types/report';
import { ReportResult } from './reportResult';
import { ReportForm } from './reportForm';

function ReportPage() {
  // hooks
  const { control, handleSubmit, watch } = useForm<ReportFormType>({
    defaultValues: {
      type: ReportType.monthly,
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    }
  });

  // Local state
  const [reportFetched, setReportFetched] = useState(false);
  const [report, setReport] = useState({} as Report);

  // Logic
  const onFinish = handleSubmit(async (data) => {
    const { data: content } = await fetchReport(data);
    if (content) {
      setReport(() => content);
      setReportFetched(() => true);
      return;
    }
    setReportFetched(() => false);
  });

  const isMonthlyReport = watch('type') === ReportType.monthly;

  return (
    <>
      <h1>Reports</h1>
      {reportFetched && <ReportResult content={report} />}
      <Divider />
      <ReportForm onFinish={onFinish} control={control} monthlyReport={isMonthlyReport} />
    </>
  );
}

export default withLayout(ReportPage);
