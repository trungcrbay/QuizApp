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
  
};

const onFinishFailed = (errorInfo: any) => {
   
};


const ModalUpdateQuiz = (props: any) => {
    const { open, onCancel, dataUpdate, access_token } = props;
    const [id, setId] = useState(0);
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

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setId(dataUpdate.id);
            setDescription(dataUpdate.description);
            setDifficulty(dataUpdate.difficulty);
        }
    }, [dataUpdate]);

    const updateQuiz = async ({ id, description, name, difficulty, file }: IUpdateQuiz) => {
        const formData = new FormData();
        //@ts-ignore
        formData.append("id", id);
        formData.append("description", description);
        formData.append("name", name);
        formData.append("difficulty", difficulty);
        formData.append("quizImage", file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        });
        const data = await res.json();
    
    };

    const handleUpdateQuiz = () => {
        //@ts-ignore
        updateQuiz({id, name, description, difficulty, file })
    }

    return (
        <>
            <Modal
                title="Update Quiz"
                open={open}
                onOk={handleUpdateQuiz}
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
                            <Form.Item<FieldType> label="Name">
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Difficulty">
                                <Input value={dataUpdate.difficulty} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Description">
                                <Input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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

export default ModalUpdateQuiz;
