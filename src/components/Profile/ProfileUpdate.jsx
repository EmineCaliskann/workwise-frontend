import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileUpdate() {

    const navigate = useNavigate();
    const id = localStorage.getItem("userId");
    const [selectedImage, setSelectedImage] = useState(null);
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState(null);
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState("");
    const uri = "https://workwiseappi.azurewebsites.net/api/user?id="

    useEffect(() => {
        Get(id);
    }, []);

    async function Get(id) {
        try {
            const response = await axios.get(uri + id);
            if (response.data && response.data.personalDetail) {
                setAddress(response.data.personalDetail.address);
                setPhone(response.data.phoneNumber);
                setSelectedImage(response.data.personalDetail.filePath);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        const formData = new FormData();
        formData.append('PhoneNumber', phone);
        formData.append('Address', address);
        formData.append('Picture', photo);

        try {
            const response = await axios.put(`${uri}${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Error updating profile");
            console.log(error);
            setErrors(error.response.data.errors)
        }
    }

    return (
        <>
            <div className="row">
                <h1 className='fw-normal text-center'>Update Profile</h1>
                <hr />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <div className="avatar avatar-2xl">
                                        <img src={selectedImage ? selectedImage : ""} alt="Avatar" />
                                    </div>
                                </div>
                                <label htmlFor="picture" className="form-label">Picture</label>
                                <input type="file" id="picture" name="picture" className="form-control" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" name="phone" id="phone" className="form-control" placeholder="5xxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="birthday" className="form-label">Address</label>
                                    <textarea rows={6} name="birthday" id="birthday" className="form-control" placeholder="Your Address.." value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success">Save Changes</button>
                                </div>
                            </div>
                        </div>
                        {errors.PhoneNumber && errors.PhoneNumber.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Address && errors.Address.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Picture && errors.Picture.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileUpdate;