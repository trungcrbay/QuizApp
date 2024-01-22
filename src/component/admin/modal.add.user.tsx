"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Form, Input, Col, Row, Divider, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
const { Dragger } = Upload;

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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalAddNewUser = (props: any) => {
  const { open, setOpen } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const propsUpload: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log("check file list:", info.fileList[0]);
        //@ts-ignore
        setFile(info.fileList[0].originFileObj);
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

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5KB = file.size / 1024 / 1024 < 2;
    if (!isLt5KB) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt5KB;
  };

  useEffect(() => {

  }, [file])

  const postNewUser = async ({
    email,
    password,
    username,
    role,
    file,
  }: IAddUser) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", file);

    const res = await fetch(`http://localhost:8081/api/v1/participant`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data) {
      message.success("Create new user successfully!");
    }
    console.log("data modal: ", data.DT)
  };

  const handleOkAddUser = async () => {
    console.log("chekc data before upload: ", email, username, role, password, file)
    //@ts-ignore
    postNewUser({ email, username, role, password, file });
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New User"
        open={open}
        onOk={() => handleOkAddUser()}
        onCancel={handleCancel}
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
              <Form.Item<FieldType> label="Username" style={{ width: '100%' }}>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12} style={{ width: '100%' }}>
              <Form.Item<FieldType> label="Password">
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} lg={12} style={{ width: '100%' }}>
              <Form.Item<FieldType> label="Email">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12} style={{ width: '100%' }}>
              <Form.Item<FieldType> label="Role">
                <Input value={role} onChange={(e) => setRole(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item<FieldType> label="Image">
                <Dragger {...propsUpload}
                  beforeUpload={beforeUpload}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                  <p className="ant-upload-hint">
                    You can upload images with a size of less than 5KB for website performance.
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
