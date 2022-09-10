import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { withLayout } from '../layouts/main';

function HomePage() {
  // Hooks
  const navigate = useNavigate();

  return (
    <>
      <h1>Rent it Like a Pro</h1>
      <Row>
        <Button type="primary" size="large" onClick={() => navigate('/bills/new')}>
          Add Bill
        </Button>
        <Button type="default" size="large" onClick={() => navigate('/reports')}>
          Edit Report
        </Button>
      </Row>
    </>
  );
}

export default withLayout(HomePage);
