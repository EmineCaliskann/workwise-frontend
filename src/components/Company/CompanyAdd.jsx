import React, { useState } from 'react'
import photoExample from "../../assets/static/images/logo/company.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

function CompanyAdd() {
    const uri = "https://workwiseappi.azurewebsites.net/api/company";
    const [selectedImage, setSelectedImage] = useState("");
    const [logo, setLogo] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [mersisNumber, setMersisNumber] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    const [taxAdministration, setTaxAdministration] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [foundingYear, setFoundingYear] = useState("");
    const [contractStartDate, setContractStartDate] = useState("");
    const [contractEndDate, setContractEndDate] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [numberOfEmployees, setNumberOfEmployees] = useState(0);
    const [status, setStatus] = useState(0);
    const [errors, setErrors] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setLogo(file);
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
        formData.append('Logo', logo);
        formData.append('Name', name);
        formData.append('Title', title);
        formData.append('MersisNumber', mersisNumber);
        formData.append('TaxNumber', taxNumber);
        formData.append('TaxAdministration', taxAdministration);
        formData.append('PhoneNumber', phoneNumber);
        formData.append('FoundingYear', foundingYear);
        formData.append('ContractStartDate', contractStartDate);
        formData.append('ContractEndDate', contractEndDate);
        formData.append('Address', address);
        formData.append('Email', email);
        formData.append('NumberOfEmployees', numberOfEmployees);
        formData.append('Status', status);

        try {
            const response = await axios.post(uri, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            toast.success("Company Added!");
        } catch (error) {
            setErrors(error.response.data.errors);
            toast.error("Error adding company!");
        }
    }

    return (
        <>
            <div className="row match-height">
                <h1 className='fw-normal text-center'>Create Company</h1>
                <hr />
                <form className="form" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <div className="avatar avatar-2xl">
                                        <img src={selectedImage ? selectedImage : photoExample} alt="Avatar" />
                                    </div>
                                </div>
                                <label htmlFor="picture" className="form-label">Company Logo</label>
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
                                                <label htmlFor="company-name-column" className='mb-2'>Company Name</label>
                                                <input type="text" id="company-name-column" className="form-control"
                                                    placeholder="Company Name" name="cname-column" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="company-title-column" className='mb-2'>Company Title</label>
                                                <input type="text" id="company-title-column" className="form-control"
                                                    placeholder="Company Title" name="ctitle-column" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="mersis-column" className='mb-2'>Mersis No</label>
                                                <input type="text" id="mersis-column" className="form-control" placeholder="City"
                                                    name="mersis-column" value={mersisNumber} onChange={(e) => setMersisNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="taxno-column" className='mb-2'>Tax No</label>
                                                <input type="text" id="taxno-column" className="form-control"
                                                    name="taxno-column" placeholder="Tax No" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="taxadmin-column" className='mb-2'>Tax Administration</label>
                                                <input type="text" id="taxadmin-column" className="form-control"
                                                    name="taxadmin-column" placeholder="Tax Administration" value={taxAdministration} onChange={(e) => setTaxAdministration(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="phone-column" className='mb-2'>Phone Number</label>
                                                <input type="tel" id="phone-column" className="form-control"
                                                    name="phone-column" placeholder="05xx xxx xx xx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="email-id-column" className='mb-2'>Email</label>
                                                <input type="email" id="email-id-column" className="form-control"
                                                    name="email-id-column" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="personelqty-column" className='mb-2'>Personel Quantity</label>
                                                <input type="number" id="personelqty-column" className="form-control"
                                                    name="personelqty-column" placeholder="Personel Quantity" value={numberOfEmployees} onChange={(e) => setNumberOfEmployees(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="contractstart-column" className='mb-2'>Contract Start Date</label>
                                                <input type="date" min={2000} max={new Date().getDate()} id="contractstart-column" className="form-control"
                                                    name="contractstart-column" placeholder="Contract Start Date" value={contractStartDate} onChange={(e) => setContractStartDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="contractend-column" className='mb-2'>Contract End Date</label>
                                                <input type="date" id="contractend-column" className="form-control"
                                                    name="contractend-column" placeholder="Contract End Date" value={contractEndDate} onChange={(e) => setContractEndDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="address-column" className='mb-2'>Address</label>
                                                <textarea type="text" rows={4} id="address-column" className="form-control"
                                                    name="address-column" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="founding-column" className='mb-2'>Founding Year</label>
                                                <input type="number" min={578} max={new Date().getFullYear()} id="founding-column" className="form-control"
                                                    name="founding-column" placeholder="Founding Year" value={foundingYear} onChange={(e) => setFoundingYear(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group col-12">
                                            <div className='form-check'>
                                                <div className="checkbox">
                                                    <input type="checkbox" id="checkbox5" className='form-check-input' value={status} onChange={(e) => setStatus(e.target.value == true ? 1 : 0)} />
                                                    <label htmlFor="checkbox5">Status</label>
                                                </div>
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
                        {errors.Logo && errors.Logo.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Name && errors.Name.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Title && errors.Title.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.MersisNumber && errors.MersisNumber.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.TaxNumber && errors.TaxNumber.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.TaxAdministration && errors.TaxAdministration.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.PhoneNumber && errors.PhoneNumber.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.FoundingYear && errors.FoundingYear.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Address && errors.Address.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.Email && errors.Email.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                        {errors.NumberOfEmployees && errors.NumberOfEmployees.map((error, index) => (
                            <div key={index} className="alert alert-light-danger color-danger">
                                <i className="bi bi-exclamation-circle"></i> <span>{error}</span>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CompanyAdd