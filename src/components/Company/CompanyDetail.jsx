import React, { useEffect, useState } from 'react'
import photoExample from "../../assets/static/images/samples/building.jpg"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function CompanyDetail() {
    const params = useParams();

    const uri = "https://workwiseappi.azurewebsites.net/api/company/"
    const [companyDetail, setCompanyDetail] = useState("");

    useEffect(() => {
        Get();
    }, []);

    async function Get() {
        try {
            const response = await axios.get(uri + params.id);
            if (response.data) {
                setCompanyDetail(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    return (
        <>
            <div className="row">
                <h1 className='fw-normal text-center'>{companyDetail.name}</h1>
                <hr />
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <div className="avatar avatar-2xl">
                                    <img src={companyDetail.logo} alt="Avatar" />
                                </div>
                                <h3 className="mt-3">{companyDetail.name}</h3>
                                <p className="text-small">{companyDetail.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Company Name</div>
                                <div className="col-9 profileInfo">{companyDetail.name}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Company Title</div>
                                <div className="col-9 profileInfo">{companyDetail.title}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Mersis No</div>
                                <div className="col-9 profileInfo">{companyDetail.mersisNumber}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Tax Number</div>
                                <div className="col-9 profileInfo">{companyDetail.taxNumber}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Tax Administration</div>
                                <div className="col-9 profileInfo">{companyDetail.taxAdministration}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Phone</div>
                                <div className="col-9 profileInfo">{companyDetail.phoneNumber}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Address</div>
                                <div className="col-9 profileInfo">{companyDetail.address}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">E-mail</div>
                                <div className="col-9 profileInfo">{companyDetail.email}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Personel Quantity</div>
                                <div className="col-9 profileInfo">{companyDetail.numberOfEmployees}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Founding Year</div>
                                <div className="col-9 profileInfo">{companyDetail.foundingYear}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Contract Start Date</div>
                                <div className="col-9 profileInfo">{new Date(companyDetail.contractStartDate).toLocaleDateString()}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Contract End Date</div>
                                <div className="col-9 profileInfo">{companyDetail.contractEndDate ? new Date(companyDetail.contractEndDate).toLocaleDateString() : "-"}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Status</div>
                                <div className="col-9 profileInfo">{companyDetail.status == 1 ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyDetail