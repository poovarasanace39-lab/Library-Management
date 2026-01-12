import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Shield, Users, Clock, Layout, ChevronRight, Library, Bookmark, Languages } from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden' }}>
            <BackgroundAnimation />
            {/* Header */}
            <header style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px', color: 'white' }}>
                        <Library size={24} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>UniLib Portal</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: '0.65rem 1.75rem',
                            borderRadius: '50px',
                            background: 'transparent',
                            border: '2px solid #4f46e5',
                            color: '#4f46e5',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#4f46e5';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#4f46e5';
                        }}
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'transparent' }}>
                <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span style={{
                        background: 'rgba(79, 70, 229, 0.1)',
                        color: '#4f46e5',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '1.5rem'
                    }}>
                        Next Gen Library Management
                    </span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Empowering Education with <br /> Smart Management
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
                        A comprehensive solution for students, staff, and administrators.
                        Streamline borrowing, track resources, and manage your library with ease.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                padding: '1.1rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                borderRadius: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#4f46e5',
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.5)';
                                e.target.style.background = '#4338ca';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.4)';
                                e.target.style.background = '#4f46e5';
                            }}
                        >
                            Get Started <ChevronRight size={20} />
                        </button>
                        <a
                            href="#features"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = 'var(--text-muted)';
                            }}
                        >
                            Learn More →
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" style={{ padding: '4rem 2rem', background: 'transparent' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Users size={32} color="#60a5fa" />}
                            title="Student Portal"
                            description="Search catalog, reserve books, and track your borrowing history and due dates instantly."
                        />
                        <FeatureCard
                            icon={<Book size={32} color="#34d399" />}
                            title="Staff Operations"
                            description="Efficiently manage book inventory, handle issues/returns, and manage student records."
                        />
                        <FeatureCard
                            icon={<Shield size={32} color="#a78bfa" />}
                            title="Admin Control"
                            description="Full system configuration, user management, security controls, and detailed analytics."
                        />
                    </div>
                </div>
            </section>

            {/* Stats/Info */}
            <section style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)', background: 'transparent' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>50k+</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Books Available</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>2000+</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Active Students</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>99.9%</h3>
                        <p style={{ color: 'var(--text-muted)' }}>System Uptime</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#020617', color: 'white', padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>
                        <Library size={24} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>UniLib Portal</span>
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>&copy; 2024 University Library System. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', color: '#cbd5e1', fontSize: '0.9rem' }}>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Help Center</span>
                </div>
            </footer>
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

function FeatureCard({ icon, title, description }) {
    return (
        <div className="card" style={{ padding: '2rem', transition: 'transform 0.2s', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', width: 'fit-content', padding: '1rem', borderRadius: '12px' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
        </div>
    );
}

export default LandingPage;

