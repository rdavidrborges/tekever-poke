import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
    const tabs = [
        { label: 'Home', url: '/' },
        { label: 'Favorites', url: '/favorites' },
    ]

    const [activeTab, setActiveTab] = useState('/')

    //get current open tab/page
    const location = useLocation();

    useEffect(() => {
        //set the active tap to change the styling on navtab
        setActiveTab(location.pathname)
    }, [location]);

    return (
        <>
            <nav>
                <ul className="nav nav-tabs">
                    {tabs.map((tab, index) => (
                        <li className="nav-item" key={index}>
                            <Link
                                className={`nav-link ${activeTab === tab.url && 'active'}`}
                                to={tab.url}>
                                {tab.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;