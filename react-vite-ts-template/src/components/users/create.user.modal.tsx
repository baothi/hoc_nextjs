import { Modal, Input, notification  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useState } from "react";

interface IProps {
    access_token: string;
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps)=> {
    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen  } = props;


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

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

    return(
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
    )
};

export default CreateUserModal;