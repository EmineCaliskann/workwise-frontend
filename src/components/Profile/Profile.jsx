import React from "react";
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const uri = "https://workwiseappi.azurewebsites.net/api/user?id="
    const [info, setInfo] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        Get(userId);
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
                <h1 className='fw-normal text-center'>Profile</h1>
                <hr />
                <div className="col-12 col-lg-4">
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
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Name</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.firstName : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Surname</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.lastName : ""}</div>
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
                                <div className="col-3 fw-bold">Job</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.profession : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Department</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.department : ""}</div>
                            </div>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-3 fw-bold">Address</div>
                                <div className="col-9 profileInfo">{info ? info.personalDetail.address : ""}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to={"/reset-password/" + localStorage.getItem("userId")} className="btn btn-danger">Reset Password</Link>
                                <Link to="/update" className="btn btn-primary">Update Profile</Link>
                                <Link to="/detail" className="btn btn-secondary">Profile Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile