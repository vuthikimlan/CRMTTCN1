import React, { useState, useEffect } from 'react';
import { statisticCustomer } from '../../../../services/lead';
import { Pie } from '@ant-design/plots';


function StatisticCustomer () {
  const [data, setData] = useState([])
  const handleStatistic = () =>{
    statisticCustomer().then((res) =>{
      setData(res?.data?.data?.items)
    })
  }
    useEffect(() =>{
      handleStatistic()
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
      <><h1>Thống kê trạng thái khách hàng theo tháng 5</h1></>
      <Pie {...config} />
    </>
  );
};

export default StatisticCustomer;


