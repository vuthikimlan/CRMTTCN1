import React from 'react';
import StatisticSuccess from './StatisticSuccess';
import StatisticNoProcess from './StatisticNoProcess';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import StatisticStaffStatusSuccess from './StatisticStaffStatusSuccess';
import StatisticStaffStatus from './StatisticStaffStatus';


function StatisticStaff(props) {
    const navigate = useNavigate()
    return (
        <div style={{
            margin: 20
        }}>
            <Button 
                onClick={()=>{
                    navigate('/adminpage/statistic')
                }}
            >Quay lại</Button>
            <div style={{
                marginBottom:30
            }}>
                <StatisticSuccess/>
            </div>
            <div>
                <StatisticNoProcess/>
            </div>
            <div 
                style={{marginTop: 100}}
            >
                <StatisticStaffStatusSuccess/>
            </div>
            <div
                style={{marginTop: 100}}
            >
                <StatisticStaffStatus/>
            </div>
        </div>
    );
}

export default StatisticStaff;