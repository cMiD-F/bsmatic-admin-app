import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import {BiBookAlt, BiCategoryAlt, BiCar} from "react-icons/bi"
import { TbBrandAppgallery } from "react-icons/tb";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signou") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4"/>,
              label: "Dashboard",
            },
            {
              key: "clientes",
              icon: <AiOutlineUser className="fs-4"/>,
              label: "Clientes",
            },
            {
              key: "Catalogo",
              icon: <BiBookAlt className="fs-4"/>,
              label: "Catalogo",
              children: [
                {
                  key: "produto",
                  icon: <AiOutlineShoppingCart className="fs-4"/>,
                  label: "Adiciona Produto",
                },
                {
                  key: "lista-produto",
                  icon: <AiOutlineShoppingCart className="fs-4"/>,
                  label: "Lista de Produto",
                },
                {
                  key: "marca",
                  icon: <TbBrandAppgallery className="fs-4"/>,
                  label: "Marca",
                },
                {
                  key: "lista-marca",
                  icon: <TbBrandAppgallery className="fs-4"/>,
                  label: "Marca",
                },
                {
                  key: "categoria",
                  icon: <BiCategoryAlt className="fs-4"/>,
                  label: "Categoria",
                },
                {
                  key: "lista-categoria",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Lista de categoria",
                },
                {
                  key: "aplicacao",
                  icon: <BiCar className="fs-4" />,
                  label: "Aplicação",
                },
                {
                  key: "lista-aplicacao",
                  icon: <BiCar className="fs-4" />,
                  label: "Lista de aplicação",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
