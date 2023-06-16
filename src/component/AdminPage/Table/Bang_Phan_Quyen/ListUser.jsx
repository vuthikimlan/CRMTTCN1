import { Button, Table,  Drawer, Space} from 'antd';
import {FileTextOutlined,  } from '@ant-design/icons'
import {  PageContainer } from '@ant-design/pro-components'
import { useState, useEffect } from 'react';
import '../TableStaff/Table.css'
import { useNavigate } from 'react-router-dom';
// import CreateRole from '../../Modal/CreateRole/CreateRole';
import CreateRole from './CreateRole/CreateRole';
import DetailUser from './DetailUser/DetailUser';
import {  getListUser } from '../../../../services/lead';


function ListUser(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const  [openDrawer, setOpenDrawer] = useState(false)
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([])


  const handleGetStaff = () =>{
    setLoading(true)
    getListUser().then((res) =>{
      setDataUser(res?.data?.data?.items)

    }).finally(() =>{
      setLoading(false)
    })
  }

    //sử dụng để gửi yêu cầu API khi trang thay đổi
    useEffect(() =>{
      handleGetStaff()
      setLoading(false)
    },[])
  

   
  //cột thông tin của bảng
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
    },
    {
      title: 'Vai trò',
      dataIndex: ['role', 'roleName'],
    },
    {
      title: 'Quyền',
      render: (e, record) =>(
        <Button className='detailRoleUser'
          onClick={()=> {
            setOpenDrawer(true)
            navigate(`/adminpage/listuser/detailuser/${record.userId}`)
          }
          }
        >
          Xem chi tiết
        </Button>
      )
    },
    {
      title: ' Email',
      dataIndex:  'email',
    },
    {
      title: ' Ngày tạo',
      dataIndex:  'createdDate',
    },
    {
      title: ' Ngày cập nhật',
      dataIndex:  'updateDate',
    },
  ];
  return (
    <div>

      <PageContainer
        title='Danh sách người dùng'
        // className='Pagecontainer'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Tạo Vai trò
          </Button> ,
          <Button 
          onClick={()=>{
            navigate('/adminpage/listrole')
          }}
        >
          <FileTextOutlined />
          Xem vai trò
        </Button>
        ]
        }
      >
        

        <CreateRole
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
            }
          }}
        />
        
        <Table columns={columns} dataSource={dataUser} loading={loading} />

        <Drawer 
          title="Xem chi tiết người dùng" 
          placement="right" 
          width={450}
          onClose={()=>{setOpenDrawer(false)}} 
          open={openDrawer}>
          
            <DetailUser/>
      </Drawer>
       
      </PageContainer>
    </div>
  );
};
export default ListUser;