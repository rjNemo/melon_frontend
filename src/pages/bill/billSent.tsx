import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export function BillSent() {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title="Bill sent"
      subTitle="The bill is on its way to your customer"
      extra={[
        <Button key="back" type="primary" onClick={() => navigate('/')}>
          Go Back Home
        </Button>
      ]}
    />
  );
}
