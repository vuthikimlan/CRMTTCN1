import React, { useState, useEffect } from 'react';
import { statisticsCustomerOfStaff } from '../../../services/lead';
import { Pie } from '@ant-design/plots';
import {  DatePicker } from 'antd';
const { RangePicker } = DatePicker;


function StatisticCustomerofStaff () {
  const [data, setData] = useState([])
  const [selectedDates, setSelectedDates] = useState(null);


  const handleValue = (dates) => {
    setSelectedDates(dates);
  };

  console.log("Dữ liệu",data);

  const handleRevenue =  () => {
    if (selectedDates) {
      const dateFrom = selectedDates[0].format("DD/MM/YYYY");
      const dateTo = selectedDates[1].format("DD/MM/YYYY");
      statisticsCustomerOfStaff({ dateFrom: dateFrom, dateTo: dateTo }).then(
        (res) => {
          setData(res?.data?.data?.items);
        }
      );

      console.log("Start date:", dateFrom);
      console.log("End date:", dateTo);
    }
  };
  useEffect(() => {
    handleRevenue();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

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
        <><h1
            style={{
                marginRight: '70%'
            }}
        > Số khách hàng do nhân viên đó quản lý </h1></>
        <RangePicker 
            style={{
                marginRight: '70%'
            }}
            format="DD/MM/YYYY"
            onChange={handleValue}
        />
            
        <Pie {...config} />;
    </>
  );
};

export default StatisticCustomerofStaff;



