
import React from "react";
import { Link } from "react-router-dom";
import sample from "../../assets/static/images/logo/company.jpg";

function CompanyCard({ company }) {
    return (
        <>
            <div className="col-xl-4 col-md-6 col-sm-12">
                <Link to={"/company-detail/" + company.id}>
                    <div className="card">
                        <div className="card-content d-flex flex-column">
                            <img src={company.logo ?? sample} className="rounded-circle mx-auto w-50 my-3 company-logo"
                                alt={company.name} />
                            <div className="card-body" style={{ height: "250px" }}>
                                <h4 className="card-title mb-3 company-name">{company.name}</h4>
                                <p className="card-text muted small mb-3">
                                    <i className="bi bi-briefcase-fill"></i>
                                    <span className="ps-3">
                                        {company.title}
                                    </span>
                                </p>
                                <div className="mb-3">
                                    <i className="bi bi-telephone-fill"></i><span className="ps-3">{company.phoneNumber}</span>
                                </div>
                                <div className="mb-3">
                                    <i className="bi bi-envelope-at-fill"></i><span className="ps-3">{company.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default CompanyCard;