import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react';
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import StaffDashboard from './components/StaffDashboard'
import AdminDashboard from './components/AdminDashboard'
import LandingPage from './components/LandingPage'



// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ProtectedRoute = ({ user, allowedRole, children }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== allowedRole) {
        return <Navigate to={`/${user.role}`} replace />;
    }
    return children;
};

// Theme Toggle Component
export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '0.75rem',
                borderRadius: '50%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                color: 'var(--text-main)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
    );
};

function App() {
    // Theme State
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    // User State
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('library_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Sync Theme
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Sync User
    useEffect(() => {
        if (user) {
            localStorage.setItem('library_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('library_user');
        }
    }, [user]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Router>
                <div className="app-container">
                    <ThemeToggle /> {/* Global Toggle Button */}
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/login"
                            element={!user ? <Login setUser={setUser} /> : <Navigate to={`/${user.role}`} replace />}
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/student/*"
                            element={
                                <ProtectedRoute user={user} allowedRole="student">
                                    <StudentDashboard user={user} logout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/staff/*"
                            element={
                                <ProtectedRoute user={user} allowedRole="staff">
                                    <StaffDashboard user={user} logout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute user={user} allowedRole="admin">
                                    <AdminDashboard user={user} logout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        {/* Catch all - Redirect to home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    )
}

export default App
