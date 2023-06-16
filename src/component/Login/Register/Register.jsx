/* eslint-disable no-lone-blocks */
import React from 'react';
import { MailOutlined, UserOutlined,LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../login.css'
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/lead';
import { message } from "antd";


function Register(props) {
  const navigate = useNavigate()
  const onFinish = (values) => {
    register(values).then((res) =>{
      console.log(res);
      if(res.data.success === true){
        navigate('/')
        console.log('Đăng ký');
      } else if(res.data?.error?.code === 500) {
          message.error(res.data?.error?.message)
      } else if (res.data.error.code === 2) {
        {
          res.data.error.errorDetailList.map((e) => message.error(e.message));
        }
      }

    })
    
  };

  

  return (
    <div className='loginpage'> 
      <div className='logo'>
        <img src="logocrm1.png" alt="" className='logo_img'/>
        <div className='title_logo'>
          <h1>MLL CRM</h1>
          <p>Bring success to you</p>
        </div>
      </div>
      <Form
        name="normal_login"
        className="login-form forgot-pass"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
          <p>Đăng ký</p>
          <Form.Item
            className='login'
            name="userName"
            rules={[
              {
                required: true,
                message: 'Tên đăng ký phải có ít nhất 6, nhiều nhất 100 kí tự',

              },
            ]}
          >
            <Input 
              className='input'
              prefix={<UserOutlined/>}
              placeholder="Tên tài khoản"
        />
          </Form.Item>
          <Form.Item
            className='login'
            name="email"
            rules={[
              {
                type: 'email',
                message: 'E-mail không hợp lệ',
              },
              {
                required: true,
                message: 'Vui lòng nhập E-mail của bạn',
              },
            ]}
          >
            <Input 
                className='input'
                prefix={<MailOutlined />}
                placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Mật khẩu phải tối thiểu 6 - 20 ký tự ' }]}
            className='login'
          >
            <Input.Password
                className='input'
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="Mật khẩu"
                placeholder="Mật khẩu"
            />
          </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button button">
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item
        >
          <Button 
            type="link" 
            // htmlType="submit" 
            onClick={()=>{
              navigate('/')
            }}
            className='login-form-forgot'
          >
            Đăng nhập
          </Button>
        </Form.Item>

      </Form>
    </div>
  
  );
};

export default Register;
