
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EngineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-3.31 0-6 2.69-6 6v2c0 .55-.45 1-1 1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1c.55 0 1 .45 1 1v2c0 3.31 2.69 6 6 6s6-2.69 6-6v-2c0-.55.45-1 1-1h1c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1V8c0-3.31-2.69-6-6-6zM8 8h8M8 16h8" />
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


const Header: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/vehicles', label: 'Veículos' },
        { path: '/checklists', label: 'Histórico' },
        { path: '/account', label: 'Conta' },
        { path: '/settings', label: 'Configurações' },
    ];
    
    return (
        <header className="bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <EngineIcon />
                            <span className="text-2xl font-bold text-white">CarScan</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <nav className="hidden md:flex space-x-4">
                            {navItems.map(item => (
                                 <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.path ? 'text-white bg-blue-600' : 'text-gray-300 hover:bg-slate-700'}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="ml-4 flex items-center">
                            <span className="text-gray-300 text-sm hidden sm:block">Olá, {user?.name}</span>
                             <button
                                onClick={logout}
                                title="Sair"
                                className="ml-4 flex items-center p-2 rounded-full text-sm font-medium text-red-400 hover:bg-slate-700"
                                aria-label="Sair"
                            >
                                <LogoutIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;