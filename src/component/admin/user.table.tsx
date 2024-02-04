"use client";
import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, message } from "antd";
import ModalViewUser from "./moda.view.user";
import ModalUpdateUser from "./modal.update.user";
import ModalAddNewUser from "./modal.add.user";
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from '@mui/system/Box';
import * as XLSX from 'xlsx';

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
  const [pageSize, setPageSize] = useState<number>(3)
  const [current, setCurrent] = useState<number>(1)
  const router = useRouter()

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant`, {
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
      router.refresh()
    }
  };

  const getParticipantPaginate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant?page=${current}&limit=${pageSize}`, {
      method: "GET",
    });
    const data = await res.json();

  };

  useEffect(() => {
    getParticipantPaginate()
  }, [current, pageSize])

  const onChange = (pagination: any) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current)
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
    }
  }

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
              //@ts-ignore
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

  const downloadExcel = (data: any) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  const dataToExport = listUser.map((user: any) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          type="primary"
          onClick={() => {
            showModalAddUser();
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <AddIcon />
          Add New User
        </Button>
        <Button
          type="primary"
          onClick={() => {
            downloadExcel(dataToExport);
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ExitToAppIcon />
          Export
        </Button>
      </Box>
      <Table columns={columns}
        dataSource={listUser}
        onChange={onChange}
        pagination={{
          current: current,
          total: listUser.length,
          pageSize: pageSize,
          pageSizeOptions: [3, 6, 9, 12, 15],
          showSizeChanger: true,
          showTotal: (total: number, range: [number, number]) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
        }}

      />
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
