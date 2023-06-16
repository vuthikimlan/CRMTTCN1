import React, {  useState } from "react";
import {  Button, Form} from 'antd';
import { ProFormDatePicker,  } from '@ant-design/pro-components';
import {ProForm, 
    ProFormText, 
  } from '@ant-design/pro-components';
import moment from 'moment';

function FilterCustomer({onSearch, getStaff}) {
    const [userName, setUserName] = useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('')


      const handleFilterStaff = (values) => {
        onSearch(values) 
    };

    const handleGetUser = (values) =>{
        getStaff(values)
    }
    
    return(
        <>
            <h1 style={{marginTop: 0}}>Lọc</h1>
            <h3>Lọc theo</h3>

            <ProForm
                onFinish={handleFilterStaff}
                submitter={false}
                onReset={(e) => {
                    console.log(e);
                }}
            >
                <ProFormText 
                    width="md" 
                    name="name" 
                    label="Tên nhân viên" 
                    placeholder="Tên nhân viên" 
                    value={userName}
                    onChange={(e) =>{setUserName(e.target.value)
                    }}
                />
                <ProFormDatePicker 
                    width="md" 
                    name="createdDate" 
                    label="Ngày tạo" 
                    placeholder="Ngày tạo"
                    fieldProps={
                        {
                            format:"DD/MM/YYYY",
                            transform: (value) => moment(value).format('DD/MM/YYYY')
                        }
                    }
                    value={dateFrom}
                    onChange={(createDate) =>{setDateFrom(createDate)
                        }}
                />
                <ProFormDatePicker 
                    width="md" 
                    name="updateDate" 
                    label="Ngày cập nhật" 
                    placeholder="Ngày cập nhật"
                    fieldProps={
                        {
                            format:"DD/MM/YYYY",
                            transform: (value) => moment(value).format('DD/MM/YYYY')
                        }
                    }
                    value={dateTo}
                    onChange={(updateDate) =>{setDateTo(updateDate)}}
                />
                <ProFormText 
                    width="md" 
                    name="address" 
                    label="Địa chỉ" 
                    placeholder="Địa chỉ" 
                    value={address}
                    onChange={(e) =>{setAddress(e.target.value)}}
                />
                <ProFormText 
                    width="md" 
                    name="email" 
                    label="Email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) =>{setEmail(e.target.value)}}
                />
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >Lọc</Button>
                        <Button 
                            style={{backgroundColor:'#fff', 
                                    color:'#000',
                                    marginLeft:5,
                                    border:'1px solid #d9d9d9'
                                    
                                }}
                            type="primary" 
                            onClick={() =>{
                                handleGetUser()
                            }}
                            >Hủy</Button>
                    </Form.Item> 
            
            </ProForm>          
            
        </>
    );
};

export default FilterCustomer;