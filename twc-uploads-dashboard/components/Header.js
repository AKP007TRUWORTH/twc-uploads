import React from 'react';

const Header = () => {

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#2f353b', padding: '10px 20px', color: 'white', marginBottom: '20px'
        }}>
            <div style={{
                display: 'flex', alignItems: 'center',
                fontSize: '24px', fontWeight: 'bold',
            }}>
                <span style={{ color: '#35AEA4' }}>
                    The WellnessCorner
                </span>
            </div>
            <div style={{
                display: 'flex',
                gap: '20px',
            }}>
                <a href="#" style={{ color: 'white', fontSize: 16 }}>
                    Features & Services
                </a>
                <a href="#" style={{ color: 'white', fontSize: 16 }}>
                    Knowledge base
                </a>
                <a href="#" style={{ color: 'white', fontSize: 16 }}>
                    Blog
                </a>
                <a href="#" style={{ color: 'white', fontSize: 16 }}>
                    Wall of apps
                </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '14px', }}>
                <span>user@truworthwellness.com</span>
                <span>Dashboard</span>
            </div>
            <div style={{ display: 'none', fontSize: '24px', cursor: 'pointer', }}>
                <span>☰</span>
            </div>
        </nav>
    );
};

export default Header;
