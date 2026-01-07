import { useState } from 'react';
import { Shield, Users, Database, Lock, Activity, LogOut, Settings, HardDrive } from 'lucide-react';

function AdminDashboard({ user, logout }) {
    const activeTab = 'overview';
    const [tab, setTab] = useState('overview');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <Shield size={24} color="#60a5fa" /> Admin Control
                </h2>

                <nav style={{ flex: 1 }}>
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
                    <SidebarBtn
                        icon={<Database size={20} />}
                        label="Master Data"
                        active={tab === 'data'}
                        onClick={() => setTab('data')}
                    />
                    <SidebarBtn
                        icon={<Lock size={20} />}
                        label="Security & Access"
                        active={tab === 'security'}
                        onClick={() => setTab('security')}
                    />
                    <SidebarBtn
                        icon={<Settings size={20} />}
                        label="System Control"
                        active={tab === 'system'}
                        onClick={() => setTab('system')}
                    />
                    <SidebarBtn
                        icon={<HardDrive size={20} />}
                        label="Backups & Health"
                        active={tab === 'health'}
                        onClick={() => setTab('health')}
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
                    {tab === 'overview' ? 'System Overview' : tab.replace('-', ' ')}
                </h1>

                {/* Dashboard Shell Content */}
                {tab === 'overview' && (
                    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>Total Users</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>2,450</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>Active Sessions</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>124</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>System Health</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Good</p>
                        </div>
                    </div>
                )}

                {tab === 'users' && (
                    <div className="card animate-fade">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <input type="text" placeholder="Search users..." className="input-field" style={{ maxWidth: '300px', marginBottom: 0 }} />
                            <button className="btn btn-primary">Add New User</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-input)', textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Name</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Email</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Role</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Status</th>
                                    <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, name: 'John Doe', email: 'john@student.edu', role: 'Student', status: 'Active' },
                                    { id: 2, name: 'Jane Smith', email: 'jane@staff.edu', role: 'Staff', status: 'Active' },
                                    { id: 3, name: 'Admin User', email: 'admin@system.edu', role: 'Admin', status: 'Active' },
                                ].map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '0.75rem' }}>{u.name}</td>
                                        <td style={{ padding: '0.75rem' }}>{u.email}</td>
                                        <td style={{ padding: '0.75rem' }}>{u.role}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{u.status}</span>
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button className="btn" style={{ padding: '4px 8px', fontSize: '0.85rem', marginRight: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(tab !== 'overview' && tab !== 'users') && (
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

const SidebarBtn = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        style={navBtnStyle(active)}
        className="nav-btn"
    >
        {icon} {label}
    </button>
);

const navBtnStyle = (active) => ({
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
});

export default AdminDashboard;
