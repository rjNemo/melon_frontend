import { Layout, Menu, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Content, Footer } = Layout;

export const withLayout =
  (Component: (arg: any) => JSX.Element) =>
  ({ ...props }: any) => {
    const { route } = useRouter();

    const menuItems = [
      { label: "Home", path: "/" },
      { label: "Bills", path: "/bills" },
    ];

    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>
            <Row>
              <span style={{ color: "white", paddingRight: "16px" }}>🍉 Melon</span>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[
                  (menuItems.findIndex((item) => item.path === route) + 1).toString(),
                ]}
              >
                {menuItems.map(({ label, path }, index) => (
                  <Menu.Item key={index + 1}>
                    <Link href={path}>
                      <a>{label}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Row>
          </Header>
          <Content style={{ padding: "20px 50px" }}>
            <Component {...props} />
          </Content>
          <Footer style={{ textAlign: "center" }}>🍉 Melon - Property Management</Footer>
        </Layout>
      </>
    );
  };
