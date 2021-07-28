import { Button, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { withLayout } from '../layouts/main';

function HomePage() {
  // Hooks
  const history = useHistory();

  return (
    <>
      <h1>Rent it Like a Pro</h1>
      <Row>
        <Button type="primary" size="large" onClick={() => history.push('/bills/new')}>
          Add Bill
        </Button>
        <Button type="default" size="large" onClick={() => history.push('/reports')}>
          Edit Report
        </Button>
      </Row>
    </>
  );
}

export default withLayout(HomePage);
