/* eslint-disable no-lone-blocks */
import { ModalForm, ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormSwitch } from '@ant-design/pro-components';
import {ProForm, 
        ProFormText, 
      } from '@ant-design/pro-components';
import moment from 'moment';
import { message } from 'antd';
import { createUser, updateUser, getAllRole } from '../../../../services/lead';
import { useState, useEffect } from 'react';




function AddStaff({onSuccess, openModal, data, onOpenChange}) {
  const [dataRole, setDataRole] = useState([])
  const [switchValue, setSwitchValue] = useState(false)
  
  const handleGetStaff = () =>{
    getAllRole().then((res) =>{
      const role = (res?.data?.data?.items)
      const options = role.map(
        e => {
          return {
            label: e.roleName,
            value: e.roleId
          }
        }
      )
      setDataRole(options)
    })
  }
 
    useEffect(() =>{
      handleGetStaff()
    },[])

  // Hàm tạo khách hàng
  const handleCreatStaff = (values) =>{
    createUser(values).then((res) =>{
      if(res.data.success === true) {
        message.success('Tạo nhân viên thành công');
        onSuccess();
      } else if (res.data.error.code === 2) {
        {
          res.data.error.errorDetailList.map((e) => message.error(e.message));
        }
      }

    })
  }

  const handleUpdateStaff = (values) =>{
    updateUser(data.userId, values).then((res) =>{
      if(res.data.success === true ){
        message.success('Cập nhật thành công')
        onSuccess();
      }else if (res.data.error.code === 2) {
        {
          res.data.error.errorDetailList.map((e) => message.error(e.message));
        }
      }
    })
  }
  return (
    <>
      <ModalForm
        // title='Thêm nhân viên mới '
        title={data?.userId ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if(data?.userId) {
            handleUpdateStaff(values)
          } else{
            handleCreatStaff(values)
          }
        }}
        onOpenChange={onOpenChange}
      >
        <ProForm.Group>
        <ProFormText 
            width="md" 
            name="name" 
            label="Tên nhân viên" 
            placeholder="name" 
          />
          <ProFormText 
            width="md" 
            name="userName" 
            label="Tên đăng nhập" 
            placeholder="name" 
          />
          <ProFormDatePicker 
            width="md" 
            name="date" 
            label="Ngày sinh" 
            placeholder="Ngày sinh"
            fieldProps={
              {
                format:"DD/MM/YYYY",
                transform: (value) => moment(value).format('DD/MM/YYYY')
              }
            }
            
          />
          <ProFormText 
            width="md" 
            name="email" 
            label="E-mail" 
            placeholder="E-mail" 
          />
          <ProFormText 
            width="md" 
            name="address" 
            label="Địa chỉ" 
            placeholder="Địa chỉ" 
          />
          {/* <ProFormSelect 
            width="md" 
            name="isSuperAdmin" 
            valueEnum={{
              0: "Có",
              1: "Không",
              
            }}
            label="Is Admin" 
          /> */}
          <ProFormDigit
            width="md" 
            name="isSuperAdmin" 
            label="Is Admin" 
          />
          <ProFormSelect
            width="md" 
            name={ data?.userId ?  ['role', 'roleId'] : 'roleId' }
            options={dataRole}
            label="Mã vai trò" 
            placeholder="Mã vai trò" 
          />
          
          <ProFormText 
            width="md" 
            name="password" 
            label="Mật khẩu" 
            placeholder="Mật khẩu" 
          />
          {/* <ProFormSwitch
            name='isSuperAdmin'
            label='Is Admin'
            fieldProps={{
              onChange: (checked) =>{
                setSwitchValue(checked)
              }
              
            }} 
          /> */}
          
          
        </ProForm.Group>
       
      </ModalForm>
    </>
  );

}
export default AddStaff;
