import { useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [isLoginView, setIsLoginView] = useState(true); // Toggle between Login and Forgot Password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success messages

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulating API call since we can't run backend yet
        // In real app: fetch('/api/login', ...)

        setTimeout(() => {
            if (email && password) {
                // Mock Logic for Role Detection
                const lowerEmail = email.toLowerCase();
                let detectedRole = 'student';
                let userName = 'Student User';

                if (lowerEmail.includes('admin')) {
                    detectedRole = 'admin';
                    userName = 'System Administrator';
                } else if (lowerEmail.includes('staff')) {
                    detectedRole = 'staff';
                    userName = 'Staff Member';
                }

                setUser({
                    id: 1,
                    name: userName,
                    role: detectedRole,
                    email: email
                });
            } else {
                setError('Please enter valid credentials');
            }
            setLoading(false);
        }, 1000);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        setTimeout(() => {
            if (email) {
                setMessage('If an account exists with this email, a password reset link has been sent.');
            } else {
                setError('Please enter your email address');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)' }}>
            <div className="card animate-fade" style={{ width: '400px', maxWidth: '90%', position: 'relative' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)', marginTop: '1rem' }}>
                    {isLoginView ? 'Library Portal' : 'Reset Password'}
                </h2>

                {isLoginView ? (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your institutional email"
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoginView(false);
                                    setError('');
                                    setMessage('');
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>Demo Accounts (Click to Fill)</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => { setEmail('admin@system.edu'); setPassword('demo123'); }}
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: '#1e3a8a', color: '#93c5fd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEmail('staff@library.edu'); setPassword('demo123'); }}
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: '#14532d', color: '#86efac', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Staff
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEmail('student@university.edu'); setPassword('demo123'); }}
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: '#334155', color: '#cbd5e1', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Student
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPassword}>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                            />
                        </div>

                        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
                        {message && <p style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginView(true);
                                setError('');
                                setMessage('');
                            }}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'transparent',
                                border: '1px solid var(--border)',
                                borderRadius: '0.375rem',
                                color: 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login
