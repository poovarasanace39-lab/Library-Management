import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Shield, Users, Clock, Layout, ChevronRight, Library } from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-body)', color: 'var(--text-main)' }}>
            {/* Header */}
            <header style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px', color: 'white' }}>
                        <Library size={24} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>UniLib Portal</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-primary"
                        style={{ padding: '0.6rem 1.5rem', borderRadius: '50px' }}
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, var(--bg-body), var(--bg-card))' }}>
                <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span style={{
                        background: 'rgba(59, 130, 246, 0.15)', // transparent primary
                        color: 'var(--primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '1.5rem'
                    }}>
                        Next Gen Library Management
                    </span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Empowering Education with <br /> Smart Management
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
                        A comprehensive solution for students, staff, and administrators.
                        Streamline borrowing, track resources, and manage your library with ease.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/login')}
                            className="btn btn-primary"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            Get Started <ChevronRight size={20} />
                        </button>
                        <button
                            className="btn"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)' }}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 2rem', background: 'var(--bg-body)' }}>
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
            <section style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>50k+</h3>
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
