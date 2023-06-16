import React, { useEffect, useState } from 'react';
import './StaffPage.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
    ContactsOutlined,
    BarChartOutlined,
    LogoutOutlined,
    UserOutlined,
    GroupOutlined
  } from '@ant-design/icons';
import { Layout, Menu, Drawer, Dropdown, Button, Space } from 'antd';
import ProfileUser from './ProfileUser/ProfileUser';
import Cookies from 'js-cookie';

  const { Header, Content, Sider } = Layout;

function StaffPage(props) {
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
    
    if(pathname.includes('/staffpage/customer')){
      return '1';
    }
    if(pathname.includes('/staffpage/listgroup')){
      return '2';
    }
    if(pathname.includes('/staffpage/statistic')){
      return '3';
    }

  }

  const listItem = [
    {
      label: 'Khách hàng',
      key: '1',
      icon:<ContactsOutlined />,
      onClick:() =>{
        navigate('/staffpage/customer')
      }
    },
    {
      label: 'Nhóm khách hàng',
      key: '2',
      icon:<GroupOutlined />,
      onClick:() => {
        navigate('/staffpage/listgroup')
      }
    },
    {
      label: 'Thống kê',
      key: '3',
      icon:<BarChartOutlined />,
      onClick:() =>{
        navigate('/staffpage/statistic')
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
                    <p>Xin chào Staff 👋🏼,</p>
                  <div className='btn'>
                    <Dropdown
                      menu={{items}}
                    >
                    <div style={{marginBottom: 10, display: 'flex'}}>
                      <UserOutlined 
                        className='icon_admin'
                      />
                      <p className='title_admin'>Staff</p>

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

export default StaffPage;