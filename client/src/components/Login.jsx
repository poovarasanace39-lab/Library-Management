import { useState } from 'react';
import { ArrowLeft, Book, Library, Bookmark, Languages } from 'lucide-react';
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', position: 'relative', overflow: 'hidden' }}>
            <BackgroundAnimation />
            <div className="card animate-fade" style={{ width: '400px', maxWidth: '90%', position: 'relative', zIndex: 1, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem' }}>
                    <div style={{ background: '#4f46e5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                        <Library size={28} />
                    </div>
                    <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {isLoginView ? 'UniLib Portal' : 'Reset Password'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {isLoginView ? 'Welcome back! Please login to your account.' : 'Restore access to your account.'}
                    </p>
                </div>

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
                                style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.9rem', padding: 0, fontWeight: '500' }}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                marginBottom: '1.5rem',
                                background: '#4f46e5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#4338ca';
                                e.target.style.boxShadow = '0 6px 10px -1px rgba(79, 70, 229, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#4f46e5';
                                e.target.style.boxShadow = '0 4px 6px -1px rgba(79, 70, 229, 0.4)';
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
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
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                marginBottom: '1rem',
                                background: '#4f46e5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#4338ca'}
                            onMouseLeave={(e) => e.target.style.background = '#4f46e5'}
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
    );
}

function BackgroundAnimation() {
    const icons = [
        { Icon: Book, size: 40, top: '10%', left: '5%', delay: '0s', animation: 'animate-float' },
        { Icon: Library, size: 60, top: '20%', left: '80%', delay: '2s', animation: 'animate-float-reverse' },
        { Icon: Bookmark, size: 30, top: '60%', left: '10%', delay: '1s', animation: 'animate-float-slow' },
        { Icon: Languages, size: 45, top: '70%', left: '85%', delay: '3s', animation: 'animate-float' },
        { Icon: Book, size: 35, top: '40%', left: '90%', delay: '4s', animation: 'animate-float-reverse' },
        { Icon: Book, size: 50, top: '85%', left: '15%', delay: '5s', animation: 'animate-float' },
        { Icon: Library, size: 40, top: '5%', left: '50%', delay: '6s', animation: 'animate-float-slow' },
        { Icon: Bookmark, size: 35, top: '50%', left: '75%', delay: '7s', animation: 'animate-float-reverse' },
    ];

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
            {icons.map(({ Icon, size, top, left, delay, animation }, index) => (
                <div
                    key={index}
                    className={animation}
                    style={{
                        position: 'absolute',
                        top,
                        left,
                        opacity: 0.1,
                        color: '#4f46e5',
                        animationDelay: delay,
                    }}
                >
                    <Icon size={size} />
                </div>
            ))}
        </div>
    );
}

export default Login;

