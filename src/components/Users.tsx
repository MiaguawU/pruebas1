import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(data);
    } catch (error) {
      message.error('Error al cargar usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    if (values.profile_image) {
      formData.append('profile_image', values.profile_image.file);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData);
      message.success('Usuario agregado');
      fetchUsers();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Error al agregar usuario');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
      message.success('Usuario eliminado');
      fetchUsers();
    } catch (error) {
      message.error('Error al eliminar usuario');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Agregar Usuario
      </Button>
      <Table
        dataSource={users}
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Nombre', dataIndex: 'name', key: 'name' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          {
            title: 'Imagen',
            dataIndex: 'profile_image',
            key: 'profile_image',
            render: (text) =>
              text ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}${text}`}
                  alt="profile"
                  style={{ width: 50 }}
                />
              ) : (
                'N/A'
              ),
          },
          {
            title: 'Acciones',
            render: (text, record: any) => (
              <Button danger onClick={() => deleteUser(record.id)}>
                Eliminar
              </Button>
            ),
          },
        ]}
        rowKey="id"
      />

      <Modal
        title="Agregar Usuario"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="profile_image" label="Imagen de Perfil">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
