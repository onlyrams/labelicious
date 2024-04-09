import {
    IconBuildingWarehouse,
    IconTags,
    IconTagStarred,
    IconEdit
} from '@tabler/icons-react';
import classes from './navigation.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const data = [
    { link: '/stock', label: 'Stock file', icon: IconBuildingWarehouse },
    { link: '/labels', label: 'Labels', icon: IconTags },
    { link: '/promo-labels', label: 'Promos', icon: IconTagStarred },
    { link: '/edit-label-template', label: 'Edit Label Templates', icon: IconEdit },
];

export function Navigation({ onClick }) {
    const pathname = usePathname();

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.link === pathname || undefined}
            href={item.link}
            key={item.label}
            onClick={onClick}
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