import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['users']}>
            <Menu.Item key="users">
              <Link to="/users">Usuarios</Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to="/products">Productos</Link>
            </Menu.Item>
            <Menu.Item key="orders">
              <Link to="/orders">Órdenes</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '20px 50px' }}>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/"
              element={<h1>Bienvenido al Sistema de Gestión</h1>}
            />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Sistema de Gestión ©2024 Creado con React, TypeScript y Ant Design
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
