import { Button, Image, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../assets/notFound/404.png';
import { withLayout } from '../layouts/main';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Row justify="center">
        <Button size="large" type="link" onClick={() => navigate('/')}>
          Go Back to Safety
        </Button>
      </Row>
      <Row justify="center">
        <Image src={NotFoundImage} preview={false} width={800} />
      </Row>
    </>
  );
}

export default withLayout(NotFoundPage);
