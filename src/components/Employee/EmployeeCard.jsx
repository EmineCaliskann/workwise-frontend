import React from 'react'
import managerSample from "../../assets/static/images/logo/manager.jpg"
import { FaRegIdBadge } from "react-icons/fa";
import { BsDiagram3 } from "react-icons/bs";
import { Link } from 'react-router-dom';

function EmployeeCard({ employee }) {
    return (
        <div className="col-md-10 col-lg-8 mx-auto">
            <Link to={"/employee-detail/" + employee.id}>
                <div className="card overflow-hidden company-card">
                    <div className="card-content">
                        <div className="card-body row p-0">
                            <div className="col-sm-5" style={{ aspectRatio: "4/3" }}>
                                <img src={employee.personalDetail.filePath ?? managerSample} className="w-100 h-100 object-fit-cover" />
                            </div>
                            <div className='col-sm-7 d-flex'>
                                <div className='my-auto p-4'>
                                    <h4 className='fw-normal mb-3 employee-name'>{employee.personalDetail.firstName + " " + (employee.personalDetail.secondName ?? "") + " " + employee.personalDetail.lastName + " " + (employee.personalDetail.secondLastName ?? "")}</h4>
                                    <div className='mb-2'>
                                        <FaRegIdBadge /><span className='ps-3'>{employee.personalDetail.profession}</span>
                                    </div>
                                    <div className='mb-2'>
                                        <BsDiagram3 /><span className='ps-3'>{employee.personalDetail.department}</span>
                                    </div>
                                    <div className="mb-2">
                                        <i className="bi bi-building-fill"></i><span className="ps-3">{employee.company.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <i className="bi bi-telephone-fill"></i><span className="ps-3">{employee.phoneNumber}</span>
                                    </div>
                                    <div className="mb-2">
                                        <i className="bi bi-envelope-at-fill"></i><span className="ps-3">{employee.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default EmployeeCard