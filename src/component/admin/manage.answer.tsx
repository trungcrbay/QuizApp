import React from 'react';
import { Select, Space, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {
    PlusCircleOutlined, MinusCircleOutlined
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import _ from 'lodash'

interface IAddAnswer {
    answer: string;
    isCorrect: boolean;
    idQuiz: any;
}

const ManageAnswer = (props: any) => {
    const { listQuiz, session } = props;
    const [listQuizMap, setListQuizMap] = React.useState([]);
    const [file, setFile] = React.useState<File | null>(null);
    const [quizId, setQuizId] = React.useState<any>(0);
    const [description, setDescription] = React.useState<string>("");
    const [idQuestion, setIdQuestion] = React.useState<any>(0);
    const [inputData, setInputData] = React.useState<any[]>([])
    const [questions, setQuestions] = React.useState([
        {
            id: uuidv4(),
            description: description,
            image: File,
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

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;

        // Take the previous state (object), and update it
        // by spreading (copying) out the previous object,
        // and adding a new property with the id as key
        // and the value as the value.
        setInputData(prev => ({ ...prev, [id]: value }));
    }

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

    const postNewQuestion = async ({
        quizId,
        description,
        file,
    }: IAddQUestion) => {
        const formData = new FormData();
        //@ts-ignore
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
            setIdQuestion(data.DT.id);
        }
        console.log("data modal: ", data)

    }

    const postNewAnswer = async ({
        isCorrect,
        answer,
        idQuiz,
    }: IAddAnswer) => {
        const res = await fetch(`http://localhost:8081/api/v1/answer`, {
            method: "POST",
            body: JSON.stringify({
                description: answer,
                correct_answer: isCorrect,
                question_id: idQuiz,
            }),
            headers: {
                Authorization: `Bearer ${session.access_token}`
            },
        });

        const data = await res.json();
        if (data) {
            message.success("Create new answer successfully!");
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



    const handleQuestion = (type: any, id: any) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                image: File,
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
            }
        }
    }

    const handleOnChangeQuestion = (type: string, questionId: any, value: any) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        } else if (type === 'ANSWER') {
            let questionsClone = _.cloneDeep(questions);
            console.log("quiestion: ", questionsClone)
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                const checkvari = questionsClone[index];
                console.log("check quesionindex; ", checkvari)
                let answerIndex = questionsClone[index].answers.map((item: any, index: any) => {
                    item.id = questionId;
                    item.description = value;
                    return item;
                })
                console.log("answer Index: ", answerIndex)
            }

        }
    }

    const handlePostNew = async (idQuiz: any) => {
        const questionApi = await Promise.all(
            questions.map(async (questionQuiz: any, index: any) => {
                const test123 = await postNewQuestion({ quizId, description: questionQuiz.description, file })
                console.log(test123);
                // const idQuizs = test123.DT.id;
                await Promise.all(questionQuiz.answers.forEach(async (item: any, index: any) => {
                    console.log("questionQuiz:", questionQuiz)
                    const metmoivailon = await postNewAnswer({
                        isCorrect: item.isCorrect,
                        answer: item.description,
                        idQuiz:item.id,
                    })
                    console.log("fuck you: ", metmoivailon)
                    // console.log("idQuestion: ", idQuestion)
                }))
            })
        );
        return questionApi;
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
                                    <Input size="large" value={item.description}
                                        onChange={(e) => handleOnChangeQuestion('QUESTION', item.id, e.target.value)}
                                        placeholder="Quiz description" style={{ width: '500px' }} />
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <Upload {...propsUpload}>
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </div>
                            </div>
                            {questions && questions[index].answers.map((itemAnswer: any, index: any) => {

                                return (
                                    <div style={{ margin: '15px 0 0 15px' }}>
                                        <Checkbox onChange={onChange} value={item.isCorrect}>
                                            <Input size="large" value={itemAnswer.description} onChange={(e) => handleOnChangeQuestion('ANSWER', item.id, e.target.value)} placeholder={`Answer ${index + 1}`} style={{ width: '500px' }} />
                                        </Checkbox>
                                    </div>
                                )
                            })}
                            <Button type='primary' onClick={handlePostNew} style={{ marginTop: '15px' }}>Add quiz</Button>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default ManageAnswer;