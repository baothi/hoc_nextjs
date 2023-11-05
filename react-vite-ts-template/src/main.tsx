import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.scss'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";
import UsersPage from './screens/users.page.tsx';

import { UsergroupAddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/users'>Manage Users</Link>,
    key: 'users',
    icon: <UsergroupAddOutlined />,
    // disabled: true,
  }
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
  <Menu 
    onClick={onClick} 
    selectedKeys={[current]} 
    mode="horizontal" 
    items={items} 
    />
    );
};



const LayoutAdmin = ()=> {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>footer này</footer>
    </div>
  )
};


const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <LayoutAdmin />,
    children: [
      {index: true, element: <App />},
      {
        path: "/users",
        element: <UsersPage />
      }
    ],
  },
  {
    path: "users",
    element: <UsersPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
