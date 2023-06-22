import React, { useEffect, useState } from "react";
import {  Button, Form} from 'antd';
import { ProFormDatePicker, ProFormSelect,ProFormDateRangePicker  } from '@ant-design/pro-components';
import {ProForm, 
    ProFormText, 
  } from '@ant-design/pro-components';
 
import moment from 'moment';
import { statusCustomer } from "../../../../services/lead";

function FilterCustomer({onSearch, getCustomer, }) {
    const [customerName, setCustomerName] = useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('')


    const [statusData, setStatusData] = useState([])
    const handleFilterCustom = (values) => {
        onSearch(values) 
    };

    const handleGetCustomer = (values) =>{
        getCustomer(values)
    }
    // Hàm lấy tất cả các trạng thái của khách hàng
    const handleGetStatus = () =>{
        statusCustomer().then((res) =>{
            const status = res?.data?.data?.items
            const option = status.map(
                e => {
                    return { label: e.statusName, value: e.statusId}
                }
            )
            setStatusData(option)
        })
    }


    // console.log(statusData);

    useEffect(() =>{
        handleGetStatus()
    },[])

    return(
        <>
            <h1 style={{marginTop: 0}}>Lọc</h1>
            <h3>Lọc theo</h3>
            <ProForm
                onFinish={handleFilterCustom}

                submitter={false}
                onReset={(e) => {
                    console.log(e);
                }}
                
            >
                <ProFormText 
                    width="md" 
                    name="customerName" 
                    label="Tên khách hàng" 
                    placeholder="Tên khách hàng" 
                    value={customerName}
                    onChange={(e) =>{setCustomerName(e.target.value)
                    }}
                />
                <ProFormDatePicker 
                    width="md" 
                    name="dateFrom" 
                    
                    label="Ngày tạo" 
                    placeholder="Ngày tạo"
                    fieldProps={
                    {
                        format:"DD/MM/YYYY",
                        transform: (value) => moment(value).format('DD/MM/YYYY')
                    }}
                        value={dateFrom}
                        onChange={(createDate) =>{setDateFrom(createDate)
                        }}
                    />
                <ProFormDatePicker 
                    width="md" 
                    name="dateTo" 
                    label="Ngày cập nhật" 
                    placeholder="Ngày cập nhật"
                    fieldProps={
                    {
                        format:"DD/MM/YYYY",
                        transform: (value) => moment(value).format('DD/MM/YYYY')
                    }}
                    value={dateTo}
                    onChange={(updateDate) =>{setDateTo(updateDate)}}
                    />
                     {/* <ProFormDateRangePicker
                        width="md"
                        value={[dateFrom, dateTo]}
                        name={['dateFrom', 'dateTo']}
                        label="Lọc theo ngày"
                        format= "DD/MM/YYYY"
                        transform={(value) => moment(value).format('DD/MM/YYYY')}
                    /> */}
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

                    <ProFormSelect
                        name='statusId'
                        label = "Trạng thái của khách hàng"
                        options={statusData}
                        mode="multiple"
                    />
                  
                    <Form.Item>
                        <Button type="primary" htmlType="submit" 
                          
                        >Lọc</Button>
                        <Button 
                            style={{backgroundColor:'#fff', 
                                    color:'#000',
                                    marginLeft:5,
                                    border:'1px solid #d9d9d9'
                                    
                                }}
                            type="primary" 
                            onClick={() =>{
                                handleGetCustomer()
                            }} 
                            // onCancel={handleCancel}
                            >Hủy</Button>
                    </Form.Item>  

            </ProForm>
            
            
        </>
    );
};

export default FilterCustomer;