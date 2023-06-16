import React from 'react';
import StatisticCustomer from './StatisticCustomer';
import StatisticStatusCus from './StatisticStatusCustomer';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


function StatisticStatus(props) {
    const navigate = useNavigate()
    return (
        <div style={{display:'flex'}}>
            <div style={{margin:50}} >
                <StatisticStatusCus/>
            </div>
            <div style={{marginLeft: '25%',
                        marginTop: 50,
                }}>
                <StatisticCustomer/>
            </div>
            <Button 
                style={{
                    margin: 10
                }}
                onClick={()=>{
                    navigate('/adminpage/statistic')
                }}
            >Quay lại</Button>
        </div>
    );
}

export default StatisticStatus;