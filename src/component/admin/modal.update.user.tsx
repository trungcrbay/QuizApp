"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Image,
  Upload,
  Modal,
  message,
} from "antd";
import type {
  RcFile,
  UploadFile,
  UploadProps,
  UploadChangeParam,
} from "antd/es/upload/interface";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}


const propsImage: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ModalUpdateUser = (props: any) => {
  const { open, onOk, onCancel, listUser, dataUpdate } = props;
  console.log("check data da update modal:", dataUpdate);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const updateParticipant = async () => {
    const res = await fetch(`http://localhost:8081/api/v1/participant`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify({
        id: id,
        username: username,
        role: role,
        image: image,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    updateParticipant();
  }, [username,role,image]);
  return (
    <>
      <Modal
        title="Update User"
        open={open}
        onOk={onOk}
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
            <Col span={12}>
              <Form.Item<FieldType> label="Id">
                <Input value={dataUpdate.id} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Username">
                <Input
                  value={dataUpdate.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType> label="Email">
                <Input value={dataUpdate.email} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Role">
                <Input
                  value={dataUpdate.role}
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
          
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
