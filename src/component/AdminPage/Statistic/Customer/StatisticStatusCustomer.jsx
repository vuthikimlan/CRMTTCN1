import React, { useState, useEffect } from 'react';
import { statisticStatusCustom } from "../../../../services/lead";
import { Pie } from '@ant-design/plots';


function StatisticStatusCus () {
  const [data, setData] = useState([])
  const handleStatistic = () =>{
    statisticStatusCustom().then((res) =>{
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
      <><h1>Thống kê trạng thái khách hàng theo tháng 6</h1></>
      <Pie {...config} />
    </>
  );
};

export default StatisticStatusCus;


