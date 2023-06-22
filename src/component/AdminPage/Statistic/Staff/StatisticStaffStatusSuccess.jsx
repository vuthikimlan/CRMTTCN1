import React, { useState, useEffect } from 'react';
import { statisticStaffStatusSuccess } from '../../../../services/lead';
import { Column } from '@ant-design/plots';
import {  DatePicker } from 'antd';
import moment from "moment";
const { RangePicker } = DatePicker;


function StatisticStaffStatusSuccess () {
  const [data, setData] = useState([])
  const [selectedDates, setSelectedDates] = useState(null);


  const handleValue = (dates) => {
    setSelectedDates(dates);
  };


  const handleRevenue =  () => {
    if (selectedDates) {
      const dateFrom = selectedDates[0].format("DD/MM/YYYY");
      const dateTo = selectedDates[1].format("DD/MM/YYYY");
      statisticStaffStatusSuccess({ dateFrom: dateFrom, dateTo: dateTo }).then(
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
    data,
    xField: 'type',
    yField: 'sale',
    label: {
    // Vị trí của tên cột
    position: 'middle',
    // 'top', 'bottom', 'middle',
    
    style: {
        fill: '#FFFFFF',
        opacity: 0.6,
    },
    },
    xAxis: {
    label: {
        autoHide: true,
        autoRotate: false,
    },
    },
   
};
  return (
    <>
        <>
        <h1
            style={{
                marginRight: '75%'
            }}
        >Thống kê nhân viên quản lý khách hàng thành công theo tuần </h1></>
        <RangePicker 
            style={{
                marginRight: '80%'
            }}
            format="DD/MM/YYYY"
            onChange={handleValue}
        />
            
            <Column {...config} />

    </>
  );
};

export default StatisticStaffStatusSuccess;



