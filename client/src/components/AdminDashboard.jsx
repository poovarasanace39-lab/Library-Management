import { useState } from 'react';
import { Shield, Users, Database, Lock, Activity, LogOut, Settings, HardDrive, AlertCircle, CheckCircle, UserPlus, FileText, Download, RefreshCcw, Cpu, Clock, Book, ChevronRight, X, User, Library, Calendar, Coins, BookOpen, Search, Plus, Trash2, Mail, Key, Filter } from 'lucide-react';

const quickActionBtnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'var(--bg-body)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.85rem',
    fontWeight: '500'
};

const PolicyCard = ({ icon, title, value, onChange, description, gradient, accentColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: isHovered ? `linear-gradient(135deg, var(--bg-card) 0%, ${accentColor}10 100%)` : 'var(--bg-card)',
                border: `1px solid ${isHovered ? accentColor : 'var(--border)'}`,
                borderRadius: '16px',
                padding: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 10px 20px -5px ${accentColor}20` : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '100px',
                height: '100px',
                background: `${accentColor}05`,
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: `${accentColor}15`,
                    color: accentColor,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>{title}</h3>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="input-field"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        padding: '0.5rem 0.75rem',
                        height: 'auto',
                        background: 'rgba(0,0,0,0.02)',
                        textAlign: 'center',
                        color: accentColor,
                        border: `1px solid ${accentColor}20`
                    }}
                />
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', position: 'relative', zIndex: 1 }}>
                {description}
            </p>
        </div>
    );
};

function AdminDashboard({ user, logout }) {
    const activeTab = 'overview';
    const [tab, setTab] = useState('overview');
    const [showOverdueModal, setShowOverdueModal] = useState(false);

    // Library Settings State
    const [settings, setSettings] = useState({
        dueDays: 14,
        finePerDay: 5,
        maxBooks: 5
    });
    const [adminProfile, setAdminProfile] = useState({
        oldPassword: '',
        newPassword: ''
    });

    // Mock function to handle admin password update
    const handleUpdateAdminPassword = (e) => {
        e.preventDefault();
        // In a real app, verify oldPassword with backend
        if (adminProfile.oldPassword === 'admin123') { // Mock verification
            alert('Password updated successfully!');
            setAdminProfile({ oldPassword: '', newPassword: '' });
        } else {
            alert('Incorrect old password!');
        }
    };

    const [isSaving, setIsSaving] = useState(false);

    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', stock: 5 },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', stock: 3 },
        { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0451524935', stock: 8 },
        { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769174', stock: 2 },
        { id: 5, title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0060850524', stock: 4 }
    ]);
    const [bookSearch, setBookSearch] = useState('');

    const [overdueItems, setOverdueItems] = useState([
        { id: 1, user: 'John Doe', book: 'The Great Gatsby', dueDate: '2023-10-15', fine: 45, status: 'Pending' },
        { id: 2, user: 'Jane Smith', book: '1984', dueDate: '2023-10-20', fine: 20, status: 'Pending' },
        { id: 3, user: 'Robert Brown', book: 'To Kill a Mockingbird', dueDate: '2023-10-05', fine: 95, status: 'Overdue' },
        { id: 4, user: 'Emily Davis', book: 'Brave New World', dueDate: '2023-10-25', fine: 0, status: 'Returned' },
        { id: 5, user: 'Michael Wilson', book: 'The Catcher in the Rye', dueDate: '2023-10-18', fine: 30, status: 'Pending' }
    ]);

    // User Management State
    const [users, setUsers] = useState([
        { id: 1, key: 'USR-001', name: 'John Doe', email: 'john@student.edu', role: 'Student', department: 'CS', batch: '2024', status: 'Active', mustChangePassword: false },
        { id: 2, key: 'USR-002', name: 'Jane Smith', email: 'jane@staff.edu', role: 'Staff', department: 'ECE', batch: 'N/A', status: 'Active', mustChangePassword: false },
        { id: 3, key: 'ADM-001', name: 'Admin User', email: 'admin@system.edu', role: 'Admin', department: 'Admin', batch: 'N/A', status: 'Active', mustChangePassword: false },
        { id: 4, key: 'USR-003', name: 'Alice Johnson', email: 'alice@student.edu', role: 'Student', department: 'IT', batch: '2025', status: 'Inactive', mustChangePassword: true },
        { id: 5, key: 'USR-004', name: 'Bob Wilson', email: 'bob@student.edu', role: 'Student', department: 'MECH', batch: '2023', status: 'Active', mustChangePassword: false }
    ]);
    const [userSearch, setUserSearch] = useState('');
    const [activeFilters, setActiveFilters] = useState({ department: '', batch: '', role: '', status: '' });
    const [showUserModal, setShowUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: null, key: '', name: '', email: '', role: 'Student', department: '', batch: '', status: 'Active', password: '', mustChangePassword: true });
    const [isEditingUser, setIsEditingUser] = useState(false);

    const handleSaveUser = (e) => {
        e.preventDefault();
        // Create user object without the password field for storage (simulating standard security practice)
        // In a real app, password would be hashed and sent to valid endpoint
        const userToSave = { ...currentUser };
        delete userToSave.password; // Don't store raw password in local list state for security demo

        if (isEditingUser) {
            setUsers(users.map(u => u.id === currentUser.id ? { ...userToSave, mustChangePassword: currentUser.mustChangePassword } : u));
        } else {
            const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers([...users, { ...userToSave, id, mustChangePassword: true }]);
        }
        setShowUserModal(false);
        setCurrentUser({ id: null, key: '', name: '', email: '', role: 'Student', status: 'Active', password: '', mustChangePassword: true });
        setIsEditingUser(false);
    };

    const handleToggleStatus = (id) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return u;
        }));
    };

    const handleEditUser = (user) => {
        setCurrentUser({ ...user, password: '' });
        setIsEditingUser(true);
        setShowUserModal(true);
    };

    const handleAddUserInit = () => {
        setCurrentUser({ id: null, key: `USR-00${users.length + 1}`, name: '', email: '', role: 'Student', status: 'Active', password: '', mustChangePassword: true });
        setIsEditingUser(false);
        setShowUserModal(true);
    };
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', stock: '' });

    const handleDeleteBook = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setBooks(books.filter(b => b.id !== id));
        }
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        const id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
        setBooks([...books, { ...newBook, id: id, stock: parseInt(newBook.stock) || 0 }]);
        setNewBook({ title: '', author: '', isbn: '', stock: '' });
        setShowAddBookModal(false);
    };

    const handleSaveSettings = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings updated successfully!');
        }, 1000);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <Shield size={24} color="#60a5fa" /> Admin Control
                </h2>

                <nav style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.75rem', marginTop: '1rem', paddingLeft: '0.75rem' }}>GENERAL</div>
                    <SidebarBtn
                        icon={<Activity size={20} />}
                        label="Overview"
                        active={tab === 'overview'}
                        onClick={() => setTab('overview')}
                    />
                    <SidebarBtn
                        icon={<Users size={20} />}
                        label="User Management"
                        active={tab === 'users'}
                        onClick={() => setTab('users')}
                    />

                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.75rem', marginTop: '2rem', paddingLeft: '0.75rem' }}>LIBRARY MANAGEMENT</div>
                    <SidebarBtn
                        icon={<Book size={20} />}
                        label="Book Management"
                        active={tab === 'books'}
                        onClick={() => setTab('books')}
                    />
                    <SidebarBtn
                        icon={<Clock size={20} />}
                        label="Overdue & Fines"
                        active={tab === 'overdue'}
                        onClick={() => setTab('overdue')}
                    />
                    <SidebarBtn
                        icon={<FileText size={20} />}
                        label="Reports"
                        active={tab === 'reports'}
                        onClick={() => setTab('reports')}
                    />
                    <SidebarBtn
                        icon={<Settings size={20} />}
                        label="Library Settings"
                        active={tab === 'system'}
                        onClick={() => setTab('system')}
                    />
                </nav>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                        <p style={{ opacity: 0.7 }}>Administrator</p>
                    </div>
                    <button onClick={logout} style={{ ...navBtnStyle(false), color: 'var(--danger)' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <h1 className="header" style={{ textTransform: 'capitalize', color: 'var(--text-main)', borderBottomColor: 'var(--border)' }}>
                    {tab === 'overview' ? 'Dashboard Overview' : tab === 'system' ? 'Library Settings' : tab.replace('-', ' ')}
                </h1>

                {/* Dashboard Shell Content */}
                {tab === 'overview' && (
                    <div className="animate-fade">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            <SummaryCard
                                icon={<Users size={24} />}
                                title="Total Users"
                                value="2,450"
                                trend="+12% from last month"
                                color="#3b82f6"
                            />
                            <SummaryCard
                                icon={<AlertCircle size={24} />}
                                title="Active Issues"
                                value="12"
                                trend="4 high priority"
                                color="#ef4444"
                            />
                            <SummaryCard
                                icon={<CheckCircle size={24} />}
                                title="System Health"
                                value="99.9%"
                                trend="All systems operational"
                                color="#10b981"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {/* Recent Activity */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={20} color="#60a5fa" /> Recent Activity
                                    </h3>
                                    <button style={{ background: 'transparent', border: 'none', color: '#4f46e5', fontSize: '0.85rem', cursor: 'pointer' }}>View All</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { icon: <UserPlus size={16} />, text: 'New student registration: Poovarasan R', time: '2 mins ago', type: 'user' },
                                        { icon: <Book size={16} />, text: 'New book added to catalog: "Clean Code"', time: '1 hour ago', type: 'catalog' },
                                        { icon: <RefreshCcw size={16} />, text: 'System backup completed successfully', time: '3 hours ago', type: 'system' },
                                        { icon: <Shield size={16} />, text: 'Security policy updated by Admin', time: '5 hours ago', type: 'security' },
                                        { icon: <FileText size={16} />, text: 'Monthly circulation report generated', time: '1 day ago', type: 'report' },
                                    ].map((activity, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: i < 4 ? '1rem' : 0, borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                                            <div style={{ background: activity.type === 'system' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)', color: activity.type === 'system' ? '#10b981' : '#4f46e5', padding: '8px', borderRadius: '8px', height: 'fit-content' }}>
                                                {activity.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontSize: '0.95rem' }}>{activity.text}</p>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activity.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Overdue Summary */}
                                <div className="card" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706' }}>
                                        <Clock size={20} /> Overdue Summary
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '0.75rem' }}>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>42 Books</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Across all library branches</p>
                                        </div>
                                        <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '0.75rem' }}>
                                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>18 Students</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Awaiting return/penalty</p>
                                        </div>
                                        <button
                                            onClick={() => setShowOverdueModal(true)}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.6rem', marginTop: '0.5rem', background: '#f59e0b20', border: '1px solid #f59e0b40', borderRadius: '8px', color: '#d97706', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
                                        >
                                            View Detailed Report <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Overdue Modal */}
                                {showOverdueModal && (
                                    <div
                                        className="animate-overlay"
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 9999,
                                            WebkitBackdropFilter: 'blur(20px)',
                                            backdropFilter: 'blur(20px)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)'
                                        }}
                                    >
                                        <div className="card animate-fade" style={{ width: '600px', maxWidth: '90%', padding: 0, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', zIndex: 10000 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <AlertCircle color="#f59e0b" /> Overdue Details Report
                                                </h3>
                                                <button onClick={() => setShowOverdueModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <div style={{ padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <thead>
                                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                            <th style={{ padding: '0.5rem' }}>Student Name</th>
                                                            <th style={{ padding: '0.5rem' }}>Book Title</th>
                                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Delay</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            { name: 'Arun Kumar', book: 'Data Structures & Algorithms', delay: '12 Days' },
                                                            { name: 'Priya Dharshini', book: 'Modern Operating Systems', delay: '8 Days' },
                                                            { name: 'Rahul Sharma', book: 'Artificial Intelligence: A Modern Approach', delay: '5 Days' },
                                                            { name: 'Sowmya Reddy', book: 'Database System Concepts', delay: '15 Days' },
                                                            { name: 'Poovarasan R', book: 'The Pragmatic Programmer', delay: '2 Days' },
                                                            { name: 'Deepika S', book: 'Clean Architecture', delay: '10 Days' },
                                                        ].map((item, i) => (
                                                            <tr key={i} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.95rem' }}>
                                                                <td style={{ padding: '1rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                                    <div style={{ background: '#fef3c7', color: '#d97706', padding: '6px', borderRadius: '50%' }}><User size={14} /></div>
                                                                    {item.name}
                                                                </td>
                                                                <td style={{ padding: '1rem 0.5rem' }}>{item.book}</td>
                                                                <td style={{ padding: '1rem 0.5rem', textAlign: 'right', color: '#ef4444', fontWeight: '600' }}>{item.delay}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', textAlign: 'right', background: 'var(--bg-input)' }}>
                                                <button onClick={() => setShowOverdueModal(false)} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Close Report</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Actions */}
                                <div className="card">
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Core Admin Controls</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                        <button onClick={() => setTab('users')} style={quickActionBtnStyle}>
                                            <Users size={18} /> Manage Users
                                        </button>
                                        <button onClick={() => setTab('system')} style={quickActionBtnStyle}>
                                            <Settings size={18} /> Library Settings
                                        </button>
                                        <button onClick={() => setShowOverdueModal(true)} style={quickActionBtnStyle}>
                                            <Clock size={18} /> Overdue Summary
                                        </button>
                                        <button onClick={() => setTab('reports')} style={quickActionBtnStyle}>
                                            <FileText size={18} /> Reports
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'users' && (
                    <div className="card animate-fade">
                        {!showUserModal ? (
                            <>
                                {/* Sticky Search Bar */}
                                <div className="sticky-search-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="search-focus-glow" style={{ position: 'relative', flex: 1, maxWidth: '400px', transition: 'all 0.2s' }}>
                                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="text"
                                            placeholder="Search users by name, email or key..."
                                            value={userSearch}
                                            onChange={(e) => setUserSearch(e.target.value)}
                                            className="input-field"
                                            style={{ paddingLeft: '40px', marginBottom: 0, background: 'var(--bg-body)', border: '1px solid var(--border)' }}
                                        />
                                    </div>
                                    <button onClick={handleAddUserInit} className="btn btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>
                                        <UserPlus size={18} /> Add New User
                                    </button>
                                </div>

                                {/* Advanced Filters */}
                                <div className="filter-bar-container" style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', marginRight: '0.5rem' }}>
                                        <Filter size={16} /> Filters:
                                    </div>

                                    <select
                                        className={`filter-chip ${activeFilters.department ? 'filter-chip-active' : ''}`}
                                        value={activeFilters.department}
                                        onChange={(e) => setActiveFilters({ ...activeFilters, department: e.target.value })}
                                    >
                                        <option value="">Department</option>
                                        <option value="CS">CS</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="CIVIL">CIVIL</option>
                                    </select>

                                    <select
                                        className={`filter-chip ${activeFilters.batch ? 'filter-chip-active' : ''}`}
                                        value={activeFilters.batch}
                                        onChange={(e) => setActiveFilters({ ...activeFilters, batch: e.target.value })}
                                    >
                                        <option value="">Batch / Year</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>

                                    <select
                                        className={`filter-chip ${activeFilters.role ? 'filter-chip-active' : ''}`}
                                        value={activeFilters.role}
                                        onChange={(e) => setActiveFilters({ ...activeFilters, role: e.target.value })}
                                    >
                                        <option value="">Role</option>
                                        <option value="Student">Student</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                    <select
                                        className={`filter-chip ${activeFilters.status ? 'filter-chip-active' : ''}`}
                                        value={activeFilters.status}
                                        onChange={(e) => setActiveFilters({ ...activeFilters, status: e.target.value })}
                                    >
                                        <option value="">Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>

                                    {(activeFilters.department || activeFilters.batch || activeFilters.role || activeFilters.status) && (
                                        <button
                                            onClick={() => setActiveFilters({ department: '', batch: '', role: '', status: '' })}
                                            className="btn hover-scale"
                                            style={{
                                                padding: '0.4rem 0.8rem',
                                                fontSize: '0.8rem',
                                                background: 'var(--bg-body)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-muted)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                borderRadius: '20px',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            <X size={14} /> Clear
                                        </button>
                                    )}
                                </div>

                                {/* Header Row */}
                                <div className="user-list-grid" style={{ padding: '0 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <div>Key</div>
                                    <div>Name</div>
                                    <div>Email</div>
                                    <div>Role</div>
                                    <div>Status</div>
                                    <div style={{ textAlign: 'right' }}>Actions</div>
                                </div>

                                {/* User Rows */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {users.filter(u => {
                                        const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                                            u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                                            u.key.toLowerCase().includes(userSearch.toLowerCase());

                                        const matchesDept = activeFilters.department ? u.department === activeFilters.department : true;
                                        const matchesBatch = activeFilters.batch ? u.batch === activeFilters.batch : true;
                                        const matchesRole = activeFilters.role ? u.role === activeFilters.role : true;
                                        const matchesStatus = activeFilters.status ? u.status === activeFilters.status : true;

                                        return matchesSearch && matchesDept && matchesBatch && matchesRole && matchesStatus;
                                    }).map((u, index) => (
                                        <div key={u.id} className="user-card-row animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                            <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', opacity: 0.5 }}></div>
                                                {u.key}
                                            </div>
                                            <div style={{ fontWeight: '500' }}>{u.name}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{u.email}</div>
                                            <div>
                                                <span className={`role-badge role-${u.role.toLowerCase()}`}>
                                                    {u.role === 'Admin' && <Shield size={12} />}
                                                    {u.role === 'Student' && <BookOpen size={12} />}
                                                    {u.role === 'Staff' && <Users size={12} />}
                                                    {u.role}
                                                </span>
                                            </div>
                                            <div>
                                                <span className={`status-pill ${u.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                                    <span className="status-dot"></span>
                                                    {u.status}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                                <button onClick={() => handleEditUser(u)} className="btn hover-scale" style={{ padding: '6px 12px', fontSize: '0.8rem', border: '1px solid var(--border)', background: 'var(--bg-body)', color: 'var(--text-main)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(u.id)}
                                                    className="btn hover-scale"
                                                    style={{
                                                        padding: '6px 12px',
                                                        fontSize: '0.8rem',
                                                        border: `1px solid ${u.status === 'Active' ? 'var(--danger)' : 'var(--success)'}20`,
                                                        background: u.status === 'Active' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                                                        color: u.status === 'Active' ? 'var(--danger)' : 'var(--success)',
                                                        borderRadius: '8px',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="animate-fade">
                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingUser ? 'Edit User Details' : 'Register New User'}
                                    </h3>
                                    <button onClick={() => setShowUserModal(false)} className="btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Cancel</button>
                                </div>

                                <form onSubmit={handleSaveUser} style={{ maxWidth: '800px', display: 'grid', gap: '2rem' }}>

                                    {/* Identity Card */}
                                    <div className="card" style={{ padding: '2rem', border: '1px solid rgba(59, 130, 246, 0.1)', background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.03), transparent)' }}>
                                        <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ background: '#3b82f620', padding: '8px', borderRadius: '8px', color: '#3b82f6' }}><User size={18} /></div>
                                            Identity & Role
                                        </h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                    <Key size={14} /> User Key (ID)
                                                </label>
                                                <input required type="text" className="input-field" value={currentUser.key} onChange={e => setCurrentUser({ ...currentUser, key: e.target.value })} placeholder="USR-XXX" style={{ transition: 'all 0.2s' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                    <User size={14} /> Full Name
                                                </label>
                                                <input required type="text" className="input-field" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} placeholder="John Doe" style={{ transition: 'all 0.2s' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                    <Mail size={14} /> Email Address
                                                </label>
                                                <input required type="email" className="input-field" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} placeholder="email@example.com" style={{ transition: 'all 0.2s' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                    <Shield size={14} /> Access Role
                                                </label>
                                                <select className="input-field" value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })} style={{ transition: 'all 0.2s' }}>
                                                    <option value="Student">Student</option>
                                                    <option value="Staff">Staff</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                        {/* Security Card */}
                                        <div className="card" style={{ padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.1)', background: 'linear-gradient(to bottom right, rgba(245, 158, 11, 0.03), transparent)' }}>
                                            <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ background: '#f59e0b20', padding: '8px', borderRadius: '8px', color: '#f59e0b' }}><Lock size={18} /></div>
                                                Security Center
                                            </h4>
                                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                        {isEditingUser ? 'Set New Password' : 'Initial Password'}
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="input-field"
                                                        value={currentUser.password || ''}
                                                        onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                                                        placeholder={isEditingUser ? "Leave blank to keep current" : "Set initial password"}
                                                        style={{ transition: 'all 0.2s' }}
                                                    />
                                                </div>

                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-body)', transition: 'background 0.2s' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={currentUser.mustChangePassword}
                                                        onChange={e => setCurrentUser({ ...currentUser, mustChangePassword: e.target.checked })}
                                                        style={{ width: '16px', height: '16px', accentColor: '#f59e0b' }}
                                                    />
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Force password change on login</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Status Card */}
                                        <div className="card" style={{ padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.1)', background: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.03), transparent)' }}>
                                            <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ background: '#10b98120', padding: '8px', borderRadius: '8px', color: '#10b981' }}><CheckCircle size={18} /></div>
                                                Account Status
                                            </h4>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', borderRadius: '12px', border: `2px solid ${currentUser.status === 'Active' ? '#10b981' : 'var(--border)'}`, background: currentUser.status === 'Active' ? '#10b98110' : 'transparent', transition: 'all 0.2s' }}>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        checked={currentUser.status === 'Active'}
                                                        onChange={() => setCurrentUser({ ...currentUser, status: 'Active' })}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <CheckCircle size={24} color={currentUser.status === 'Active' ? '#10b981' : 'var(--text-muted)'} />
                                                    <span style={{ fontWeight: '600', color: currentUser.status === 'Active' ? '#10b981' : 'var(--text-muted)' }}>Active</span>
                                                </label>
                                                <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', borderRadius: '12px', border: `2px solid ${currentUser.status === 'Inactive' ? '#ef4444' : 'var(--border)'}`, background: currentUser.status === 'Inactive' ? '#ef444410' : 'transparent', transition: 'all 0.2s' }}>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        checked={currentUser.status === 'Inactive'}
                                                        onChange={() => setCurrentUser({ ...currentUser, status: 'Inactive' })}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <AlertCircle size={24} color={currentUser.status === 'Inactive' ? '#ef4444' : 'var(--text-muted)'} />
                                                    <span style={{ fontWeight: '600', color: currentUser.status === 'Inactive' ? '#ef4444' : 'var(--text-muted)' }}>Inactive</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                                        <button type="button" onClick={() => setShowUserModal(false)} className="btn" style={{ padding: '0.8rem 2rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', fontSize: '0.95rem' }}>Cancel</button>
                                        <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 3rem', fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>{isEditingUser ? 'Save Updates' : 'Create User Account'}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {tab === 'books' && (
                    <div className="card animate-fade">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    value={bookSearch}
                                    onChange={(e) => setBookSearch(e.target.value)}
                                    className="input-field"
                                    style={{ paddingLeft: '40px', marginBottom: 0 }}
                                />
                            </div>
                            <button
                                onClick={() => setShowAddBookModal(true)}
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Plus size={18} /> Add New Book
                            </button>
                        </div>

                        {/* Add Book Modal */}
                        {showAddBookModal && (
                            <div className="animate-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="card animate-fade" style={{ maxWidth: '500px', width: '90%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ margin: 0 }}>Add New Book to Catalog</h3>
                                        <button onClick={() => setShowAddBookModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
                                    </div>
                                    <form onSubmit={handleAddBook} style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Book Title</label>
                                            <input required type="text" className="input-field" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} placeholder="e.g. The Hobbit" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Author</label>
                                            <input required type="text" className="input-field" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} placeholder="e.g. J.R.R. Tolkien" />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>ISBN</label>
                                                <input required type="text" className="input-field" value={newBook.isbn} onChange={e => setNewBook({ ...newBook, isbn: e.target.value })} placeholder="XXX-XXXXXXXXXX" />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Initial Stock</label>
                                                <input required type="number" className="input-field" value={newBook.stock} onChange={e => setNewBook({ ...newBook, stock: e.target.value })} placeholder="0" />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <button type="button" onClick={() => setShowAddBookModal(false)} className="btn" style={{ flex: 1, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }}>Cancel</button>
                                            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save to Catalog</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-input)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Book Title</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Author</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>ISBN</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Stock</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.filter(b =>
                                        b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                                        b.author.toLowerCase().includes(bookSearch.toLowerCase())
                                    ).map(book => (
                                        <tr key={book.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '1rem', fontWeight: '600' }}>{book.title}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{book.author}</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>{book.isbn}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ background: book.stock > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: book.stock > 0 ? 'var(--success)' : 'var(--danger)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                                                    {book.stock} Available
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button className="btn" style={{ padding: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBook(book.id)}
                                                        className="btn"
                                                        style={{ padding: '6px', border: '1px solid var(--danger)40', background: 'transparent', color: 'var(--danger)' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {books.filter(b =>
                            b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                            b.author.toLowerCase().includes(bookSearch.toLowerCase())
                        ).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    <Book size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                    <p>No books found matching your search.</p>
                                </div>
                            )}
                    </div>
                )}

                {tab === 'overdue' && (
                    <div className="card animate-fade">
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={24} color="#f59e0b" /> Overdue & Fines Management
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track overdue borrowings and manage active fines.</p>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-input)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>User Name</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Book Title</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Due Date</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Fine Amount</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Status</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {overdueItems.map(item => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{item.user}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.book}</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{item.dueDate}</td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold', color: item.fine > 0 ? 'var(--danger)' : 'var(--text-main)' }}>
                                                ₹{item.fine}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: item.status === 'Returned' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                    color: item.status === 'Returned' ? 'var(--success)' : '#d97706',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button className="btn" style={{ padding: '6px 12px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                                                    Notify
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {tab === 'system' && (
                    <div className="animate-fade" style={{ maxWidth: '1000px' }}>
                        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--text-main), #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Library Policy Configuration
                                </h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Master control for global borrowing rules and penalties.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button className="btn" style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', padding: '0.6rem 1.25rem' }}>Discard</button>
                                <button
                                    onClick={handleSaveSettings}
                                    disabled={isSaving}
                                    className="btn btn-primary"
                                    style={{ padding: '0.6rem 2rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                                >
                                    {isSaving ? 'Updating...' : 'Apply Changes'}
                                </button>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: 'linear-gradient(to right, var(--border), transparent)', marginBottom: '2.5rem' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            <PolicyCard
                                icon={<Calendar size={24} />}
                                title="Default Due Period"
                                value={settings.dueDays}
                                onChange={(val) => setSettings({ ...settings, dueDays: val })}
                                description="The standard number of days a student can keep a borrowed book before it becomes overdue."
                                accentColor="#3b82f6"
                            />
                            <PolicyCard
                                icon={<Coins size={24} />}
                                title="Daily Fine Rate"
                                value={settings.finePerDay}
                                onChange={(val) => setSettings({ ...settings, finePerDay: val })}
                                description="The monetary penalty (₹) charged for each day a book is kept past its calculated return date."
                                accentColor="#f59e0b"
                            />
                            <PolicyCard
                                icon={<BookOpen size={24} />}
                                title="Max Book Limit"
                                value={settings.maxBooks}
                                onChange={(val) => setSettings({ ...settings, maxBooks: val })}
                                description="The global maximum threshold of books any individual student is permitted to hold at once."
                                accentColor="#10b981"
                            />
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
                            border: '1px solid rgba(96, 165, 250, 0.1)',
                            borderRadius: '20px',
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem'
                        }}>
                            <div style={{
                                background: '#60a5fa20',
                                color: '#60a5fa',
                                padding: '1.5rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Shield size={40} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>Global Policy Enforcement</h4>
                                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    Adjusting these parameters will re-calculate all pending active issues and update the user dashboard limits in real-time. Ensure you announce major policy changes to the student body to maintain transparency.
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Profile Settings</h2>
                            <div className="card" style={{ maxWidth: '600px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Lock size={20} /> Change Password
                                </h3>
                                <form onSubmit={handleUpdateAdminPassword} style={{ display: 'grid', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Current Password</label>
                                        <input
                                            required
                                            type="password"
                                            className="input-field"
                                            placeholder="Enter current password"
                                            value={adminProfile.oldPassword}
                                            onChange={e => setAdminProfile({ ...adminProfile, oldPassword: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>New Password</label>
                                        <input
                                            required
                                            type="password"
                                            className="input-field"
                                            placeholder="Enter new password"
                                            value={adminProfile.newPassword}
                                            onChange={e => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <button type="submit" className="btn btn-primary">Update Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {(tab !== 'overview' && tab !== 'users' && tab !== 'system') && (
                    <div className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Module Under Construction</h3>
                        <p>This feature ({tab}) is currently in mock mode.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

function SummaryCard({ icon, title, value, trend, color }) {
    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem', borderLeft: `4px solid ${color}` }}>
            <div style={{ background: `${color}15`, color: color, padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '500' }}>{title}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{value}</p>
                {trend && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{trend}</p>}
            </div>
        </div>
    );
}

function SidebarBtn({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={navBtnStyle(active)}
            className="nav-btn"
        >
            {icon} {label}
        </button>
    );
}

function navBtnStyle(active) {
    return {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        padding: '0.75rem',
        background: active ? 'var(--primary)' : 'transparent',
        color: active ? 'white' : 'var(--text-muted)',
        textAlign: 'left',
        marginBottom: '0.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        border: 'none',
        fontSize: '0.95rem',
        fontWeight: active ? '600' : '400'
    };
}


export default AdminDashboard;

