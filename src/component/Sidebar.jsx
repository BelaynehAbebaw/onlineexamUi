function Sidebar({ activePage, setActivePage, sidebarOpen }) {

    const menuItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: 'bi-speedometer2'
        },
        {
            id: 'exams',
            name: 'Exams',
            icon: 'bi-journal-text'
        },
        {
            id: 'questions',
            name: 'Questions',
            icon: 'bi-question-circle'
        },
        {
            id: 'results',
            name: 'Results',
            icon: 'bi-bar-chart'
        },
        {
            id: 'users',
            name: 'Users',
            icon: 'bi-people'
        }
    ];

    return (
        <aside
            className={`sidebar ${
                sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
            }`}
        >

            <div className="sidebar-logo">
                <div className="logo-icon">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>

                {sidebarOpen && (
                    <div>
                        <h5>Exam System</h5>
                        <small>Online Examination</small>
                    </div>
                )}
            </div>

            <div className="sidebar-menu">

                <div className="menu-title">
                    {sidebarOpen && 'MAIN MENU'}
                </div>

                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`menu-item ${
                            activePage === item.id ? 'active' : ''
                        }`}
                        onClick={() => setActivePage(item.id)}
                        title={!sidebarOpen ? item.name : ''}
                    >
                        <i className={`bi ${item.icon}`}></i>

                        {sidebarOpen && (
                            <span>{item.name}</span>
                        )}
                    </button>
                ))}

                <div className="menu-title mt-4">
                    {sidebarOpen && 'ACCOUNT'}
                </div>

                <button
                    className={`menu-item ${
                        activePage === 'profile' ? 'active' : ''
                    }`}
                    onClick={() => setActivePage('profile')}
                >
                    <i className="bi bi-person-circle"></i>

                    {sidebarOpen && <span>Profile</span>}
                </button>

                <button className="menu-item logout">
                    <i className="bi bi-box-arrow-right"></i>

                    {sidebarOpen && <span>Logout</span>}
                </button>

            </div>

            {sidebarOpen && (
                <div className="sidebar-footer">
                    <i className="bi bi-shield-check"></i>
                    <span>Secure Examination System</span>
                </div>
            )}

        </aside>
    );
}

export default Sidebar;