import React, { useEffect, useState } from 'react'
import photoExample from "../../assets/static/images/logo/manager.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

function EmployeeAdd() {
    const personelUri = "https://workwiseappi.azurewebsites.net/api/employee";
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [trIdentityNumber, setTrIdentityNumber] = useState("");
    const [profession, setProfession] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [picture, setPicture] = useState("");
    const [status, setStatus] = useState(0);
    const [companyId, setCompanyId] = useState(0);
    const [salary, setSalary] = useState(0);
    const [errors, setErrors] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPicture(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        setCompanyId(parseInt(decoded.CompanyId));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        const formData = new FormData();
        formData.append("FirstName", firstName);
        formData.append("SecondName", secondName);
        formData.append("LastName", lastName);
        formData.append("SecondLastName", secondLastName);
        formData.append("Address", address);
        formData.append("BirthDate", birthDate);
        formData.append("PlaceOfBirth", placeOfBirth);
        formData.append("StartDate", startDate);
        formData.append("EndDate", endDate);
        formData.append("Profession", profession);
        formData.append("Department", department);
        formData.append("PhoneNumber", phoneNumber);
        formData.append("Email", email);
        formData.append("Picture", picture);
        formData.append("Status", status);
        formData.append("TRIdentityNumber", trIdentityNumber);
        formData.append("CompanyId", companyId);

        try {
            const response = await axios.post(personelUri, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            toast.success("Personel Added!");
        } catch (error) {
            console.log(error);
            toast.error("Error adding personel");
            setErrors(error.response.data.errors);
        }
    }

    return (
        <div className="row match-height">
            <h1 className='fw-normal text-center'>Create Employee</h1>
            <hr />
            <form className="form" encType='multipart/form-data' onSubmit={handleSubmit}>
                <input type="hidden" value={companyId} />
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <div className="avatar avatar-2xl">
                                    <img src={selectedImage ? selectedImage : photoExample} alt="Avatar" />
                                </div>
                            </div>
                            <label htmlFor="picture" className="form-label">Employee Photo</label>
                            <input type="file" id="picture" name="picture" className="form-control" onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fname-column" className='form-label'>First Name</label>
                                            <input type="text" id="fname-column" className="form-control"
                                                placeholder="First Name" name="fname-column" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="sname-column" className='form-label'>Second Name</label>
                                            <input type="text" id="sname-column" className="form-control"
                                                placeholder="Second Name" name="sname-column" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="surname-column" className='form-label'>Surname</label>
                                            <input type="text" id="surname-column" className="form-control"
                                                placeholder="Surname" name="surname-column" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ssurname-column" className='form-label'>Second Surname</label>
                                            <input type="text" id="ssurname-column" className="form-control"
                                                placeholder="Second Surname" name="ssurname-column" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="id-column" className='form-label'>Identity Number</label>
                                            <input type="text" id="id-column" className="form-control"
                                                placeholder="XXXXXXXXXXX" name="id-column" value={trIdentityNumber} onChange={(e) => setTrIdentityNumber(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="birthdate-column" className='form-label'>Birth Date</label>
                                            <input type="date" id="birthdate-column" className="form-control" name="birthdate-column" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="birthplace-column" className='form-label'>Birth Place</label>
                                            <input type="text" id="birthplace-column" className="form-control" placeholder="Birth Place"
                                                name="birthplace-column" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="title-column" className='form-label'>Title</label>
                                            <input type="text" id="title-column" className="form-control"
                                                name="title-column" placeholder="Title" value={profession} onChange={(e) => setProfession(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="hiredate-column" className='form-label'>Hire Date</label>
                                            <input type="date" id="hiredate-column" className="form-control" name="hiredate-column" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="leavedate-column" className='form-label'>Leave Date</label>
                                            <input type="date" id="leavedate-column" className="form-control" name="leavedate-column" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="department-column" className='form-label'>Department</label>
                                            <input type="text" id="department-column" className="form-control"
                                                name="department-column" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone-column" className='form-label'>Phone Number</label>
                                            <input type="tel" id="phone-column" className="form-control"
                                                name="phone-column" placeholder="05xx xxx xx xx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="email-id-column" className='form-label'>Email</label>
                                            <input type="email" id="email-id-column" className="form-control"
                                                name="email-id-column" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="salary-column" className='form-label'>Salary</label>
                                            <input type="number" id="salary-column" className="form-control"
                                                placeholder="XXXXXXXXXXX" name="salary-column" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group col-12">
                                        <div className='form-check'>
                                            <div className="checkbox">
                                                <input type="checkbox" id="checkbox5" className='form-check-input' value={status} onChange={(e) => setStatus(e.target.value ? 1 : 0)} />
                                                <label htmlFor="checkbox5">Status</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="address-column" className='form-label'>Address</label>
                                            <textarea type="text" rows={4} id="address-column" className="form-control"
                                                name="address-column" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between mt-3">
                                        <button type="reset" className="btn btn-light-danger me-1 mb-1 px-3">Reset</button>
                                        <button type="submit" className="btn btn-primary me-1 mb-1 px-3">Submit</button>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Validation Errors */}
                    <section>
                        {errors.Picture && errors.Picture.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.FirstName && errors.FirstName.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.SecondName && errors.SecondName.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.LastName && errors.LastName.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.SecondLastName && errors.SecondLastName.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.TRIdentityNumber && errors.TRIdentityNumber.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.BirthDate && errors.BirthDate.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.PlaceOfBirth && errors.PlaceOfBirth.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Profession && errors.Profession.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.StartDate && errors.StartDate.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.EndDate && errors.EndDate.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Department && errors.Department.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Picture && errors.Picture.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Wage && errors.Wage.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Address && errors.Address.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                    </section>
                </div>
            </form>
        </div>
    )
}

export default EmployeeAdd