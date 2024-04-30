import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileDetail() {
    const uri = "https://workwiseappi.azurewebsites.net/api/user?id="
    const [info, setInfo] = useState(null);

    useEffect(() => {
        Get(localStorage.getItem("userId"));
    }, []);

    async function Get(id) {
        try {
            const response = await axios.get(uri + id);
            if (response.data && response.data.personalDetail) {
                setInfo(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="row">
                <h1 className='fw-normal text-center'>Profile Details</h1>
                <hr />
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <div className="avatar avatar-2xl">
                                    <img src={info ? info.personalDetail.filePath : ""} alt="Avatar" />
                                </div>

                                <h3 className="mt-3">{info ? info.personalDetail.firstName + " " + info.personalDetail.lastName : ""}</h3>
                                <p className="text-small">{info ? info.personalDetail.profession : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Name</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.firstName : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Second Name</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.secondName == "" ? "-" : info.personalDetail.secondName : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Surname</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.lastName : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Second Surname</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.secondLastName == "" ? "-" : info.personalDetail.secondLastName : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Birth Date</div>
                                <div className="col-9 profileInfo">{info ? new Date(info.personalDetail.birthDate).toLocaleDateString() : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Birth Place</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.placeOfBirth : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Identification Number</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.trIdentityNumber : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Hire Date</div>
                                <div className="col-9 profileInfo">{info ? new Date(info.personalDetail.startDate).toLocaleDateString() : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Leave Date</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.endDate ? new Date(info.personalDetail.endDate).toLocaleDateString() : "-" : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Active</div>
                                <div className="col-9 profileInfo fs-4">
                                    {info ? info.personalDetail.status == 1 ? <i className="bi bi-check-lg"></i> : <i class="bi bi-x-lg"></i> : ""}
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Title</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.profession : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Department</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.department : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Email</div>
                                <div className="col-9 profileInfo">{info ? info.email : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Phone</div>
                                <div className="col-9 profileInfo">{info ? info.phoneNumber : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Address</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.address : ""}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to="/update" className="btn btn-primary">Update Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileDetail;