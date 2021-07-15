import { Layout, Menu, Row } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export const withLayout =
  (Component: (arg: any) => JSX.Element) =>
  ({ ...props }: any) => {
    const { url } = useRouteMatch();
    const menuItems = [
      { label: 'Home', path: '/' },
      { label: 'Bills', path: '/bills' }
    ];

    return (
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Header>
            <Row>
              <span style={{ color: 'white', paddingRight: '16px' }}>🍉 Melon</span>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[
                  (menuItems.findIndex((item) => url.includes(item.path)) + 1).toString()
                ]}
              >
                {menuItems.map(({ label, path }, index) => (
                  <Menu.Item key={index + 1}>
                    <Link to={path}>{label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Row>
          </Header>
          <Content style={{ padding: '20px 50px' }}>
            <Component {...props} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>🍉 Melon - Property Management</Footer>
        </Layout>
      </>
    );
  };
