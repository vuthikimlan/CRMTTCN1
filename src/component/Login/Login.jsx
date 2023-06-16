import React, {useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,  } from 'antd';
import Cookies from 'js-cookie';
import './login.css';
import {  useNavigate } from 'react-router-dom';
import { login } from '../../services/lead';

function Login(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResgister = () => {
    // Đưa đến trang đăng ký
    navigate('/register') 
  }
  const onFinish = (values) => {
    setLoading(true);
    login(values).then((res) => {
      if(res.status === 200) {
        Cookies.set('jwt', res?.data?.data?.jwt);
        setLoading(false);
        
        if(res.data.data.roles.includes("ADMIN")){
          navigate('/adminpage/staff')
        } else if(res.data.data.roles.includes("ADMIN_1")){
          navigate('/adminpage/staff')
        }
        else navigate('/staffpage/customer')
        

      }
    }).finally(() => {
      setLoading(false)
    })
  };

 

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        className="login-form"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
          <p >Đăng Nhập</p>
          {/* {contextHolder} */}
        <Form.Item
          name="userName"
          rules={[{ 
            required: true, 
            message: 'Tên tài khoản tối thiểu 6 ký tự' }]}
          className='login'
        >
          <Input 
              className='input'
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Tên tài khoản" />
              
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
          
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-form-button button"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
        <Button 
          type="link" 
          className='login-form-forgot'
          onClick={() => {
            handleResgister()
          }}
        >
          Đăng ký
        </Button>
        </Form.Item>
    </Form>
    
    </div>
  
  );
};

export default Login;
