import React, { useEffect, useState } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'
import EmployeeAvatar from './EmployeeAvatar'
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function RequestManage() {
    const expenseUri = "https://workwiseappi.azurewebsites.net/api/expense/";
    const advanceUri = "https://workwiseappi.azurewebsites.net/api/advance/";
    const leaveUri = "https://workwiseappi.azurewebsites.net/api/leave/";
    const leaveTypes = ["Annual", "Unpaid", "Excuse", "Sick", "Special", "LongTerm", "Medical", "Maternity", "Marriage", "Bereavement"];
    const expenseTypes = ["Housing", "Travel", "FoodAndDrinks", "Materials", "Education", "Health", "Fuel"];
    const advanceTypes = ["Individual", "Institutional"];
    const currencyType = ["₺", "$", "€"];
    const [expenseRequests, setExpenseRequests] = useState([]);
    const [advanceRequests, setAdvanceRequests] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const companyManagerId = localStorage.getItem("userId");

    useEffect(() => {
        Get(companyManagerId);
    }, [])

    async function Get(id) {
        try {
            const response = await axios.get(expenseUri + "companies/" + id);
            console.log(response);
            console.log(response.data);
            setExpenseRequests(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await axios.get(advanceUri + "companies/" + id);
            console.log(response);
            console.log(response.data);
            setAdvanceRequests(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await axios.get(leaveUri + "leaves/" + id);
            console.log(response.data);
            setLeaveRequests(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleExpenseResponse = async (e, index, id, status) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("newStatus", status);
        try {
            const response = axios.put(expenseUri + "expenses/" + id, formData);
            toast.success("Expense request updated succesfully");
            const updatedExpenseRequests = [...expenseRequests];
            updatedExpenseRequests[index].expense.approvalStatus = status;
            updatedExpenseRequests[index].expense.approvalDate = new Date();
            updatedExpenseRequests.sort((a, b) => {
                if (a.expense.approvalStatus < b.expense.approvalStatus) return -1;
                if (a.expense.approvalStatus > b.expense.approvalStatus) return 1;
                return 0;
            });
            setExpenseRequests(updatedExpenseRequests);
        } catch (error) {
            toast.error("Invalid Attempt");
        }
    }

    const handleAdvanceResponse = async (e, index, id, status) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("newStatus", status);
        try {
            const response = axios.put(advanceUri + "advances/" + id, formData);
            console.log(response);
            toast.success("Advance request updated succesfully");
            const updatedAdvanceRequests = [...advanceRequests];
            updatedAdvanceRequests[index].advance.approvalStatus = status;
            updatedAdvanceRequests[index].advance.approvalDate = new Date();
            updatedAdvanceRequests.sort((a, b) => {
                if (a.advance.approvalStatus < b.advance.approvalStatus) return -1;
                if (a.advance.approvalStatus > b.advance.approvalStatus) return 1;
                return 0;
            });
            setAdvanceRequests(updatedAdvanceRequests);
        } catch (error) {
            toast.error("Invalid Attempt");
        }
    }

    const handleLeaveResponse = async (e, index, id, status) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("newStatus", status);
        try {
            const response = axios.put(leaveUri + "leaves/" + id, formData);
            console.log(response);
            toast.success("Leave request updated succesfully");
            const updatedLeaveRequests = [...leaveRequests];
            updatedLeaveRequests[index].leave.approvalStatus = status;
            updatedLeaveRequests[index].leave.responseDate = new Date();
            updatedLeaveRequests.sort((a, b) => {
                if (a.leave.approvalStatus < b.leave.approvalStatus) return -1;
                if (a.leave.approvalStatus > b.leave.approvalStatus) return 1;
                return 0;
            });
            setLeaveRequests(updatedLeaveRequests);
        } catch (error) {
            toast.error("Invalid Attempt");
        }
    }

    return (
        <>
            {/* Expense Card */}
            <div className='row'>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='fw-normal text-center'>Expense Requests</h3>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Employee</th>
                                            <th>Request Date</th>
                                            <th>Expense Type</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>File</th>
                                            <th>Approval</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenseRequests.map((request, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="avatar avatar-lg me-3">
                                                        <EmployeeAvatar userId={request.appUserId} photo={request.filePath} name={request.firstName + " " + request.lastName} profession={request.profession} department={request.department} />
                                                    </div>
                                                </td>
                                                <td>{new Date(request.expense.requestDate).toLocaleDateString()}</td>
                                                <td>{expenseTypes[request.expense.expenseType]}</td>
                                                <td>{request.expense.amount}</td>
                                                <td>{currencyType[request.expense.currency]}</td>
                                                <td> {
                                                    request.expense.approvalStatus == "0"
                                                        ? <span className='badge bg-warning'>Pending</span> :
                                                        request.expense.approvalStatus == "1" ?
                                                            <span className='badge bg-success'>Approved</span>
                                                            : request.expense.approvalStatus == "2" ?
                                                                <span className='badge bg-danger'>Rejected</span>
                                                                : <span className='badge bg-secondary'>Cancelled</span>
                                                }</td>
                                                <td>{request.expense.approvalDate ? new Date(request.expense.approvalDate).toLocaleDateString() : "-"}</td>
                                                <td><a href={request.expense.filePath} style={{ fontSize: "1.5rem" }}><BsFileEarmarkText /></a></td>
                                                <td>
                                                    <div className='row'>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleExpenseResponse(e, index, request.expense.id, 1)}>
                                                                <button className="btn btn-success" disabled={request.expense.approvalStatus == "1"}><FaCheck /></button>
                                                            </form>
                                                        </div>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleExpenseResponse(e, index, request.expense.id, 2)}>
                                                                <button className='btn btn-danger' disabled={request.expense.approvalStatus == "2"}><FaTimes /></button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Advance Card */}
            <div className='row'>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='fw-normal text-center'>Advance Requests</h3>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Employee</th>
                                            <th>Request Date</th>
                                            <th>Advance Type</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>Description</th>
                                            <th>Approval</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advanceRequests.map((request, index) => (
                                            <tr>
                                                <td>
                                                    <div className="avatar avatar-lg me-3">
                                                        <EmployeeAvatar userId={request.appUserId} photo={request.filePath} name={request.firstName + " " + request.lastName} profession={request.profession} department={request.department} />
                                                    </div>
                                                </td>
                                                <td>{new Date(request.advance.requestDate).toLocaleDateString()}</td>
                                                <td>{advanceTypes[request.advance.advanceType]}</td>
                                                <td>{request.advance.amount}</td>
                                                <td>{currencyType[request.advance.currency]}</td>
                                                <td>
                                                    {
                                                        request.advance.approvalStatus == "0"
                                                            ? <span className='badge bg-warning'>Pending</span> :
                                                            request.advance.approvalStatus == "1" ?
                                                                <span className='badge bg-success'>Approved</span>
                                                                : request.advance.approvalStatus == "2" ?
                                                                    <span className='badge bg-danger'>Rejected</span>
                                                                    : <span className='badge bg-secondary'>Cancelled</span>
                                                    }
                                                </td>
                                                <td>{request.advance.approvalDate ? new Date(request.advance.approvalDate).toLocaleDateString() : "-"}</td>
                                                <td>{request.advance.description}</td>
                                                <td>
                                                    <div className='row'>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleAdvanceResponse(e, index, request.advance.id, 1)}>
                                                                <button className='btn btn-success' disabled={request.advance.approvalStatus == "1"}><FaCheck /></button>
                                                            </form>
                                                        </div>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleAdvanceResponse(e, index, request.advance.id, 2)}>
                                                                <button className='btn btn-danger' disabled={request.advance.approvalStatus == "2"}><FaTimes /></button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Leave Card */}
            <div className='row'>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='fw-normal text-center'>Leave Requests</h3>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Employee</th>
                                            <th>Request Date</th>
                                            <th>Leave Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Number of Days</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>Approval</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveRequests.map((request, index) => (
                                            <tr>
                                                <td>
                                                    <div className="avatar avatar-lg me-3">
                                                        <EmployeeAvatar userId={request.appUserId} photo={request.filePath} name={request.firstName + " " + request.lastName} profession={request.profession} department={request.department} />
                                                    </div>
                                                </td>
                                                <td>{new Date(request.leave.requestDate).toLocaleDateString()}</td>
                                                <td>{leaveTypes[request.leave.leaveType]}</td>
                                                <td>{new Date(request.leave.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(request.leave.endDate).toLocaleDateString()}</td>
                                                <td>{request.leave.days}</td>
                                                <td>
                                                    {
                                                        request.leave.approvalStatus == "0"
                                                            ? <span className='badge bg-warning'>Pending</span> :
                                                            request.leave.approvalStatus == "1" ?
                                                                <span className='badge bg-success'>Approved</span>
                                                                : request.leave.approvalStatus == "2" ?
                                                                    <span className='badge bg-danger'>Rejected</span>
                                                                    : <span className='badge bg-secondary'>Cancelled</span>
                                                    }
                                                </td>
                                                <td>{request.leave.responseDate ? new Date(request.leave.responseDate).toLocaleDateString() : "-"}</td>
                                                <td>
                                                    <div className='row'>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleLeaveResponse(e, index, request.leave.id, 1)}>
                                                                <button className='btn btn-success' disabled={request.leave.approvalStatus == "1"}><FaCheck /></button>
                                                            </form>
                                                        </div>
                                                        <div className="col-6">
                                                            <form onSubmit={(e) => handleLeaveResponse(e, index, request.leave.id, 2)}>
                                                                <button className='btn btn-danger' disabled={request.leave.approvalStatus == "2"}><FaTimes /></button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestManage