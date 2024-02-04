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

const ModalAddNewQuiz = (props: any) => {
  const { open, setOpen, access_token } = props;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
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

  const postNewQuiz = async ({
    description,
    name,
    difficulty,
    file,
  }: IAddQuiz) => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("name", name);
    formData.append("difficulty", difficulty);
    formData.append("quizImage", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    });

    const data = await res.json();
    if (data) {
      message.success("Create new quiz successfully!");
    }

  };

  useEffect(() => {

  }, [file])

  const handleOkAddQuiz = async () => {
    //@ts-ignore
    postNewQuiz({ name, description, difficulty, file });
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New Quiz"
        open={open}
        onOk={() => handleOkAddQuiz()}
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
              <Form.Item<FieldType> label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Description">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Difficulty">
                <Input
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item<FieldType> label="Image">
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

export default ModalAddNewQuiz;
