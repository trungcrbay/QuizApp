'use client'
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UserTable from './user.table';
import AdminDashboard from './dashboard';
const { Header, Sider, Content } = Layout;

const SiderAdmin = (props :any) => {
    const {listUser , dataDashboard} = props;
    console.log("check super list:",listUser);
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const pathname = usePathname()
    const [selectedPage , setSelectedPage] = useState<number>(1);

    if (pathname === '/admin/user' && selectedPage !== 2) {
      setSelectedPage(2);
    }
    
    return (
      <Layout style={{marginTop:'70px'}}>
        <Sider trigger={null} collapsible collapsed={collapsed} >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            //@ts-ignore
            defaultSelectedKeys={`${selectedPage}`}
            style={{background:'var(--bg)',color:'var(--fg)'}}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link href="/admin/dashboard">Dashboard</Link>,

              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link href="/admin/user">Manage Users</Link>,
               
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
               
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: 'nav 4',
               
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
            }}
          >
            
            {pathname === '/admin/user' && <UserTable listUser = {listUser}/>}
            {pathname === '/admin/dashboard' && <AdminDashboard dataDashboard={dataDashboard} />}
             
          </Content>
        </Layout>
      </Layout>
    );
};

export default SiderAdmin;
