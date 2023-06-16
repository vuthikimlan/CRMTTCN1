import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getInforUser } from '../../../../services/lead';

function DetailStaff(data) {
  const location = useLocation()
  const [dataStaff, setDataStaff] = useState({})
  const userInfor = location.pathname.split('/')
  const idPath = userInfor[userInfor.length - 1]

  const handleGetInfoStaff = async (idPath) =>{
    getInforUser(idPath).then((res)=>{
      if(res.status === 200) {
        setDataStaff(res?.data?.data)
      }
    })
  }
  useEffect(() =>{
    handleGetInfoStaff(idPath)
  }, [idPath])
  
  return(
    <>
        <Descriptions layout="vertical"  >     
          <Descriptions.Item label="Id" span={2} >{dataStaff?.userId}</Descriptions.Item>
          <Descriptions.Item label="Tên nhân viên" > {dataStaff?.name} </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập" span={2}> {dataStaff?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" > {dataStaff?.date} </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> {dataStaff?.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" > {dataStaff?.address} </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo" span={2}> {dataStaff?.createdDate} </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật"> {dataStaff?.updateDate} </Descriptions.Item>
        </Descriptions>
    </>
  );
} 
export default DetailStaff;