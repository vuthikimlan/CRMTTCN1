import React, { useState } from 'react';
import { Descriptions, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function ProfileUser(props) {

    return (
        <div>
            <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                style={{
                    backgroundColor: '#488ADB',
                    color: '#000000',
                    marginLeft: 100
                  }}
            />
            <Descriptions layout="vertical" >
                <Descriptions.Item label="Họ tên"  span={3}>Nguyễn Thị Liên</Descriptions.Item>
                <Descriptions.Item label="Email"  span={3}>lienltw@gmail.com</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh"  span={3}> 17/02/2002</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ"  span={3}>Từ sơn -  Bắc ninh</Descriptions.Item>
                <Descriptions.Item label="Chức vụ"  span={3}>Admin </Descriptions.Item>
            </Descriptions>
            
        </div>
    );
}

export default ProfileUser;