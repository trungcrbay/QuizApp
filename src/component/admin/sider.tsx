'use client'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined, DashboardOutlined,
  LaptopOutlined, NotificationOutlined, FolderAddOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UserTable from './user.table';
import AdminDashboard from './dashboard';
import QuizTable from './quiz.table';
import AssignQuiz from './assign.quiz';
import type { MenuProps } from 'antd';
import './admin.css'
import ManageAnswer from './manage.answer';
import ManageQuestion from './manage.question';

const { Header, Sider, Content } = Layout;


const SiderAdmin = (props: any) => {
  const { listUser, dataDashboard, listQuiz, session } = props;
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname()
  const [selectedPage, setSelectedPage] = useState<number>(1);

  if (pathname === '/admin/user' && selectedPage !== 2) {
    setSelectedPage(2);
  }

  if (pathname === '/admin/quiz' && selectedPage !== 3) {
    setSelectedPage(3);
  }

  if (pathname === '/admin/answer' && selectedPage !== 4) {
    setSelectedPage(4);
  }

  if (pathname === '/admin/question' && selectedPage !== 5) {
    setSelectedPage(5);
  }

  if (pathname === '/admin/assign' && selectedPage !== 6) {
    setSelectedPage(6);
  }

  return (
    <Layout style={{ marginTop: '70px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          //@ts-ignore
          defaultSelectedKeys={`${selectedPage}`}
          style={{ color: '#fff' }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link href="/admin" shallow>Dashboard</Link>,
            },
            {
              key: '2',
              icon: <UserOutlined style={{ color: '#fff' }} />,
              label: <Link href="/admin/user" shallow style={{ color: '#fff' }}>Manage Users</Link>,
              children: [
                {
                  key: '3',
                  icon: <UploadOutlined style={{ color: '#fff' }} />,
                  label: <Link href="/admin/quiz" shallow style={{ color: '#fff' }}>Manage Quiz</Link>,

                },
                {
                  key: '4',
                  icon: <UploadOutlined style={{ color: '#fff' }} />,
                  label: <Link href="/admin/answer" shallow style={{ color: '#fff' }}>Manage Answer</Link>,
                },
                {
                  key: '5',
                  icon: <UploadOutlined style={{ color: '#fff' }} />,
                  label: <Link href="/admin/question" shallow style={{ color: '#fff' }}>Manage Question</Link>,
                },
              ]
            },

            {
              key: '6',
              icon: <FolderAddOutlined />,
              label: <Link href="/admin/assign" shallow style={{ color: '#fff' }}>Assign Quiz</Link>,
            },
          ]}
        />

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >

          {pathname === '/admin/user' && <UserTable listUser={listUser} />}
          {pathname === '/admin/quiz' && <QuizTable listUser={listUser} listQuiz={listQuiz} session={session} />}
          {pathname === '/admin/answer' && <ManageAnswer listQuiz={listQuiz} session={session} />}
          {pathname === '/admin/question' && <ManageQuestion listQuiz={listQuiz} session={session} />}
          {pathname === '/admin/assign' && <AssignQuiz listQuiz={listQuiz} listUser={listUser} session={session} />}
          {pathname === '/admin' && <AdminDashboard dataDashboard={dataDashboard} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderAdmin;
