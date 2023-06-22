import React, { useEffect, useState } from 'react';
import {  Button, Table, Tag, } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { getCustomerStaffManager } from '../../../../../services/lead';
import { useNavigate } from 'react-router-dom';




function ListCustomer(props) {
    const [dataCustomer, setDataCustomer] = useState()
    const navigte = useNavigate()
    const handleGetCustomer = () =>{
        getCustomerStaffManager().then((res) =>{
            setDataCustomer(res?.data?.data?.items)
        })
    }

    useEffect(() =>{
        handleGetCustomer()
    },[])

    const columns = [
        {
          title: 'Tên khách hàng',
          dataIndex: "customerName",
        },
        
        {
          title: 'Số điện thoại',
          dataIndex: "phone",
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
          },
        {
          title: 'Nhân viên quản lý',
          dataIndex:['user', 'name']
        },
        {
          title: 'Ngày tạo',
          dataIndex:'createdDate'
        },
        {
          title:'Ngày cập nhật',
          dataIndex:'updateDate'
        },
        {
          title: 'Trạng thái',
          dataIndex: 'statusName',
          render: (text,record) => {
                return (
                  <>
                    <Tag color={"green"} key={1}>
                        {record?.status?.statusName}
                    </Tag>
                    
                  </> 
                  )
          }
        },
        
        
      ];
    return (
        <div>
            <PageContainer>
                <Table
                    columns={columns}
                    dataSource={dataCustomer}
                />
                <Button
                  onClick={() =>{
                    navigte('/staffpage/listgroup')
                  }}
                >
                  Quay lại
                </Button>
            </PageContainer>
        </div>
    );
}

export default ListCustomer;