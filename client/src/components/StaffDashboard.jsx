import { useState } from 'react';
import { Book, Users, Repeat, LogOut, Plus, Trash2, Edit } from 'lucide-react';

// Mock Data
const MOCK_BOOKS = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Cormen', isbn: '9780262033848', stock: 5, available: 5 },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', stock: 3, available: 0 },
    { id: 3, title: 'Physics for Scientists', author: 'Serway', isbn: '9781133947271', stock: 2, available: 1 },
];

function StaffDashboard({ user, logout }) {
    const [activeTab, setActiveTab] = useState('books'); // 'books', 'users', 'issue'
    const [books, setBooks] = useState(MOCK_BOOKS);
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <Book size={24} color="#10b981" /> Staff Panel
                </h2>

                <nav style={{ flex: 1 }}>
                    <button
                        className={`nav-btn ${activeTab === 'books' ? 'active' : ''}`}
                        onClick={() => setActiveTab('books')}
                        style={navBtnStyle(activeTab === 'books')}
                    >
                        <Book size={20} /> Manage Books
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'issue' ? 'active' : ''}`}
                        onClick={() => setActiveTab('issue')}
                        style={navBtnStyle(activeTab === 'issue')}
                    >
                        <Repeat size={20} /> Issue/Return
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                        style={navBtnStyle(activeTab === 'users')}
                    >
                        <Users size={20} /> Students
                    </button>
                </nav>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                        <p style={{ opacity: 0.7 }}>Staff / Admin</p>
                    </div>
                    <button onClick={logout} style={{ ...navBtnStyle(false), color: 'var(--danger)' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

                {/* Statistics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Books</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,240</p>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Borrowed</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>145</p>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Overdue</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
                    </div>
                </div>

                {activeTab === 'books' && (
                    <div className="animate-fade">
                        <div className="header" style={{ borderBottomColor: 'var(--border)' }}>
                            <h1>Book Management</h1>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                                <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add New Book
                            </button>
                        </div>

                        <div className="card">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-input)', textAlign: 'left' }}>
                                        <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Title</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Author</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>ISBN</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Stock</th>
                                        <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map(book => (
                                        <tr key={book.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '0.75rem' }}>{book.title}</td>
                                            <td style={{ padding: '0.75rem' }}>{book.author}</td>
                                            <td style={{ padding: '0.75rem' }}>{book.isbn}</td>
                                            <td style={{ padding: '0.75rem' }}>
                                                <span style={{
                                                    background: book.available > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                    color: book.available > 0 ? 'var(--success)' : 'var(--danger)',
                                                    padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem'
                                                }}>
                                                    {book.available} / {book.stock}
                                                </span>
                                            </td>
                                            <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn" style={{ padding: '4px 8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)' }}><Edit size={16} /></button>
                                                <button className="btn" style={{ padding: '4px 8px', color: 'var(--danger)', background: 'transparent', border: '1px solid var(--border)' }}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add Book Modal (Mock) */}
                {showAddModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                        <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                            <h2>Add New Book</h2>
                            <div style={{ marginTop: '1rem' }}>
                                <input type="text" placeholder="Title" className="input-field" />
                                <input type="text" placeholder="Author" className="input-field" />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input type="text" placeholder="ISBN" className="input-field" />
                                    <input type="number" placeholder="Copies" className="input-field" />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Save</button>
                                    <button className="btn" style={{ flex: 1, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }} onClick={() => setShowAddModal(false)}>Cancel</button>
                                </div>
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

export default StaffDashboard;
