import React, { useEffect, useState } from 'react';
import './AdminPage.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
    TeamOutlined, 
    ContactsOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    LogoutOutlined,
    UserOutlined,
    GroupOutlined
  } from '@ant-design/icons';
import { Layout, Menu, Drawer, Dropdown, Button, Space } from 'antd';
import ProfileUser from './ProfileUser/ProfileUser';
import Cookies from 'js-cookie';

  const { Header, Content, Sider } = Layout;

function CRMPage(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openDrawer, setOpenDrawer] = useState()

  // Hàm xử lý đăng xuất
  const handleLogout = () =>{
    // Cookies.remove('jwt');
    navigate('/')
  }

 
  // Ham giu nguyen trang khi tai lai 

  const checkPathname = () =>{
    const pathname = location.pathname;
    if(pathname.includes('/adminpage/staff')){
      return '1';
    }
    if(pathname.includes('/adminpage/customer')){
      return '2';
    }
    if(pathname.includes('/adminpage/listgroup')){
      return '3';
    }
    if(pathname.includes('/adminpage/listrole')){
      return '4';
    }
    if(pathname.includes('/adminpage/statistic')){
      return '5';
    }

  }

  const listItem = [
    {
      label: 'Nhân viên',
      key: '1',
      icon:<TeamOutlined />,
      onClick:() =>{
        navigate('/adminpage/staff')
      }
    },
    {
      label: 'Khách hàng',
      key: '2',
      icon:<ContactsOutlined />,
      onClick:() =>{
        navigate('/adminpage/customer')
      }
    },
    {
      label: 'Nhóm khách hàng',
      key: '3',
      icon:<GroupOutlined />,
      onClick:() => {
        navigate('/adminpage/listgroup')
      }
    },
    {
      label: 'Phân quyền',
      key: '4',
      icon:<UserSwitchOutlined />,
      onClick:() => {
        navigate('/adminpage/listrole')
      }
    },
    
    {
      label: 'Thống kê',
      key: '5',
      icon:<BarChartOutlined />,
      onClick:() =>{
        navigate('/adminpage/statistic')
      }
    },
  
  ];

  const items = [
    {
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      key: '1',
      onClick: () =>{
        setOpenDrawer(true)
                         
      }
    },

    {
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      key: '2',
      onClick: () =>{
        handleLogout()
      }
    }

  ]

      return (
        <div className='abc'>
          <Layout className='layout'>
            <Sider 
              theme="light"
              className='sider'
            >
              <div className="logo1"  >
                <img src="logo.png"  alt="Logo CRM" className='logo1_img' />
                
              </div>
              
              <Menu className='menu_items'
                  mode="inline"
                  items={listItem}
                  defaultSelectedKeys={checkPathname}
                  // onClick={e => setSelectedKey([e.key])}
                  // selectedKeys={selectedKey}
              />
            </Sider>

            <Layout className="site-layout">
              <Header className='header'>
                <div className='header_items'>
                    <p>Xin chào Admin 👋🏼,</p>
                  <div className='btn'>
                    <Dropdown
                      menu={{items}}
                    >
                    <div style={{marginBottom: 10, display: 'flex'}}>
                      <UserOutlined 
                        className='icon_admin'
                      />
                      <p className='title_admin'>Admin</p>

                    </div>

                    </Dropdown>
                  </div>
                </div>
                  
              </Header>
              <Content className='content'>
                <div style={{
                    textAlign: 'center',
                  }}
                >
                    <Outlet/>
                </div>
              </Content>
            </Layout>
           
          </Layout>
          <Drawer
            title="Hồ Sơ"
            open={openDrawer}
            onClose={() =>{setOpenDrawer(false)}} 
            
          >
              <ProfileUser/>
          </Drawer>
        </div>

      );
};

export default CRMPage;