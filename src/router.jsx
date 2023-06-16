import { createBrowserRouter } from "react-router-dom";
import Login from "./component/Login/Login";
import TableCustomer from "./component/AdminPage/Table/TableCustomer/TableCustomer";

import AdminPage from "./component/AdminPage/Admin/CRMPage";
import TableContent from "./component/AdminPage/Table/TableStaff/TableStaff";
import DetailCustomer from "./component/AdminPage/Table/TableCustomer/Detail/DetailCustomer"
import ListRole from "./component/AdminPage/Table/Bang_Phan_Quyen/ListRole"
import ListUser from "./component/AdminPage/Table/Bang_Phan_Quyen/ListUser"
import TableGroup from "./component/AdminPage/Table/TableGroup/TableGroup";
import DetailStaff from "./component/AdminPage/Table/TableStaff/DetailStaff";
import DetailUser from "./component/AdminPage/Table/Bang_Phan_Quyen/DetailUser/DetailUser";
import Register from "./component/Login/Register/Register";
import StatisticPage from "./component/AdminPage/Statistic/StatisticPage";
import StatisticStatus from "./component/AdminPage/Statistic/Customer/StatisticStatus";
import StatisticStaff from "./component/AdminPage/Statistic/Staff/StatisticStaff";
import StaffPage from "./component/StaffPage/Staff/StaffPage";
import TableCustomerOfStaff from "./component/StaffPage/Table/TableCustomer/TableCustomer";
import DetailCustomerOfStaff from "./component/StaffPage/Table/TableCustomer/Detail/DetailCustomerOfStaff";
import TableGroupOfStaff from "./component/StaffPage/Table/TableGroup/TableGroup";
import ListCustomer from "./component/StaffPage/Table/TableGroup/ListCustomer/ListCustomer";
import StatisticCustomerOfStaff from "./component/StaffPage/Statistic/StatisticCustomer";

export const router = createBrowserRouter(
[
    {
        
        path:'/',
        element:<Login/>,
        
    },

    {
        path:'/register',
        element:<Register/>

    },
    {
        path:'/adminpage',
        element:<AdminPage/>,
        children:[
            {
                path:'customer',
                element:<TableCustomer/>,
                children:[
                    {
                        path: 'detailcustomer/:detailcustomerId',
                        element: <DetailCustomer/>
                    }
                ]
            },
            {
                path:'staff',
                element:<TableContent/>,
                children:[
                    {
                        path:'detailstaff/:detailstaffId',
                        element:<DetailStaff/>
                    }
                ]
            },
            {
                path:'listrole',
                element:<ListRole/>,
            },
            {
                path:'listuser',
                element:<ListUser/>,
                children:[
                    {
                        path:'detailuser/:detailuserId',
                        element:<DetailUser/>
                    }
                ]
            },
            {
                path:'listgroup',
                element:<TableGroup/>
            },
            {
                path:'statistic',
                element:<StatisticPage/>,
            },
            {
                path:'statisticstatuscus',
                element:<StatisticStatus/>,
            },
            {
                path:'statisticstaff',
                element:<StatisticStaff/>
                
            },
        
        ]
    },
    {
        path:'/staffpage',
        element:<StaffPage/>,
        children:[
            {
                path:'customer',
                element:<TableCustomerOfStaff/> ,
                children:[
                    {
                        path: 'detailcustomer/:detailcustomerId',
                        element: <DetailCustomerOfStaff/>
                    }
                ]
            },
            
            {
                path:'listgroup',
                element:<TableGroupOfStaff/>
            },
            {
                path: 'listcustomer',
                element:<ListCustomer/>
            },
            {
                path:'statistic',
                element: <StatisticCustomerOfStaff/> ,
            },
           
            
        ]
    },


]
)