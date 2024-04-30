import React from "react";

function SidebarToggler({ isActive, setIsActive }) {
    const toggleSidebar = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    };

    return (
        <>
            <header className="mb-3">
                <a href="#" onClick={(e) => toggleSidebar(e)} className="burger-btn d-block d-xl-none">
                    <i className="bi bi-justify fs-3"></i>
                </a>
            </header>
        </>
    );
}

export default SidebarToggler;