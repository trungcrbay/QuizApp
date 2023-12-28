"use client";

import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Modal, Popconfirm, message } from "antd";
import ModalViewUser from "./moda.view.user";
import ModalUpdateUser from "./modal.update.user";
import ModalAddNewUser from "./modal.add.user";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserTable = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isModalAddUser, setIsModalAddUser] = useState<boolean>(false);
  const showModalAddUser = () => {
    setIsModalAddUser(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalUpdate = () => {
    setIsModalUpdate(true);
  };
 

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOkUpdate = () => {
    setIsModalUpdate(false);
  };
  
  const handleCancel = () => {
    setIsModalUpdate(false);
    setIsModalOpen(false);
    setDataUpdate({});
  };

  const deleteParticipant = async (dataUpdate: any) => {
    const res = await fetch(`http://localhost:8081/api/v1/participant`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // ts-ignore
        id: dataUpdate,
      }),
    });
    if (res) {
      message.success("Deleted successfully!");
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            onClick={() => {
              showModal();
              setDataUpdate(record);
            }}
          >
            View
          </Button>
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
              deleteParticipant(record.id);
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

  const { listUser } = props;
  console.log("check super list:", listUser);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          showModalAddUser();
        }}
      >
        Add New User
      </Button>
      <Table columns={columns} dataSource={listUser} />
      <ModalAddNewUser
        open={isModalAddUser}
        setOpen={setIsModalAddUser}
      />
      <ModalViewUser
        title="View User"
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        listUser={listUser}
      />
      <ModalUpdateUser
        dataUpdate={dataUpdate}
        open={isModalUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
        listUser={listUser}
      />
    </>
  );
};

export default UserTable;
