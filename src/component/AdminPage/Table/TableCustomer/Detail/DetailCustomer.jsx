import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getInforCustomer } from '../../../../../services/lead';


function DetailCustomer(data) {
  const location = useLocation()
  const [dataCustomer, setDataCustomer] = useState({})
  const userInfor = location.pathname.split('/')
  const idPath = userInfor[userInfor.length - 1]

  const handleGetInfoCustom = async (idPath) =>{
    getInforCustomer(idPath).then((res)=>{
      if(res.status === 200) {
        setDataCustomer(res?.data?.data)
      }
    })
  }
  useEffect(() =>{
    handleGetInfoCustom(idPath)
  }, [idPath])
  return(
    <>
        <Descriptions layout="vertical"  >     
          <Descriptions.Item label="Id" span={2}>{dataCustomer?.customerId}</Descriptions.Item>
          <Descriptions.Item label="Name"> {dataCustomer?.customerName} </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo" span={2}> {dataCustomer?.createdDate} </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật"> {dataCustomer?.updateDate} </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}> {dataCustomer?.phone} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ"> {dataCustomer?.address} </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> {dataCustomer?.email} </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={3}> {dataCustomer?.status?.statusName} </Descriptions.Item>
          <Descriptions.Item label="Tên nhóm khách hàng" span={2}> {dataCustomer?.group?.groupName} </Descriptions.Item>
          <Descriptions.Item label="Người quản lý" span={3}> {dataCustomer?.group?.user?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ghi Chú" span={3}> {dataCustomer?.note} </Descriptions.Item>
        </Descriptions>
    </>
  );
} 
export default DetailCustomer;