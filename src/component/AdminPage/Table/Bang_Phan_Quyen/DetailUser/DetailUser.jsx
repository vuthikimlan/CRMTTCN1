import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { getInforUser } from '../../../../../services/lead';
import { useLocation } from 'react-router';

function DetailUser(data) {
  const location = useLocation()
  const [dataUser, setDataUser] = useState({})
  const userInfor = location.pathname.split('/')
  const idPath = userInfor[userInfor.length - 1]

  const handleGetInfoStaff = async (idPath) =>{
    getInforUser(idPath).then((res)=>{
      if(res.status === 200) {
        setDataUser(res?.data?.data)
      }
    })
  }
  useEffect(() =>{
    handleGetInfoStaff(idPath)
  }, [idPath])
  return(
    <>
        <Descriptions layout="vertical" >     
          <Descriptions.Item label="Tên người dùng"  span={2}> {dataUser?.name} </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập"  span={2}> {dataUser?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" span={2}> {dataUser?.date} </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> {dataUser?.email} </Descriptions.Item>
          <Descriptions.Item label="Vai trò" span={2}> {dataUser?.role?.roleName} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={3}> {dataUser?.address} </Descriptions.Item>
         
        </Descriptions>
    </>
  );
} 
export default DetailUser;