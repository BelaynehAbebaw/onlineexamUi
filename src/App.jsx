import { useState } from 'react';

import Sidebar from './component/sidebar';
import Navbar from './component/Navbar';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Questions from './pages/Questions';
import Results from './pages/Results';
import Users from './pages/Users';
import Profile from './pages/Profile';

function App() {

    // Check if user is already logged in
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('token')
    );

    const [activePage, setActivePage] = useState(
        getDefaultPage()
    );

    const [sidebarOpen, setSidebarOpen] = useState(true);


    /*
     * Get user's role
     */
    function getUserRole() {

        const user = JSON.parse(
            localStorage.getItem('user') || '{}'
        );

        const role =
            user.role ||
            localStorage.getItem('role') ||
            '';

        return role.toUpperCase();
    }


    /*
     * Decide first page according to role
     */
    function getDefaultPage() {

        const role = getUserRole();

        switch (role) {

            case 'ADMIN':
                return 'dashboard';

            case 'EXAMINER':
                return 'exams';

            case 'STUDENT':
                return 'exams';

            default:
                return 'dashboard';
        }
    }


    /*
     * Login successful
     */
    const handleLogin = () => {

        const role = getUserRole();

        setIsLoggedIn(true);

        /*
         * Redirect according to role
         */
        switch (role) {

            case 'ADMIN':
                setActivePage('dashboard');
                break;

            case 'EXAMINER':
                setActivePage('exams');
                break;

            case 'STUDENT':
                setActivePage('exams');
                break;

            default:
                setActivePage('dashboard');
        }
    };


    /*
     * Logout
     */
    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('rememberMe');

        setIsLoggedIn(false);

        setActivePage('dashboard');
    };


    /*
     * Render selected page
     */
    const renderPage = () => {

        switch (activePage) {

            case 'dashboard':
                return <Dashboard />;

            case 'exams':
                return <Exams />;

            case 'questions':
                return <Questions />;

            case 'results':
                return <Results />;

            case 'users':
                return <Users />;

            case 'profile':
                return <Profile />;

            default:
                return <Dashboard />;
        }
    };


    /*
     * If user is NOT logged in,
     * show Login page.
     */
    if (!isLoggedIn) {

        return (
            <Login
                onLogin={handleLogin}
            />
        );
    }


    /*
     * Logged-in application
     */
    return (
        <div className="app-container">

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                sidebarOpen={sidebarOpen}
                onLogout={handleLogout}
            />

            <div
                className={
                    sidebarOpen
                        ? 'main-content sidebar-active'
                        : 'main-content sidebar-collapsed'
                }
            >

                <Navbar
                    setSidebarOpen={setSidebarOpen}
                    sidebarOpen={sidebarOpen}
                    setActivePage={setActivePage}
                    onLogout={handleLogout}
                />

                <main className="page-content">

                    {renderPage()}

                </main>

            </div>

        </div>
    );
}

export default App;