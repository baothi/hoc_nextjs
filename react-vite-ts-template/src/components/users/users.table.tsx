import { useEffect, useState } from 'react';
import '../../styles/users.scss';
import { Button, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserAddOutlined } from '@ant-design/icons'
import CreateUserModal from './create.user.modal';


interface IUsers {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: string;
    gender: string;
    address: string;
    role?: string; 
}

const UsersTable = () => {

    const [listUsers, setListUsers] =useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU0NWYyNGI3ZjYwZDIyZDc3NDJkNzJiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDA5ODU0NzEsImV4cCI6MTc4NzM4NTQ3MX0.kjEQ762QyA4VrUGzOO5SMEpVijwcjNFcxPm7NqDXZdI"

    

    const getData = async() =>{
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
    // const addNewUser = async()=>{
    //     const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU0NWYyNGI3ZjYwZDIyZDc3NDJkNzJiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTkxNTkxMjIsImV4cCI6MTc4NTU1OTEyMn0.ihKagKSWV36jSMnYsOaFNugklySRVonIi0a4t4f82nI"
    //     const res = await fetch("http://localhost:8000/api/v1/users",{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${access_token}`
    //         },
    //         body: JSON.stringify({ title: 'React POST Request Example' })
    //     });
    //     const movies = await res.json();
    //     setListUsers(movies.data.result)
    //     console.log(movies.data.result);
    // }


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
                <Button type="primary" icon={<UserAddOutlined />}  onClick={()=>setIsCreateModalOpen(true)}>Add New</Button>
                </div>
                
            </div>
            
            <Table 
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
            <CreateUserModal 
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
        </div>
    )
}

export default UsersTable