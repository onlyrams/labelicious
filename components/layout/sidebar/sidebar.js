import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
    IconBuildingStore,
    IconTags,
    IconTagStarred,
    IconSwitchHorizontal,
    IconLogout
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import Link from 'next/link';

const data = [
    { link: '/stock', label: 'Stock file', icon: IconBuildingStore },
    { link: '/labels', label: 'Labels', icon: IconTags },
    { link: '/promo-labels', label: 'Promos', icon: IconTagStarred },
];

export function Sidebar() {
    const [active, setActive] = useState('');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={() => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>

            {/* <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div> */}
        </nav>
    );
}