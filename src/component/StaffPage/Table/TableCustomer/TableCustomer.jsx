import { Button,  Input,  Space, Table, Tag, Modal, Drawer, Popover } from 'antd';
import {FilterOutlined, CloseOutlined,SolutionOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {  PageContainer } from '@ant-design/pro-components'
import {  useEffect, useState } from 'react';
import '../Table.css'

import {  useNavigate } from 'react-router-dom';
import AddCustomer from './AddCustomer/AddCustomer';
import DetailCustomer from './Detail/DetailCustomerOfStaff';
import { delAllCustomer, delCustomer, filterCustomer, getListCustomerStaffManager } from '../../../../services/lead';
import FilterCustomer from './FilterCustomer';

// import DetailCustomer from '../../Modal/Detail/DetailCustomer';

function TableCustomerOfStaff(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const [openDrawer, setOpenDrawer] = useState()
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([])
  const [currentCustomer, setCurrentCustomer] = useState({})
  const [searchData, setSearchData] = useState()
  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('newSelectedRowKeys', newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // console.log(dataCustomer);
  // console.log(hasSelected);

  const showhowConfirm = () => {
    confirm({
      title: 'Xoá khách hàng ',
      content: 'Việc này sẽ xóa khách hàng được chọn. Bạn có chắc chắn muốn xóa?',
      onOk(){
        handleDeleteAll()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClose = () =>{
    setOpenDrawer(false)
  }

  //Hàm lấy thông tin của khách hàng
  const handleGetCustomer = () =>{
    setLoading(true)
    getListCustomerStaffManager().then((res) =>{
      setDataCustomer(res?.data?.data?.items)
      console.log(res?.data?.data?.items);
    })
    .finally(() =>{
      setLoading(false)
    })
  }

  // Hàm xóa từng khách hàng
  const handleDelete = (customerId) =>{
    delCustomer(customerId).then((res)=>{
      if(res.status === 200) {
        handleGetCustomer()
      }
    })
  }

  // Hàm xóa nhiều khách hàng
  // khi select sẽ hiện thị chọn bao nhiêu 
  const hasSelected = selectedRowKeys.length > 0
  const handleDeleteAll = () =>{
    delAllCustomer({ids: selectedRowKeys}).then((res)=>{
      if(res.data?.success === true) {
        handleGetCustomer();
        setSelectedRowKeys([])
      }
    })
    setSelectedRowKeys([])
  }
  
  // Hàm tìm kiếm thông tin khách hàng
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  
  // Hàm tìm kiếm khách hàng
  const handleSearchCustom = (values) =>{
    filterCustomer(
      {customerName:values}
    ).then((res) =>{
      if(res.status === 200) {
        setDataCustomer(res?.data?.data?.items)
      }
    })
  }

  // Hàm lọc dùng cho form lọc khách hàng
  const handleFilter = (values) =>{
    filterCustomer(values).then((res) =>{
      // console.log("res:: ",res)
      if(res.status === 200) {
        setDataCustomer(res?.data?.data?.items)
      }
    })
  }



  //sử dụng để gửi yêu cầu API khi trang thay đổi
  useEffect(() =>{
    handleGetCustomer()
    setLoading(false)
  },[])


  //cột thông tin của bảng
  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: "customerName",
    },
    
    {
      title: 'Số điện thoại',
      dataIndex: "phone",
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    
    {
      title: 'Ngày tạo',
      dataIndex:'createdDate'
    },
    {
      title:'Ngày cập nhật',
      dataIndex:'updateDate'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusName',
      render: (text,record) => {
            return (
              <>
                <Tag color={"green"} key={1}>
                    {record?.status?.statusName}
                </Tag>
                
              </> 
              )
      }
    },
    {
      title: 'Action',
      key:'action',
      render:(e, record, idx) => 
      // {
      //   return(
      //     console.log('record:',record)
      //   )
          (
        <Space>
          <Button className='update'
          icon={<EditOutlined/>}
            onClick={() =>{
              setCurrentCustomer(record)
              setOpenModal(true)
            }}
          >
          </Button>
          <Button  
            icon={<DeleteOutlined/>}
            className='delete'
            onClick={() =>{
              handleDelete(record.customerId)
            }}
            >
          </Button>
          <Button className='detail'
            icon={<SolutionOutlined/>}
            onClick={() =>{
              setOpenDrawer(true)
              navigate(`/staffpage/customer/detailcustomer/${record.customerId}`)
            }}
          >
          </Button>
        </Space>
        )
        // }

    }
    
    
  ];
  return (
    <div>
      <PageContainer
        title='Tất cả khách hàng'
        extra={[
          <Button
          className='button_add_member'
          onClick={() =>{
            setOpenModal(true)
          }}
          >
            + Thêm Khách Hàng
          </Button> ,
          <Input.Search 
            placeholder="Nhập tên khách hàng"  
            onChange={handleSearch}
            value={searchData}
            enterButton
            onSearch={(values) =>{handleSearchCustom(values)}}
          />,
          
          <Popover 
          placement="bottom" 
          content={
              <FilterCustomer
                onSearch={(values) => {handleFilter(values)}}
                getCustomer={() =>{
                  handleGetCustomer()
                }}
              />
            }
            trigger="click"
            >
              <Button  className='filter'> 
                <FilterOutlined /> 
                Lọc
              </Button>
          </Popover>
        ]}
      >
        {/* Thêm Khách hàng + Cập nhật khách hàng */}
        <AddCustomer 
          onSuccess={() =>{
            handleGetCustomer();
            setOpenModal(false)
          }}
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
              setCurrentCustomer({})
            }
          }}
          data={currentCustomer}
        />
       {/* Hiển thị thông tin chi tiết của khách hàng */}
        <Drawer
          title="Thông tin chi tiết của khách hàng"
          width={500}
          open={openDrawer}
          onClose={onClose}
          extra={
            <Space>
              <Button onClick={onClose}>Quay lại</Button>
            </Space>
          }
          >
            <DetailCustomer/>
          </Drawer>

        <Table 
          
          rowKey={"customerId"}
          rowSelection={rowSelection}
          columns={columns} 
          dataSource={dataCustomer} 
          size='middle' 
          loading={loading}
          
          />

        <div className='edit' style={{ display: hasSelected ? "block" : "none" }}> 
           <>đã chọn {selectedRowKeys.length}</>
          <Button 
            className='button_edit'
            onClick={() =>{
              showhowConfirm();

            }}
          >
            <CloseOutlined />
            Xoá
          </Button>
          
        </div> 
        
      </PageContainer>
    </div>
  );
};
export default TableCustomerOfStaff