/* eslint-disable no-lone-blocks */
import { ModalForm, ProForm, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import {   message  } from 'antd';
import { createRole, permissionUser } from '../../../../../services/lead';
import { useEffect, useState } from 'react';
import "./style.css"

function CreateRole({openModal, onOpenChange}) {
    const [permissions, setPermissions] = useState([]);
    const [switchValue, setSwitchValue] = useState(false)

    const handlePermission = () =>{
      permissionUser().then((res) =>{
        const permission = res?.data?.data?.items
        const options = permission.map(
          e => {
            return{
              label: e.permissionName, value: e.permissionId
            }
          }
        )
        setPermissions(options)
      })

    }

  // Hàm tạo role
  const handleCreatRole = (values) =>{
    createRole(values).then((res) =>{
      if(res.data.success === true){
        message.success("Tạo vai trò thành công")
      }else if (res.data.error.code === 2) {
        {
          res.data.error.errorDetailList.map((e) => message.error(e.message));
        }
      }
    })
  }

  useEffect(() =>{
    handlePermission()
  }, [])

    
    return(
        <>
          <ModalForm
            title='Tạo vai trò '
            open={openModal}
            onFinish={(values)=>{
              handleCreatRole(values)
            }}
            onOpenChange={onOpenChange}
          >
             <ProForm.Group>
                  <ProFormText
                    name="roleName"
                    label="Tên vai trò"
                    width="md"
                    placeholder="Nhập tên vai trò"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên vai trò"
                      }
                    ]}
                  />
                  <ProFormTextArea 
                    width="xl" 
                    label="Mô tả" 
                    name="descriptionRole" 
                  />
                  <ProFormSwitch
                    name='status'
                    label='Kích hoạt'
                    fieldProps={{
                      onChange: (checked) =>{
                        setSwitchValue(checked)
                      }
                    }} 
                  />
                
                  <ProFormSelect
                    label="Mã Quyền"
                    width="md"
                    name='permissionIds'
                    options={permissions}
                    mode='multiple'
                  />
            </ProForm.Group>
          </ModalForm>
        </>
    );
};
export default CreateRole;