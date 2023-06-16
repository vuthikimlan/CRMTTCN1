import React, { useState, useEffect } from 'react';
import { statisticStaffNoProcess } from "../../../../services/lead";

import { Column } from '@ant-design/plots';

function StatisticNoProcess() {
    const [data, setData] = useState([])
    const handleStatistic = () =>{
        statisticStaffNoProcess().then((res) =>{
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
            <h1>Nhân viên quản lý khách hàng chưa xử lý theo tuần</h1>
        </>
    );
};

export default StatisticNoProcess;