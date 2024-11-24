import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(data);
    } catch (error) {
      message.error('Error al cargar productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    if (values.image) {
      formData.append('image', values.image.file);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/products`, formData);
      message.success('Producto agregado');
      fetchProducts();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Error al agregar producto');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      message.success('Producto eliminado');
      fetchProducts();
    } catch (error) {
      message.error('Error al eliminar producto');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Agregar Producto
      </Button>
      <Table
        dataSource={products}
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Nombre', dataIndex: 'name', key: 'name' },
          { title: 'Precio', dataIndex: 'price', key: 'price' },
          {
            title: 'Imagen',
            dataIndex: 'image',
            key: 'image',
            render: (text) =>
              text ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}${text}`}
                  alt="product"
                  style={{ width: 50 }}
                />
              ) : (
                'N/A'
              ),
          },
          {
            title: 'Acciones',
            render: (text, record: any) => (
              <Button danger onClick={() => deleteProduct(record.id)}>
                Eliminar
              </Button>
            ),
          },
        ]}
        rowKey="id"
      />

      <Modal
        title="Agregar Producto"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Precio" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="image" label="Imagen del Producto">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
