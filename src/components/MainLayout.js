import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
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
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">BSM</span>
            <span className="lg-logo">BSMatic</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "usuarios",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Usuários",
            },
            {
              key: "Catalogo",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalogo",
              children: [
                {
                  key: "produto",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Produto",
                },
                {
                  key: "produto-lista",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Lista de produto",
                },
                {
                  key: "marca",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Marca",
                },
                {
                  key: "lista-marca",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Lista de marcas",
                },
                {
                  key: "categoria",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Categoria",
                },
                {
                  key: "lista-categoria",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Lista de categoria",
                },
                {
                  key: "aplicacao",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Aplicação",
                },
                {
                  key: "lista-aplicacao",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Lista de aplicações",
                },
              ],
            },
            {
              key: "pedido",
              icon: <FaClipboardList className="fs-4" />,
              label: "Pedidos",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "cupom",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Cupom",
                },
                {
                  key: "lista-cupom",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Lista de cupons",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "lista-blog",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Lista de Blog",
                },
                {
                  key: "blog-categoria",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Categoria",
                },
                {
                  key: "lista-blog-categoria",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Lista de categoria de Blog",
                },
              ],
            },
            {
              key: "perguntas",
              icon: <FaClipboardList className="fs-4" />,
              label: "Perguntas",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
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
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://res.cloudinary.com/bsmatic/image/upload/v1690732180/bsm.ico"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">BSMatic</h5>
                <p className="mb-0">bsmatic@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Ver Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Encerrar
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
