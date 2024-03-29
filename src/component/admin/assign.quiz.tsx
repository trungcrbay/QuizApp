import React from 'react';
import { Select, Space, Button, message } from 'antd';

const AssignQuiz = (props: any) => {
    const { listQuiz, listUser, session } = props;
    const [listQuizMap, setListQuizMap] = React.useState([]);
    const [listUserMap, setListUserMap] = React.useState([]);
    const [quizId, setQuizId] = React.useState<any>(0);
    const [userId, setUserId] = React.useState<any>(0);

    const handleChangeQuiz = (value: string) => {
        setQuizId(value);
      
    };

    const handleChangeUser = (value: string) => {
        setUserId(value)
      
    };

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

    const mappingListUser = () => {
        const mapListUser = listUser.map((user: any) => {
            return (
                {
                    value: user.id,
                    label: user.email,
                }
            )
        })
        return mapListUser;
    }

    React.useEffect(() => {
        setListUserMap(mappingListUser());
        setListQuizMap(mappingListQuiz());
    }, []);

    const assignQuizToParticipant = async ({ quizId, userId }: IAssignQuiz) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz-assign-to-user`, {
            method: "POST",
            body: JSON.stringify({
                // ts-ignore
                quizId: quizId,
                userId: userId,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`
            },
        });
        const data = await res.json();
        if (data && data.EC === 0) {
            message.success(data.EM)
        }else{
            message.error(data.EM)
        }

    };

    return (
        <div>
            <Space wrap>
                <Select
                    defaultValue="Select quiz"
                    style={{ width: 300 }}
                    onChange={handleChangeQuiz}
                    options={listQuizMap}
                />
                <span style={{color:'#000'}}>assign to</span>
                <Select
                    defaultValue="Select participant"
                    style={{ width: 300 }}
                    onChange={handleChangeUser}
                    options={listUserMap}
                />
            </Space>
            <div style={{ marginTop: '20px' }}>
                <Button type='primary' onClick={() => {
                    assignQuizToParticipant({quizId,userId})
                }}>
                    Assign
                </Button>
            </div>
        </div>
    )
}

export default AssignQuiz;