import { useEffect, useState } from 'react';
import '../../styles/users.scss';
import { Button, Table, Modal, Input, notification  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons'

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
    // const [users, setUsers] =useState<IUsers[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU0NWYyNGI3ZjYwZDIyZDc3NDJkNzJiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDA5ODU0NzEsImV4cCI6MTc4NzM4NTQ3MX0.kjEQ762QyA4VrUGzOO5SMEpVijwcjNFcxPm7NqDXZdI"

    const handleOk = async() => {
        const newUser = {
            name, email, password, age, gender, address, role
        }
        console.log(newUser)
        const res = await fetch("http://localhost:8000/api/v1/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({...newUser})
        });
        const d = await res.json();
        if(d.data){
            //success
            await getData();
            notification.success({
                message: "tạo mới user thành công"
            })
        }else{
            //error
            notification.error({
                message: JSON.stringify(d.message),
                description: "có lỗi xảy ra"
            })
        }

        setIsCreateModalOpen(false);
    };

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

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setName("");
        setEmail("")
        setPassword("")
        setAge("")
        setGender("")
        setAddress("")
        setRole("")

    };

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
            <Modal 
                title="Add New User" 
                open={isCreateModalOpen} 
                onOk={handleOk} 
                onCancel={()=>handleCloseCreateModal()}
                maskClosable={false}
                width={"80vw"}
                >
                <div>
                    <label>Name: </label>
                    <Input 
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <Input 
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Pasword: </label>
                    <Input.Password
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label>Age: </label>
                    <Input 
                    value={age}
                    onChange={(event)=>setAge(event.target.value)}
                    />
                </div>
                <div>
                    <label>Gender: </label>
                    <Input 
                    value={gender}
                    onChange={(event)=>setGender(event.target.value)}
                    />
                </div>
                <div>
                    <label>Address: </label>
                    <Input 
                    value={address}
                    onChange={(event)=>setAddress(event.target.value)}
                    />
                </div>
                <div>
                    <label>Role: </label>
                    <Input 
                    value={role}
                    onChange={(event)=>setRole(event.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default UsersTable