import { CloseOutlined, FilterOutlined, EditOutlined,DeleteOutlined,SolutionOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Modal, Popover, Space, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { delUser, filterUser, getListUser, delAllUser } from '../../../../services/lead';
import AddStaff from './AddStaff';
import './Table.css';
import DetailStaff from './DetailStaff';
import FilterStaff from './FilterStaff';


function TableContent(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const [openDrawer, setOpenDrawer] = useState()
  const [loading, setLoading] = useState(true);
  const [dataStaff, setDataStaff] = useState([])
  const [searchData, setSearchData] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { confirm } = Modal;
  const [currentStaff, setCurrentStaff] = useState({})
  
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log('newSelectedRowKeys', newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  
  // khi select sẽ hiện thị chọn bao nhiêu 
  const hasSelected = selectedRowKeys.length > 0

  const showhowConfirm = () => {
    confirm({
      title: 'Xoá khách hàng ',
      content: 'Việc này sẽ xóa khách hàng được chọn. Bạn có chắc chắn muốn xóa?',
      onOk: handleDeleteAll ,
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClose = () =>{
    setOpenDrawer(false)
  }

  // Hàm lấy thông tin nhân viên
  const handleGetStaff = () =>{
    setLoading(true)
    getListUser().then((res) =>{
      setDataStaff(res?.data?.data?.items)

    }).finally(() =>{
      setLoading(false)
    })
  }

  // Hàm xóa từng khách hàng
  const handleDelete = (userId) =>{
    delUser(userId).then((res) =>{
      if(res.status === 200 ) {
        handleGetStaff()
      }
    })
  }

  // Ham xoa nhieu nhan vien
  const handleDeleteAll = () =>{
    delAllUser( selectedRowKeys).then((res)=>{
      if(res.data?.success === true) {
        handleGetStaff();
        setSelectedRowKeys([])
      }
    }).catch((error) => {
      // Xử lý lỗi khi gọi API xóa khách hàng
      console.error('Lỗi xóa khách hàng:', error);
    });
  }

  // Hàm tìm kiếm thông tin khách hàng
  const handleSearch = (e) =>{
    setSearchData(e.target.value)
  }

  const handleSearchStaff = (values) =>{
    filterUser({name: values}).then((res) =>{
      if(res.status === 200) {
        setDataStaff(res?.data?.data?.items)
      }
    })
  }

  // Hàm lọc thông tin khách hàng

  const handleFilter = (values) =>{
    filterUser(values).then((res) =>{
      if(res.status === 200) {
        setDataStaff(res?.data?.data?.items)
      }
    })
  }

  //sử dụng để gửi yêu cầu API khi trang thay đổi
  useEffect(() =>{
    handleGetStaff()
    setLoading(false)
  },[])

  // console.log(dataStaff);

  //cột thông tin của bảng
  const columns = [
    
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',

    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date',
    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',

    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updateDate',

    },
    {
      title: 'Action',
      render: (e, record, idx) => (
        <Space>
          <Button className='update'
          icon={<EditOutlined/>}
            onClick={() =>{
              setCurrentStaff(record)
              setOpenModal(true)
            }}
          >
          </Button>
          <Button  
            icon={<DeleteOutlined/>}
            className='delete'
            onClick={() =>{
              handleDelete(record.userId)
            }}
            >
          </Button>
          <Button className='detail'
            icon={<SolutionOutlined/>}
            onClick={() =>{
              setOpenDrawer(true)
              navigate(`/adminpage/staff/detailstaff/${record.userId}`)
            }}
          >
          </Button>
        </Space>
      ),
    },
    

  ];
  return (
    <div>

      <PageContainer

        title='Tất cả nhân viên'
        // className='Pagecontainer'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Thêm Nhân viên
          </Button> ,
           <Input.Search 
              placeholder="input search text"  
              onChange={handleSearch}
              value={searchData}
              enterButton
              onSearch={(values) =>{handleSearchStaff(values)}}
           />,
          //  Lọc nhân viên
          <Popover  
            placement="bottom"
            content={
              <FilterStaff
                onSearch={(values) => {handleFilter(values)}}
                getStaff={()=>{
                  handleGetStaff()
                }}
              />
            }
            trigger='click'
             >
              <Button  className='filter'> 
                <FilterOutlined 
                  onSearch={handleFilter}
                /> 
                Lọc
              </Button>
          </Popover>
        ]}
      >
        {/* Thêm + cập nhật nhân viên */}
        <AddStaff 
          onSuccess={() =>{
            handleGetStaff();
            setOpenModal(false)
          }}
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
              setCurrentStaff({})
            }
          }}
          data={currentStaff}
        />
        <Table 
          rowKey={"userId"}
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={dataStaff}
          loading={loading}
          size='middle' 
        />
        
           <Drawer
          title="Thông tin chi tiết của nhân viên"
          width={600}
          open={openDrawer}
          onClose={onClose}
          extra={
            <Space>
              <Button onClick={onClose}>Quay lại</Button>
            </Space>
          }>
            <DetailStaff/>
          </Drawer>
          <div className='edit' style={{ display: hasSelected ? "block" : "none" }}> 
          {/* style={{ display: isChecked ? "block" : "none" }} */}
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
export default TableContent;