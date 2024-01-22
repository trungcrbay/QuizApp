"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Col,
  Row,
  Divider,
  Upload,
  Image,
  Modal,
  Button,
  message,
} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';


interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};


const ModalUpdateUser = (props: any) => {
  const { open, onCancel, dataUpdate } = props;
  console.log("check data da update modal:", dataUpdate);
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const propsUpload: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log("check file list:", info.fileList[0]);
        //@ts-ignore
        setImage(info.fileList[0].originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (dataUpdate) {
      setUsername(dataUpdate.username);
      setId(dataUpdate.id);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);

  const updateParticipant = async ({ id, username, role, image }: IUpdateUser) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    const res = await fetch(`http://localhost:8081/api/v1/participant`, {
      method: "PUT",
      body: formData
    });
    const data = await res.json();
    console.log(data);
  };

  const handleUpdateParticipant = () => {
    console.log("check data before update: ", id, username, role, image)
    //@ts-ignore
    updateParticipant({ id, username, role, image })
  }

  return (
    <>
      <Modal
        title="Update User"
        open={open}
        onOk={handleUpdateParticipant}
        onCancel={onCancel}
        width={900}
      >
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Id">
                <Input value={dataUpdate.id} disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Username">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Email">
                <Input value={dataUpdate.email} disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Role">
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  width={250}
                  height={250}
                  src={`data:image/png;base64, ${dataUpdate.image}`}
                />
              </div>
            </Col>
          </Row>
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
