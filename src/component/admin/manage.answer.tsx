import React from 'react';
import { Select, Space, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {
    PlusCircleOutlined, MinusCircleOutlined
} from '@ant-design/icons';


const ManageAnswer = (props: any) => {
    const { listQuiz, session } = props;
    const [listQuizMap, setListQuizMap] = React.useState([]);
    const [file, setFile] = React.useState<File | null>(null);
    const [quizId, setQuizId] = React.useState<any>(0);
    const [description, setDescription] = React.useState<string>("");
    const [questions, setQuestions] = React.useState([
        {
            id: uuidv4(),
            description: "",
            image: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                }
            ]
        }
    ])

    const handleChangeQuiz = (value: string) => {
        setQuizId(value);
        console.log(`selected ${value}`);
    };

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

    React.useEffect(() => {

    }, [file])

    console.log("check file: ", file)

    const postNewAnswer = async ({
        quizId,
        description,
        file,
    }: IAddQUestion) => {
        const formData = new FormData();
        formData.append("quiz_id", quizId);
        formData.append("description", description);
        //@ts-ignore
        formData.append("questionImage", file);

        const res = await fetch(`http://localhost:8081/api/v1/question`, {
            method: "POST",
            body: formData,
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`
            },
        });

        const data = await res.json();
        if (data) {
            message.success("Create new quiz successfully!");
        }
        console.log("data modal: ", data)
    }

    const mappingListQuiz = () => {
        const mapListQuiz = listQuiz.map((quiz: any) => {
            return (
                {
                    value: quiz.id,
                    label: quiz.description,
                }
            )
        })
        return mapListQuiz;
    }

    React.useEffect(() => {
        setListQuizMap(mappingListQuiz());
    }, []);

    const handlePostNewAnswer = async () => {
        postNewAnswer({ quizId, description, file })
        console.log("check data before upload: ", quizId, description, file)
    }

    const handleQuestion = (type: any, id: any) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                image: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            {
                let questionClone = questions;
                questionClone = questions.filter((item: any) => item.id !== id)
                setQuestions(questionClone)
                console.log(questionClone)
                console.log(id)
            }
        }
    }

    const handleAnswer = (type: any, id: any) => {
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            }

        }

        if (type === 'REMOVE') {
            {
                let questionClone = questions;
                questionClone = questions.filter((item: any) => item.id !== id)
                setQuestions(questionClone)
                console.log(questionClone)
                console.log(id)
            }
        }
    }

    return (
        <div style={{ width: '100%', overflow: 'auto' }}>
            <h1>Manage Answer</h1>
            <div style={{ color: '#000' }}>
                <Space wrap>
                    <p>Select quiz: </p>
                    <Select
                        defaultValue="Select quiz"
                        style={{ width: 300 }}
                        options={listQuizMap}
                        onChange={handleChangeQuiz}
                    />
                </Space>
                {questions && questions.map((item: any, index: any) => {
                    return (
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <p>Add question: </p>
                                <PlusCircleOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleQuestion('ADD', item.id)} />
                                <MinusCircleOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleQuestion('REMOVE', item.id)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ marginTop: '15px' }}>
                                    <Input size="large" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Quiz description" style={{ width: '500px' }} />
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <Upload {...propsUpload}>
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </div>
                            </div>
                            {questions && questions[index].answers.map((item: any) => {
                                return (
                                    <div style={{ margin: '15px 0 0 15px' }}>
                                        <Input size="large" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`Answer 1`} style={{ width: '500px' }} />
                                        <PlusCircleOutlined style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '15px' }} />
                                        <MinusCircleOutlined style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '15px' }} />
                                    </div>
                                )
                            })}

                        </div>
                    )
                })}

                <Button type='primary' onClick={handlePostNewAnswer} style={{ marginTop: '15px' }}>Add quiz</Button>
            </div>
        </div>
    )
}

export default ManageAnswer;