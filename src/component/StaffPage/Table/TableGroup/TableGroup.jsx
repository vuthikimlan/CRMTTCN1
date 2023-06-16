import React from 'react';
import { Button, Table,  Space} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {  PageContainer } from '@ant-design/pro-components'
import { useEffect,useState } from 'react';
import { delGroup, getListGroupCustomerStaffManager } from '../../../../services/lead';
import AddUpdateGroup from './Add_Update/Add_Update';
import { useNavigate } from 'react-router-dom';



function TableGroup(props) {

    const [openModal, setOpenModal] = useState()
    const [dataGroup, setDataGroup] = useState([])
    const [currentGroup, setCurrentGroup] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // Hàm lấy tất cả các nhóm
    const handleGetGroup = () =>{
        setLoading(true)
        getListGroupCustomerStaffManager().then((res)=>{
          setDataGroup(res.data?.data?.items)
        }).finally(() =>{
            setLoading(false)
          })
    }

    // Hàm xóa từng nhóm khách hàng
    const handleDelete = (customerGroupId) =>{
        delGroup(customerGroupId).then((res) =>{
            if(res.status === 200){
                handleGetGroup()
            }
        })
    }

  
   //sử dụng để gửi yêu cầu API khi trang thay đổi
   useEffect(() =>{
    handleGetGroup()
    setLoading(false)
    },[])

  //cột thông tin của bảng
  const columns = [
    
    {
      title: 'Tên nhóm khách hàng',
      dataIndex: 'groupName',
    },
    
    {
      title: ' Người quản lý nhóm',
      dataIndex: ['user', 'name'],
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
                setCurrentGroup(record)
                setOpenModal(true)
              }}
            >
            </Button>
            <Button  
              icon={<DeleteOutlined/>}
              className='delete'
              onClick={() =>{
                handleDelete(record.customerGroupId)
              }}
              >
            </Button>
            
          </Space>
        ),
    },
    {
      title: 'Danh sách khách hàng',
      render: (e, record) => (
        <Space>
          <Button
            onClick={() =>{
              navigate('/staffpage/listcustomer')
            }}
          >
          Danh sách khách hàng
          </Button>
        </Space>
      )
    }
  ];
  return (
    <div>

      <PageContainer
        title='Danh sách nhóm khách hàng'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Tạo nhóm khách hàng
          </Button> 
          
        ]
        }
      >
        <AddUpdateGroup
            onSuccess={() =>{
                handleGetGroup();
                setOpenModal(false)
            }}
            openModal={openModal}
            onOpenChange={(open) =>{
                if(!open) {
                    setOpenModal(false)
                    setCurrentGroup({})
                }
            }}
            data={currentGroup}
        />

        <Table  columns={columns} 
               dataSource={dataGroup}
              loading={loading}
        />
        
      </PageContainer>
    </div>
  );
}

export default TableGroup;