import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <img src="/assets/profile-photo.svg" alt="Profile" />
            <h1>你的姓名</h1>
            <p>Email: your.email@example.com</p>
            <p>
                YouTube: <a href="https://www.youtube.com/channel/你的頻道ID" target="_blank" rel="noopener noreferrer">你的頻道名稱</a>
            </p>
            <p>大學: 你的大學名稱</p>
        </header>
    );
};

export default Header;