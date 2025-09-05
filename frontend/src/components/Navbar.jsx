import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Lead Routing</Link>
            <div className="navbar-links">
                {isLoggedIn ? (
                    <>
                        <Link to="/admin">Dashboard</Link>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Admin Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;