import { useState } from 'react';
import { Book, Clock, User, LogOut, Search, AlertCircle } from 'lucide-react';

// Mock Data
const MOCK_BOOKS = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Cormen', isbn: '9780262033848', status: 'Available', subject: 'CS' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', status: 'Borrowed', subject: 'CS' },
    { id: 3, title: 'Physics for Scientists', author: 'Serway', isbn: '9781133947271', status: 'Available', subject: 'Physics' },
];

const MOCK_BORROWED = [
    { id: 101, title: 'Clean Code', dueDate: '2023-11-15', status: 'Overdue', fine: 5.00 },
    { id: 102, title: 'Design Patterns', dueDate: '2023-12-01', status: 'Borrowed', fine: 0.00 },
];

function StudentDashboard({ user, logout }) {
    const [activeTab, setActiveTab] = useState('search'); // 'search', 'my-books', 'profile'
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = MOCK_BOOKS.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <Book size={24} color="#3b82f6" /> Library
                </h2>

                <nav style={{ flex: 1 }}>
                    <button
                        className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
                        onClick={() => setActiveTab('search')}
                        style={navBtnStyle(activeTab === 'search')}
                    >
                        <Search size={20} /> Browse Books
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'my-books' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-books')}
                        style={navBtnStyle(activeTab === 'my-books')}
                    >
                        <Clock size={20} /> My Books
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                        style={navBtnStyle(activeTab === 'profile')}
                    >
                        <User size={20} /> My Profile
                    </button>
                </nav>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                        <p style={{ opacity: 0.7 }}>Student</p>
                    </div>
                    <button onClick={logout} style={{ ...navBtnStyle(false), color: 'var(--danger)' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {activeTab === 'search' && (
                    <div className="animate-fade">
                        <h1 className="header" style={{ borderBottomColor: 'var(--border)' }}>Browse Library Catalog</h1>

                        <div className="card">
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Search by title, author, or ISBN..."
                                    className="input-field"
                                    style={{ marginBottom: 0 }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-primary">Search</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                            {filteredBooks.map(book => (
                                <div key={book.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{book.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>by {book.author}</p>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            background: 'var(--bg-input)', // using bg-input as a neutral background for tags
                                            display: 'inline-block',
                                            marginBottom: '1rem',
                                            border: '1px solid var(--border)'
                                        }}>
                                            {book.subject}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                        <span style={{
                                            color: book.status === 'Available' ? 'var(--success)' : '#f59e0b',
                                            fontWeight: '500',
                                            fontSize: '0.9rem'
                                        }}>
                                            {book.status}
                                        </span>
                                        <button
                                            className="btn btn-primary"
                                            disabled={book.status !== 'Available'}
                                            style={{ opacity: book.status !== 'Available' ? 0.5 : 1, padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                                        >
                                            Reserve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'my-books' && (
                    <div className="animate-fade">
                        <h1 className="header" style={{ borderBottomColor: 'var(--border)' }}>My Borrowed Books</h1>

                        <div className="card">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem' }}>Title</th>
                                        <th style={{ padding: '1rem' }}>Due Date</th>
                                        <th style={{ padding: '1rem' }}>Status</th>
                                        <th style={{ padding: '1rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_BORROWED.map(item => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem' }}>{item.title}</td>
                                            <td style={{ padding: '1rem' }}>{item.dueDate}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    color: item.status === 'Overdue' ? 'var(--danger)' : 'var(--success)',
                                                    fontWeight: 500
                                                }}>
                                                    {item.status}
                                                    {item.status === 'Overdue' && <AlertCircle size={16} />}
                                                </span>
                                                {item.fine > 0 && <span style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>Fine: ${item.fine}</span>}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button className="btn" style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }}>Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-fade">
                        <h1 className="header" style={{ borderBottomColor: 'var(--border)' }}>My Profile</h1>
                        <div className="card" style={{ maxWidth: '600px' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 'bold' }}>Name</label>
                                <p>{user.name}</p>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
                                <p>{user.email}</p>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 'bold' }}>Role</label>
                                <p style={{ textTransform: 'capitalize' }}>{user.role}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

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
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: active ? '600' : '400'
});

export default StudentDashboard;
