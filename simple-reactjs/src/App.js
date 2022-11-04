import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiServerUrl } from "./constants/URL";

import {
  Table,
  Form,
  Input,
  Button,
  message,
  Popconfirm,
  Modal,
  Space,
} from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [visible, setVisible] = useState(false);

  const [categories, setCategories] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios.get(`${apiServerUrl}/categories`).then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  const columns = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
    },
    { title: "Ten san pham", dataIndex: "name", key: "name" },
    { title: "Mo ta", dataIndex: "description", key: "description" },
    {
      title: "",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              style={{ fontWeight: "600" }}
              onClick={() => {
                setVisible(true);
                setSelectedRow(record);
                formEdit.setFieldValue("name", record.name);
                formEdit.setFieldValue("description", record.description);
              }}
            />
            <Popconfirm
              placement="topLeft"
              title="ban co muon xoa khong?"
              onConfirm={() => {
                const { id } = record;
                axios
                  .delete(`${apiServerUrl}/categories/${id}`)
                  .then((response) => {
                    message.success("xoa thanh cong");
                    setRefresh((r) => r + 1);
                  });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const onFinish = (values) => {
    axios.post(`${apiServerUrl}/categories`, values).then((response) => {
      message.info("tao thanh cong");
      setRefresh((r) => r + 1);
      createForm.resetFields();
    });
  };
  const onFinishFailed = (err) => {};
  const [createForm] = Form.useForm();
  const [formEdit] = Form.useForm();

  return (
    <div>
      <Form
        form={createForm}
        name="Create-category"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Ten sp"
          name="name"
          rules={[{ required: true, message: "Please input name category!" }]}
          hasFeedback
        >
          <Input placeholder="input ten sp" />
        </Form.Item>
        <Form.Item label="Ten sp" name="description">
          <Input placeholder="input description" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        dataSource={categories}
        columns={columns}
        pagination={false}
      />

      <Modal
        title="Chỉnh sửa thông tin danh mục"
        open={visible}
        onOk={() => {
          formEdit.submit();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          form={formEdit}
          name="edit"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            name: "",
            description: "",
          }}
          onFinish={(values) => {
            // SUBMIT
            axios
              .patch(
                "http://localhost:9000/categories/" + selectedRow.id,
                values
              )
              .then((response) => {
                if (response.status === 200) {
                  setRefresh((f) => f + 1);
                  setVisible(false);
                }
              });
            console.log(values);
          }}
          onFinishFailed={(error) => {
            console.error(error);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Tên danh mục: Chưa nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
