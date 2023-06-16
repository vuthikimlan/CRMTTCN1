import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StatisticPage(props) {
    const navigate = useNavigate()
    return (
        <>
            <h1>Thống kê</h1>
            <Button classNames='customer'
                style={{
                    padding:50,
                    margin: 20
                }}
                onClick={()=>{
                    navigate('/adminpage/statisticstatuscus')
                }}

            >
                Thống kê trạng thái khách hàng
            </Button>
            <Button className='staff'
                    style={{
                        padding:50,
                        margin: 20
                    }}
                    onClick={()=>{
                        navigate('/adminpage/statisticstaff')
                    }}
            >
                thống kê nhân viên quản lý khách hàng
            </Button>
        </>
    );
}

export default StatisticPage;