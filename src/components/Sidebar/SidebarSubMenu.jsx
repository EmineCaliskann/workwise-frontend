import React, { useState } from 'react';

function SubMenu({ items }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ul className={`submenu ${isOpen ? 'open' : ''}`}>
            {items.map((item, index) => (
                <li key={index} className="submenu-item">
                    <a href={item.url} className="submenu-link">{item.label}</a>
                </li>
            ))}
        </ul>
    );
}

export default SubMenu;