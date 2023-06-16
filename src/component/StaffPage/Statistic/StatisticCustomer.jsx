import React, { useState, useEffect } from 'react';
import {  statisticCustomerOfStaff, getCustomerStaffManager,getListGroupCustomerStaffManager, getListCustomerStaffManager } from '../../../services/lead';
import { Pie } from '@ant-design/plots';


function StatisticCustomerOfStaff () {
  const [data, setData] = useState([])
  const [totalDataCustomer, setTotalDataCustomer] = useState([])
  const [totalDataGroup, setTotalDataGroup] = useState()
  const [totalCustomer, setTotalCustomer] = useState()

  const handleStatistic = () =>{
    statisticCustomerOfStaff().then((res) =>{
      setData(res?.data?.data?.items)
    })
  }

  const handleGetCustomer = () =>{
    getListCustomerStaffManager().then((res) =>{
      setTotalDataCustomer(res?.data?.data?.total)
    })

  }

  const handleGetGroup = () =>{
    getListGroupCustomerStaffManager().then((res)=>{
      setTotalDataGroup(res.data?.data?.total)
    })
  }

  const handleListCustomer = () =>{
    getCustomerStaffManager().then((res) =>{
      setTotalCustomer(res?.data?.data?.total)
    })
}

    useEffect(() =>{
      handleStatistic()
      handleGetCustomer()
      handleGetGroup()
      handleListCustomer()
    },[])

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
      <div style={{display:'flex',}}>
        <div style={{marginRight: 150, marginLeft: 20}}>
          <h1 style={{marginLeft: -113}}>Tổng số khách hàng nhân viên quản lý: {`${totalDataCustomer}`}</h1>
          <h1  style={{marginLeft: -45}}>Tổng số nhóm khách hàng mà nhân viên quản lý: {`${totalDataGroup}`}</h1>
          <h1  style={{marginLeft: 8}}>Tổng số khách hàng thuộc nhóm mà nhân viên quản lý: {`${totalCustomer}`}</h1>
        </div>
        <div>
          <h1>Thống kê trạng thái khách hàng do nhân viên quản lý</h1>
          <Pie {...config} />;
        </div>
      </div>
    </>
  );
};

export default StatisticCustomerOfStaff ;


