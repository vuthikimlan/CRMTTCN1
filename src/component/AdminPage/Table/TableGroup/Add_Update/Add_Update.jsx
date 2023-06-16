/* eslint-disable no-lone-blocks */
import {ProForm, 
    ProFormText, 
    ModalForm,
    ProFormDigit
  } from '@ant-design/pro-components';
import { createGroup, updateGroup } from '../../../../../services/lead';
import { message } from 'antd';



function AddUpdateGroup({onSuccess, openModal, data, onOpenChange}) {
    //Ham tao khach hang
    const handleCreatGroup = (values) =>{
        createGroup(values).then((res) =>{
        if(res.data.success === true) {
            message.success('Tạo nhóm khách hàng thành công')
            onSuccess();
        } else if (res.data.error.code === 2) {
          {
            res.data.error.errorDetailList.map((e) => message.error(e.message));
          }
        }
      })
    }

    // Hàm cập nhật khách hàng
    const handleUpdateGroup = (values) =>{
        updateGroup(data.customerGroupId, values).then((res) =>{
        if(res.status === 200) {
            message.success('Cập nhật thành công')
            onSuccess();
        }
        }).catch((err) =>{
        message.error('Cập nhật thất bại')
        })
    }
return (
<>
  <ModalForm
    // title='Thêm khách hàng mới '
    title={data?.customerGroupId ? 'Chỉnh sửa thông tin nhóm khách hàng' : 'Thêm nhóm khách hàng mới'}
    initialValues={data}
    modalProps={{
      destroyOnClose: true,
    }}
    open={openModal}
    onFinish={async (values) => {
      if(data?.customerGroupId) {
        handleUpdateGroup(values)
      } else{
        handleCreatGroup(values)
      }
    }}
    onOpenChange={onOpenChange}
  >
    <ProForm.Group>
    
    <ProFormText 
        width="md" 
        name="groupName" 
        label="Tên nhóm khách hàng " 
        placeholder="Tên nhóm khách hàng" 
      />  
      

      <ProFormDigit 
        width="md" 
        // name="userId"
        name={data?.customerGroupId ? ["user", "userId"] : "userId"}

        label="Mã người quản lý" 
        placeholder="Mã người quản lý" 
      />
    </ProForm.Group>
   
  </ModalForm>
</>
);

}
export default AddUpdateGroup;