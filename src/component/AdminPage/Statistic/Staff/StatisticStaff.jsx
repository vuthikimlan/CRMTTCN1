import React from 'react';
import StatisticSuccess from './StatisticSuccess';
import StatisticNoProcess from './StatisticNoProcess';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


function StatisticStaff(props) {
    const navigate = useNavigate()
    return (
        <div style={{
            margin: 20
        }}>
            <div style={{
                marginBottom:30
            }}>
                <StatisticSuccess/>
            </div>
            <div>
                <StatisticNoProcess/>
            </div>
            <Button 
                onClick={()=>{
                    navigate('/adminpage/statistic')
                }}
            >Quay lại</Button>
        </div>
    );
}

export default StatisticStaff;