import { useEffect, useState } from 'react';
import '../../styles/users.scss';
import { Button, Table, Modal  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserAddOutlined } from '@ant-design/icons'

interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
}

const UsersTable = () => {

    const [listUsers, setListUsers] =useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getData = async() =>{
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU0NWYyNGI3ZjYwZDIyZDc3NDJkNzJiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTkwODI4NTcsImV4cCI6MTc4NTQ4Mjg1N30.z9d-Tm0HYnmSYMf60De9OpjKK_P0jmzaYgI1HZ75-rU"
        const res = await fetch("http://localhost:8000/api/v1/users/all",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });
        const movies = await res.json();
        setListUsers(movies.data.result)
        console.log(movies.data.result);
    }
    useEffect(() => {
        getData();
    },[]);

    const columns: ColumnsType<IUsers> = [
        {
            title: "Email",
            dataIndex: "email",
            render: (value, record) => {
                return (
                    <a>{record.email}</a>
                )
            }
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Role",
            dataIndex: "role"
        }
    ]

    return (
        <div>
            <div className='add_new'>
                <h2>Table User</h2>
                <div>
                <Button type="primary" icon={<UserAddOutlined />}  onClick={showModal}>Add New</Button>
                </div>
                
            </div>
            
            <Table 
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
            <Modal 
                title="Basic Modal" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default UsersTable