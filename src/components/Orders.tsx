import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
      setOrders(data);
    } catch (error) {
      message.error('Error al cargar órdenes');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/orders`, values);
      message.success('Orden agregada');
      fetchOrders();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Error al agregar orden');
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${id}`);
      message.success('Orden eliminada');
      fetchOrders();
    } catch (error) {
      message.error('Error al eliminar orden');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Agregar Orden
      </Button>
      <Table
        dataSource={orders}
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'ID Usuario', dataIndex: 'user_id', key: 'user_id' },
          { title: 'ID Producto', dataIndex: 'product_id', key: 'product_id' },
          { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
          {
            title: 'Acciones',
            render: (text, record: any) => (
              <Button danger onClick={() => deleteOrder(record.id)}>
                Eliminar
              </Button>
            ),
          },
        ]}
        rowKey="id"
      />

      <Modal
        title="Agregar Orden"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="user_id"
            label="ID Usuario"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="product_id"
            label="ID Producto"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Cantidad"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
