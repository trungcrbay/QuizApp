import React from 'react';
import { Select, Space, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface IAddQUestion {
    quizId: number;
    description: string;
    file: File | null;
}

const ManageQuestion = (props: any) => {
    const { listQuiz, session } = props;
    const [listQuizMap, setListQuizMap] = React.useState([]);
    const [file, setFile] = React.useState<File | null>(null);
    const [quizId, setQuizId] = React.useState<any>(0);
    const [description, setDescription] = React.useState<string>("");

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

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/question`, {
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

    return (
        <div style={{width:'100%',overflow:'auto'}}>
            <h1>Manage Question</h1>
            <div style={{ marginTop: '20px' }}>
                <Space wrap>
                    <p>Select quiz: </p>
                    <Select
                        defaultValue="Select quiz"
                        style={{ width: 300 }}
                        options={listQuizMap}
                        onChange={handleChangeQuiz}
                    />
                </Space>
                <div style={{ marginTop: '20px' }}>
                    <p>Add question: </p>
                    <div style={{ marginTop: '15px' }}>
                        <Input size="large" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Quiz description" style={{ width: '50%' }} />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <Upload {...propsUpload}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </div>
                </div>
                <Button type='primary' onClick={handlePostNewAnswer} style={{marginTop:'15px'}}>Add quiz</Button>
            </div>
        </div>
    )
}

export default ManageQuestion;