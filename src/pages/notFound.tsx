import { Button, Col, Image, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import NotFoundImage from '../assets/notFound/404.png';
import { withLayout } from '../layouts/main';

function NotFoundPage() {
  const history = useHistory();
  return (
    <Col>
      <Row justify="center">
        <Button size="large" type="link" onClick={() => history.push('/')}>
          Go Back to Safety
        </Button>
      </Row>
      <Row justify="center">
        <Image src={NotFoundImage} preview={false} width={800} />
      </Row>
    </Col>
  );
}

export default withLayout(NotFoundPage);
