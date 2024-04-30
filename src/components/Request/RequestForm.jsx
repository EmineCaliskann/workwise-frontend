import React, { useEffect, useState } from 'react'
import ExpenseTypeSelector from './ExpenseTypeSelector';
import AdvanceTypeSelector from './AdvanceTypeSelector';
import LeaveTypeSelector from './LeaveTypeSelector';
import requestBackground from '../../assets/compiled/svg/form.svg'
import axios from 'axios';
import { toast } from 'react-toastify';

function RequestForm() {
    const expenseUri = "https://workwiseappi.azurewebsites.net/api/expense/";
    const advanceUri = "https://workwiseappi.azurewebsites.net/api/advance/";
    const leaveUri = "https://workwiseappi.azurewebsites.net/api/leave/";
    const userId = localStorage.getItem("userId");
    const [requestType, setRequestType] = useState("0");
    const [selectedExpenseType, setSelectedExpenseType] = useState(null);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseCurrency, setExpenseCurrency] = useState("0");
    const [file, setFile] = useState("");
    const [selectedAdvanceType, setSelectedAdvanceType] = useState(null);
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const [advanceCurrency, setAdvanceCurrency] = useState("0");
    const [description, setDescription] = useState("");
    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remainingDays, setRemainingDays] = useState("");

    useEffect(() => {
        Get(userId);
    }, [])

    async function Get(id) {
        try {
            const response = await axios.get(leaveUri + "remainingLeaves/" + id);
            console.log(response.data);
            setRemainingDays(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleExpenseRequest = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Amount', parseInt(expenseAmount));
        formData.append('Currency', parseInt(expenseCurrency));
        formData.append('File', file);
        formData.append('ExpenseType', parseInt(selectedExpenseType));

        try {
            const response = await axios.post(expenseUri + userId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Expense request submitted succesfully");
        } catch (error) {
            toast.error("Invalid Attempt")
        }
    }

    const handleAdvanceRequest = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Amount', parseInt(advanceAmount));
        formData.append('Currency', parseInt(advanceCurrency));
        formData.append('Description', description);
        formData.append('AdvanceType', parseInt(selectedAdvanceType));

        try {
            const response = await axios.post(advanceUri + userId, formData);
            console.log(response);
            toast.success("Advance request submitted succesfully");
        } catch (error) {
            console.log(error);
            toast.error("Invalid Attempt")
        }
    }

    const handleLeaveRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(leaveUri + userId, {
                "startDate": startDate,
                "endDate": endDate,
                "leaveType": parseInt(selectedLeaveType)
            });
            console.log(response);
            toast.success("Leave request submitted succesfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const handleFileChange = (event) => {
        const uploaded = event.target.files[0];
        setFile(uploaded);
    };

    return (
        <>
            <h1></h1>
            <div className="row">
                <h1 className='fw-normal text-center'>Request Forms</h1>
                <hr />
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className='mb-3'>Please select request type you want to make?</h4>
                            <select id="request-type" className='form-select' onChange={(e) => setRequestType(e.target.value)}>
                                <option value="0">Select a request type</option>
                                <option value="1">Expense Request</option>
                                <option value="2">Advance Request</option>
                                <option value="3">Leave Request</option>
                            </select>
                        </div>
                    </div>
                </div>
                {requestType === "0" &&
                    <div className='text-center'>
                        <img src={requestBackground} style={{ width: "50%", maxWidth: "400px", minWidth: "250px", opacity: ".8" }} alt="" />
                        <p className='fs-5'>Please select the type of request form you'd like to use from the options above.</p>
                    </div>
                }
                {/* Expense Request */}
                {requestType === "1" &&
                    <>
                        <form onSubmit={handleExpenseRequest} encType='multipart/form-data'>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='mb-3' style={{ fontWeight: "600", fontSize: "1rem" }}>Expense Type</h5>
                                        <ExpenseTypeSelector
                                            selectedExpenseType={selectedExpenseType}
                                            setSelectedExpenseType={setSelectedExpenseType}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className='form-group'>
                                                        <label htmlFor="txtAmount" className='form-label'>Amount</label>
                                                        <div className="input-group mb-3">
                                                            <input id='txtAmount' type="number" className='form-control' value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
                                                            <select className="form-select" id="inputGroupSelect01" style={{ maxWidth: "4rem" }} value={expenseCurrency} onChange={(e) => setExpenseCurrency(e.target.value)}>
                                                                <option value="0">₺</option>
                                                                <option value="1">$</option>
                                                                <option value="2">€</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className='form-group'>
                                                        <label htmlFor="txtFile" className='form-label'>File</label>
                                                        <input type="file" id='txtFile' className='form-control' accept='.pdf, .jpg, .jpeg, .png' onChange={handleFileChange} />
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
                            </div>
                        </form>
                    </>
                }
                {/* Advance Request */}
                {requestType === "2" &&
                    <>
                        <form onSubmit={handleAdvanceRequest}>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='mb-3' style={{ fontWeight: "600", fontSize: "1rem" }}>Advance Type</h5>
                                        <AdvanceTypeSelector
                                            selectedAdvanceType={selectedAdvanceType}
                                            setSelectedAdvanceType={setSelectedAdvanceType}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className='form-group'>
                                                        <label htmlFor="txtAmount" className='form-label'>Amount</label>
                                                        <div className="input-group mb-3">
                                                            <input id='txtAmount' type="number" className='form-control' value={advanceAmount} onChange={(e) => setAdvanceAmount(e.target.value)} />
                                                            <select className="form-select" id="inputGroupSelect01" style={{ maxWidth: "4rem" }} value={advanceCurrency} onChange={(e) => setAdvanceCurrency(e.target.value)}>
                                                                <option value="0">₺</option>
                                                                <option value="1">$</option>
                                                                <option value="2">€</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className='form-group'>
                                                        <label htmlFor="txtAmount" className='form-label'>Description</label>
                                                        <textarea type="text" rows={3} className='form-control' accept='.pdf' value={description} onChange={(e) => setDescription(e.target.value)} />
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
                            </div>
                        </form>
                    </>
                }
                {/* Leave Request */}
                {requestType === "3" &&
                    <>
                        <form onSubmit={handleLeaveRequest}>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='mb-0' style={{ fontWeight: "600", fontSize: "1rem" }}>Remaining Leave Days: <span style={{ fontSize: "1.2rem" }} className='fw-bold ms-2'>{remainingDays}</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='mb-3' style={{ fontWeight: "600", fontSize: "1rem" }}>Leave Type</h5>
                                        <LeaveTypeSelector
                                            selectedLeaveType={selectedLeaveType}
                                            setSelectedLeaveType={setSelectedLeaveType}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-md-6 col-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="leaveStartDate" className='form-label'>Start Date</label>
                                                    <input id='leaveStartDate' type="date" className='form-control' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='col-md-6 col-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="leaveEndDate" className='form-label'>End Date</label>
                                                    <input id='leaveEndDate' type="date" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
                        </form>
                    </>
                }
            </div>
        </>
    )
}

export default RequestForm