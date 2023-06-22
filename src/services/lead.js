import axios from './request'


// ************Đăng nhập **********
export const login = ({userName,password}) => {
    return axios.post(`/auth/login`, {userName,password})
}

// ******** Đăng ký ********
export const register = ({userName, password, email}) =>{
    return axios.post('/auth/register', {userName, password, email})
}

// *************** Khách hàng ***************

// API tạo khách hàng
export const creatCustom = (values) => {
    return axios.post(`/customer`, values)
}
// API lấy tất cả các khách hàng
export const getListCustomer = () =>{
    return axios.get('/customer/all')
}

// API lấy thông tin chi tiết của từng khách hàng
export const getInforCustomer = (id)=>{
    return axios.get(`/customer/${id}`
    )
}

// Update thông tin khách hàng
export const updateCustomer = (customerId, values) =>{
    return axios.put(`/customer/${customerId}`, values)
}

// Xóa từng khách hàng
export const delCustomer = (customerId)=>{
    return axios.delete(`/customer/${customerId}`)
}

// Xóa tất cả các khách hàng 
export const delAllCustomer = (ids) =>{
    return axios.delete('/customer/delete/all',{data :  ids} )
}

// Lọc thông tin khách hàng
export const filterCustomer = (values) =>{
    const customValue = {
        start: 0,
        limit: 10,
        customerName: values?.customerName,
    }
   
    console.log("data ",values)
    return axios.post('/customer/filter', customValue)
}

// *************** Trạng thái khách hàng *****
export const statusCustomer = () =>{
    return axios.get('/status/all')
}

//  ************* Người dùng ***************

// API tạo người dùng
export const createUser = (values) => {
    return axios.post(`/user`,  values)
}
// API lấy tất cả các người dùng
export const getListUser = () =>{
    return axios.get('/user/all')
}

// API lấy thông tin chi tiết của từng người dùng
export const getInforUser = (id)=>{
    return axios.get(`/user/${id}`
    )
}

// Update thông tin người dùng
export const updateUser= (userId, values) =>{
    return axios.put(`/user/${userId}`, values)
}

// Xóa từng người dùng
export const delUser = (userId)=>{
    return axios.delete(`/user/${userId}`)
}

// Xóa nhiều  người dùng 
export const delAllUser = (ids) =>{
    return axios.delete('/user/delete/all',{data :  ids} )
}

// Lọc thông tin người dùng
export const filterUser = (values) =>{
    const userValue = {
        start: 0,
        limit: 10,
        name: values?.name
    }
    console.log('data', userValue);
    return axios.post('/user/filter', userValue)
}

export const customerOfStaff = (userId) =>{
    return axios.get(`/user/manager/customers/${userId}`)
}

export const groupCustomerOfStaff = (userId) =>{
    return axios.get(`/user/manager/group/${userId}`)
}

// *********** Quyền và vai trò của User *******

// Tất cả các quyền của User
export const getAllRole = () =>{
    return axios.get('/role/all')
}

// Chi tiết về vai trò của User
export const getInforRole = (id) =>{
    return axios.get(`/role/${id}`)
}

// ************ Nhóm Khách hàng *********

// tất cả nhóm khách hàng
export const getAllGroup = () =>{
    return axios.get('/group/all')
}

// Tạo nhóm khách hàng
export const createGroup = (values) => {
    return axios.post(`/group`,  values)
}

// Update thông tin nhóm khách hàng
export const updateGroup= (customerGroupId, values) =>{
    return axios.put(`/group/${customerGroupId}`, values)
}

// Xóa nhóm khách hàng
export const delGroup = (customerGroupId)=>{
    return axios.delete(`/group/${customerGroupId}`)
}

// ************* Quyền ***************

export const permissionUser = () =>{
    return axios.get('/permission/all')
}

export const createRole = (values) =>{
    return axios.post('/role', values)
}

export const delRole = (roleId)=>{
    return axios.delete(`/role/${roleId}`)
}
// ************* Thống Kê ************
export const statisticStatusCustom = () =>{
    return axios.get('/statistics/customer/status')
}

export const statisticCustomer = () =>{
    return axios.get('/statistics/customer/status1')
}

export const statisticAllCustomer = (date) =>{
    return axios.post('/statistics/customer/all-status', date)
}


export const statisticStaffSuccess = ()=>{
    return axios.get('/statistics/staff')
}

export const statisticStaffNoProcess = ()=>{
    return axios.get('/statistics/staff1')
}

export const statisticStaffStatusSuccess = (date)=>{
    return axios.post('/statistics/staff/status-success',date)
}

export const statisticStaffStatus = (date)=>{
    return axios.post('/statistics/staff/status-4', date)
}

export const statisticsCustomerOfStaff = (date)=>{
    return axios.post('/statistics/customerOf/staff1', date)
}


//************* API của nhân viên *********

// Những khách hàng thuộc nhân viên quản lý
export const getListCustomerStaffManager = () =>{
    return axios.get('/user/manager-customers')
}

// Nhóm khách hàng thuộc nhân viên quản lý
export const getListGroupCustomerStaffManager = () =>{
    return axios.get('/user/manager-group')
}

// Khách hàng trong nhóm do nhân viên quản lý
export const getCustomerStaffManager = () =>{
    return axios.get('/user/manager-customer')
}

// Thống kê khách hàng do nhân viên quản lý
export const statisticCustomerOfStaff = ()=>{
    return axios.get('/statistics/customerOf/staff')
}