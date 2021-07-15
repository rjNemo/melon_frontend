import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

export function BillSent() {
  const history = useHistory();
  return (
    <Result
      status="success"
      title="Bill sent"
      subTitle="The bill is on its way to your customer"
      extra={[
        <Button key="back" type="primary" onClick={() => history.push('/')}>
          Go Back Home
        </Button>
      ]}
    />
  );
}
