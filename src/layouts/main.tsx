import { Layout, Menu, Row } from 'antd';
import { Link, useMatch } from 'react-router-dom';
import { AppRoutes } from '../Router';

const { Header, Content, Footer } = Layout;

export const withLayout =
  (Component: (arg: any) => JSX.Element) =>
  ({ ...props }: any) => {
    const menuItems = [
      { label: 'Home', path: AppRoutes.home },
      { label: 'Bills', path: AppRoutes.bills },
      { label: 'Reports', path: AppRoutes.reports }
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
                  (menuItems.findIndex((item) => useMatch(item.path)) + 1).toString()
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
            <main>
              <Component {...props} />
            </main>
          </Content>
          <Footer style={{ textAlign: 'center' }}>🍉 Melon - Property Management</Footer>
        </Layout>
      </>
    );
  };
