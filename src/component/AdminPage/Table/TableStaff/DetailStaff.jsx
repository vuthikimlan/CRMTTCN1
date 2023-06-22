import {  Button, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getInforUser } from '../../../../services/lead';

function DetailStaff(data) {
  const location = useLocation()
  const navigate = useNavigate()
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
          <Descriptions.Item label="Mã Nhân viên" span={2} >{dataStaff?.userId}</Descriptions.Item>
          <Descriptions.Item label="Tên nhân viên" > {dataStaff?.name} </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập" span={2}> {dataStaff?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" > {dataStaff?.date} </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> {dataStaff?.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" > {dataStaff?.address} </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo" span={2}> {dataStaff?.createdDate} </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật"> {dataStaff?.updateDate} </Descriptions.Item>
          <Descriptions.Item span={2}>
            <Button
              onClick={() =>{
                navigate(`/adminpage/customerofstaff/${idPath} `)
                
              }}
            >Danh sách khách hàng </Button>
          </Descriptions.Item>
          <Descriptions.Item>
            <Button
              onClick={() =>{
                navigate(`/adminpage/groupcustomerofstaff/${idPath}`)
              }}
            >Danh sách nhóm khách hàng </Button>
          </Descriptions.Item>
        </Descriptions>

    </>
  );
} 
export default DetailStaff;