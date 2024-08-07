import React, { Children } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
const NavMenu = () => {
    let location = useLocation();
    const items = [
        {
            label: <Link to={'/'}>index</Link>,
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: 'demo',
            key: '/demo',
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: <Link to={'/demo'}>demo</Link>,
                    key: '/demo',
                },
                {
                    label: (
                        <Link target="_blank" to={'/demo/responsive-layout'}>
                            responsive-layout
                        </Link>
                    ),
                    key: 'responsive-layout',
                },
            ],
        },
    ];
    return <Menu style={{ width: '200px' }} selectedKeys={[location.pathname]} mode={'inline'} items={items} />;
};
export default () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            <NavMenu />
            <Outlet />
        </div>
    );
};
