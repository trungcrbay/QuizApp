"use client";
import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, message } from "antd";
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import ModalAddNewQuiz from "./modal.add.quiz";
import ModalUpdateQuiz from "./update.quiz";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const QuizTable = (props: any) => {
  const { listUser , listQuiz , session } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isModalAddQuiz, setIsModalAddQuiz] = useState<boolean>(false);
  const router = useRouter()

  const showModalAddQuiz = () => {
    setIsModalAddQuiz(true);
  };

  const showModalUpdate = () => {
    setIsModalUpdate(true);
  };

  const handleOkUpdate = () => {
    setIsModalUpdate(false);
  };

  const handleCancel = () => {
    setIsModalUpdate(false);
    setIsModalOpen(false);
    setDataUpdate({});
  };

  //@ts-ignore

  const deleteQuiz = async (id:number) => {
    //@ts-ignore
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`
      },
    });
    if (res) {
      message.success("Deleted successfully!");
      router.refresh()
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("Cancel");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            onClick={() => {
              showModalUpdate();
              setDataUpdate(record);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            //@ts-ignore
            onConfirm={() => {
              setDataUpdate(record);
              //@ts-ignore
              deleteQuiz(record.id);
            }}
            //@ts-ignore
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          showModalAddQuiz();
        }}
        style={{display:'flex',alignItems:'center'}}
      >
        <AddIcon />
        Add New Quiz
      </Button>
      <Table columns={columns}
        dataSource={listQuiz}
      />
      <ModalAddNewQuiz
        open={isModalAddQuiz}
        setOpen={setIsModalAddQuiz}
        access_token={session.access_token}
      />
      <ModalUpdateQuiz
        dataUpdate={dataUpdate}
        open={isModalUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
        listQuiz={listQuiz}
        access_token={session.access_token}
      />
    </>
  );
};

export default QuizTable;
