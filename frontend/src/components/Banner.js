import React from 'react';

const Banner = ({ message, type, onClose }) => {
    return (
        <div className={`banner ${type}`}>
            <div className="banner-content">
                <div className="banner-message">
                    {type === 'success' && <span>✅ </span>}
                    {type === 'error' && <span>❌ </span>}
                    {message}
                </div>
                <button className="banner-close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default Banner; 