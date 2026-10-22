import { useState } from 'react';

function Navbar({
    setSidebarOpen,
    sidebarOpen,
    setActivePage
}) {

    const [showMenu, setShowMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const userName = user.name || 'Administrator';
    const userRole = user.role || localStorage.getItem('role') || 'Admin';

    const initial = userName.charAt(0).toUpperCase();

    const handleProfile = () => {
        setShowMenu(false);
        setActivePage('profile');
    };

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        // If your login page is controlled by activePage,
        // change this according to your login implementation.
        window.location.href = '/login';
    };

    return (
        <nav className="top-navbar">

            {/* LEFT SIDE */}
            <div className="d-flex align-items-center">

                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className="breadcrumb-area">
                    <span className="text-muted">
                        Online Examination System
                    </span>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-right">

                {/* NOTIFICATION */}
                <button className="notification-btn">
                    <i className="bi bi-bell"></i>
                    <span className="notification-dot"></span>
                </button>

                {/* USER */}
                <div className="user-profile-container">

                    <button
                        className="user-profile"
                        onClick={() => setShowMenu(!showMenu)}
                    >

                        <div className="user-avatar">
                            {initial}
                        </div>

                        <div className="user-info">
                            <strong>{userName}</strong>
                            <small>{userRole}</small>
                        </div>

                        <i className="bi bi-chevron-down"></i>

                    </button>

                    {/* DROPDOWN */}
                    {showMenu && (
                        <div className="user-dropdown">

                            <button onClick={handleProfile}>
                                <i className="bi bi-person"></i>
                                Profile
                            </button>

                            <hr />

                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;