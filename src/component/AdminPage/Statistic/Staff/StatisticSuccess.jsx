import React, { useState, useEffect } from 'react';
import { statisticStaffSuccess } from "../../../../services/lead";

import { Column } from '@ant-design/plots';

function StatisticSuccess() {
    const [data, setData] = useState([])
    const handleStatistic = () =>{
        statisticStaffSuccess().then((res) =>{
          setData(res?.data?.data?.items)
        })
      }
        useEffect(() =>{
            handleStatistic()
        },[])


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
            <Column {...config} />
            <h1>Nhân viên quản lý khách hàng thành công theo tuần</h1>
        </>
    );
};

export default StatisticSuccess;