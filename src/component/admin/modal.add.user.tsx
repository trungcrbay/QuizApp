"use client";
import React, { useState } from "react";
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
interface User {
  email: string;
  password: string;
  username: string;
  role: string;
  image?: string;
}

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const ModalAddNewUser = (props: any) => {
  const { open, setOpen } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  // State to store the file
  const [file, setFile] = useState("");
  // State to store the base64
  const [image, setImage] = useState("");

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      if (fileReader.readAsDataURL && file instanceof Blob) {
        fileReader.readAsDataURL(file);
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const propsUpload: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file);
        console.log("check file list:", info.fileList[0]);
        //@ts-ignore
        setImage(info.fileList[0]);
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

  // When the file is selected, set the file state

  const postNewUser = async ({
    email,
    password,
    username,
    role,
    image,
  }: User) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("image", image);

    const res = await fetch(`http://localhost:8081/api/v1/participant`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data) {
      message.success("Create new user successfully!");
    }
    console.log("check data post: ", data);
  };
  const handleOkAddUser =  () => {
    try{
      // Chuyển đối tượng File thành chuỗi base64
    const base64Img =   toBase64(image);
    // postNewUser({ email, username, role, password, image });
    console.log("chếch image: ", base64Img);
    }catch(e){
      console.log(e)
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New User"
        open={open}
        onOk={handleOkAddUser}
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
            <Col span={12}>
              <Form.Item<FieldType> label="Username">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Password">
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType> label="Email">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Role">
                <Input value={role} onChange={(e) => setRole(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item<FieldType>>
                <Dragger {...propsUpload}>
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
