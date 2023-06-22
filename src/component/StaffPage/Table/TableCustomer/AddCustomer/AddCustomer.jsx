/* eslint-disable no-lone-blocks */
import {
  ProForm,
  ProFormText,
  ModalForm,
  ProFormSelect,
} from "@ant-design/pro-components";
import { creatCustom, updateCustomer,getAllGroup, getListUser } from "../../../../../services/lead";
import { message } from "antd";
import { useEffect, useState } from 'react';



function AddCustomer({ onSuccess, openModal, data, onOpenChange }) {
  const [dataGroup, setDataGroup] = useState([])
  const [dataStaff, setDataStaff] = useState([])

  const handleGetGroup = () =>{
    getAllGroup().then((res) =>{
        setDataGroup(res.data?.data?.items)
    })
  }
  
  const handleGetStaff = () =>{
    getListUser().then((res) =>{
      setDataStaff(res?.data?.data?.items)
    })
  }

  const valueEnum = {}
  dataGroup.map((e) =>( 
    valueEnum[e.customerGroupId] = e.groupName
  ))

  const listStaff = {}
  dataStaff.map((e) =>( 
    listStaff[e.userId] = e.name
  ))

  //Ham tao khach hang
  const handleCreatCustomer = (values) => {
    creatCustom(values).then((res) => {
      if (res.data.success === true) {
        message.success("Tạo khách hàng thành công");
        onSuccess();
      } else if (res.data.error.code === 2) {
        {
          res.data.error.errorDetailList.map((e) => message.error(e.message));
        }
      }
    });
  };

  // Hàm cập nhật khách hàng
  const handleUpdateCustomer = (values) => {
    updateCustomer(data.customerId, values)
      .then((res) => {
        if (res.data.success === true) {
          message.success("Cập nhật thành công");
          onSuccess();
        }else if (res.data.error.code === 2) {
          {
            res.data.error.errorDetailList.map((e) => message.error(e.message));
          }
        }
      })
    };
      
  

    
  useEffect(() =>{
    handleGetGroup()
    handleGetStaff()
    },[])

  return (
    <>
      <ModalForm
        title={
          data?.customerId ? "Chỉnh sửa thông tin khách hàng"
            : "Thêm khách hàng mới"
        }
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.customerId) {
            handleUpdateCustomer(values);
          } else {
            handleCreatCustomer(values);
          }
        }}
        onOpenChange={onOpenChange}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="customerName"
            label="Tên khách hàng"
            placeholder="Tên khách hàng"
          />

          <ProFormText
            width="md"
            name="phone"
            label="Số điện thoại"
            placeholder="phone"
          />

          <ProFormText
            width="md"
            name="email"
            label="E-mail"
            placeholder="E-mail"
          />
          <ProFormText
            width="md"
            name="note"
            label="Ghi chú"
            placeholder="ghi chú"
          />
          <ProFormText
            width="md"
            name="address"
            label="Địa chỉ"
            placeholder="Địa chỉ"
          />
          <ProFormSelect
            width="md"
            // name={data?.customerId ? ["status", "statusId"] : "status"}
            name='status'
            valueEnum={{
              1: "Tiềm Năng",
              2: "Thành công",
              3: "Chờ tư vấn",
              4: "Chưa xử lý",
              5: "Không quan tâm",
            }}
            label="Trạng thái"
            placeholder="Trạng thái"
          />

          <ProFormSelect
            width="md"
            valueEnum={valueEnum}
            // name={data?.customerId ? ["group", "customerGroupId"] : "group"}
            name='group'
            label="Nhóm khách hàng"
            placeholder="nhóm"
          />
          <ProFormSelect
            width="md"
            valueEnum={listStaff}
            // name={data?.customerId ? ["user", "name"] : "user"}
            name="user"
            label="Người quản lý"
            placeholder="Người quản lý"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}
export default AddCustomer;
