"use client";
import React from "react";
import { Modal } from "antd";
import { Form, Input, Col, Row, Divider, Image } from "antd";

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

const ModalViewUser = (props: any) => {
  const {  open, onOk, onCancel, dataUpdate } =
    props;

  return (
    <>
      <Modal
        title="View User"
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
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Id">
                <Input
                  value={dataUpdate.id}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} lg={12}>
              <Form.Item<FieldType> label="Username">
                <Input value={dataUpdate.username} disabled />
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
                <Input value={dataUpdate.role} disabled />
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

export default ModalViewUser;
