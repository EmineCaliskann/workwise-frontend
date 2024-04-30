import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile/Profile'
import ProfileUpdate from './Profile/ProfileUpdate'
import ProfileDetail from './Profile/ProfileDetail'
import CompanyList from './Company/CompanyList'
import CompanyDetail from './Company/CompanyDetail'
import CompanyAdd from './Company/CompanyAdd'
import CompanyManagerAdd from './CompanyManager/CompanyManagerAdd'
import CompanyManagerList from './CompanyManager/CompanyManagerList'
import Sidebar from './Sidebar/Sidebar'
import SidebarToggler from './Sidebar/SidebarToggler'
import NotFound from './Error/NotFound'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import RequestForm from './Request/RequestForm'
import RequestList from './Request/RequestList'
import RequestManage from './Request/RequestManage'
import EmployeeAdd from './Employee/EmployeeAdd'
import EmployeeList from './Employee/EmployeeList'
import EmployeeDetail from './Employee/EmployeeDetail'

function Template({ theme, setTheme }) {
    const [isActive, setIsActive] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [isSiteOwner, setIsSiteOwner] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            const decoded = jwtDecode(token);
            localStorage.setItem("userId", decoded.Id);
            if (decoded.IsConfirmed === "False") {
                navigate("/reset-password/" + decoded.Id);
            }
            else {

                if (decoded.Role === "CompanyManager") {
                    setIsManager(true);
                }
                if (decoded.Role === "SiteOwner") {
                    setIsSiteOwner(true);
                }
                if (decoded.Role === "Employee") {
                    setIsEmployee(true);
                }
            }
        }
    }, []);

    return (
        <>
            <Sidebar isActive={isActive} setIsActive={setIsActive} theme={theme} setTheme={setTheme} isSiteOwner={isSiteOwner} isManager={isManager} isEmployee={isEmployee} />
            <div id="main">
                <SidebarToggler isActive={isActive} setIsActive={setIsActive} />
                <div id="app">
                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/update" element={<ProfileUpdate />} />
                        <Route path="/detail" element={<ProfileDetail />} />
                        {isSiteOwner ? <>
                            <Route path="/company-list" element={<CompanyList />} />
                            <Route path="/company-detail/:id" element={<CompanyDetail />} />
                            <Route path="/company-add" element={<CompanyAdd />} />
                            <Route path="/company-manager-add" element={<CompanyManagerAdd />} />
                            <Route path="/company-manager-list" element={<CompanyManagerList />} />
                        </> : ""}
                        {isManager ?
                            <>
                                <Route path="/employee-add" element={<EmployeeAdd />} />
                                <Route path="/employee-list" element={<EmployeeList />} />
                                <Route path="/employee-detail/:id" element={<EmployeeDetail />} />
                                <Route path="/request-manage" element={<RequestManage />} />
                            </>
                            : ""}
                        {isEmployee ?
                            <>
                                <Route path="/request-form" element={<RequestForm />} />
                                <Route path="/request-list" element={<RequestList />} />
                            </>
                            : ""}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <footer>
                    <hr />
                    <div className="footer clearfix mb-0 text-muted">
                        <div className="float-start">
                            <p>2024 © WorkWise</p>
                        </div>
                        <div className="float-end">
                            <p>All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Template