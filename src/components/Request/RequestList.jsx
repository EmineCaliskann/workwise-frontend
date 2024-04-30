import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFileEarmarkText } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';

function RequestList() {
    const expenseUri = "https://workwiseappi.azurewebsites.net/api/expense/";
    const advanceUri = "https://workwiseappi.azurewebsites.net/api/advance/";
    const leaveUri = "https://workwiseappi.azurewebsites.net/api/leave/";
    const expenseTypes = ["Housing", "Travel", "FoodAndDrinks", "Materials", "Education", "Health", "Fuel"];
    const advanceTypes = ["Individual", "Institutional"];
    const leaveTypes = ["Annual", "Unpaid", "Excuse", "Sick", "Special", "LongTerm", "Medical", "Maternity", "Marriage", "Bereavement"];
    const currencyType = ["₺", "$", "€"];
    const [expenses, setExpenses] = useState([]);
    const [advances, setAdvances] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        Get(userId);
    }, [])

    async function Get(id) {
        try {
            const response = await axios.get(expenseUri + id);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await axios.get(advanceUri + id);
            setAdvances(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await axios.get(leaveUri + id);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleExpenseCancel = async (e, index, id) => {
        console.log(id);
        const formData = new FormData();
        formData.append("expenseId", id);
        e.preventDefault();
        try {
            const response = await axios.put(expenseUri + userId, formData);
            toast.success("Expense request cancelled");
            const updatedExpenses = [...expenses];
            updatedExpenses[index].approvalStatus = 3;
            setExpenses(updatedExpenses);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    const handleAdvanceCancel = async (e, index, id) => {
        const formData = new FormData();
        formData.append("advanceId", id);
        e.preventDefault();
        try {
            const response = await axios.put(advanceUri + userId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Advance request cancelled");
            const updatedAdvances = [...advances];
            updatedAdvances[index].approvalStatus = 3;
            setAdvances(updatedAdvances);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    const handleLeaveCancel = async (e, index, id) => {
        const formData = new FormData();
        formData.append("leaveId", id);
        e.preventDefault();
        try {
            const response = await axios.put(leaveUri + userId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Leave request cancelled");
            const updatedLeaves = [...leaves];
            updatedLeaves[index].approvalStatus = 3;
            setLeaves(updatedLeaves);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
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
                                            <th>Request Date</th>
                                            <th>Expense Type</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>File</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.map((expense, index) => (
                                            <tr key={index}>
                                                <td>{new Date(expense.requestDate).toLocaleDateString()}</td>
                                                <td>{expenseTypes[expense.expenseType]}</td>
                                                <td>{expense.amount}</td>
                                                <td>{currencyType[expense.currency]}</td>
                                                <td>
                                                    {
                                                        expense.approvalStatus == "0"
                                                            ? <span className='badge bg-warning'>Pending</span> :
                                                            expense.approvalStatus == "1" ?
                                                                <span className='badge bg-success'>Approved</span>
                                                                : expense.approvalStatus == "2" ?
                                                                    <span className='badge bg-danger'>Rejected</span>
                                                                    : <span className='badge bg-secondary'>Cancelled</span>
                                                    }
                                                </td>
                                                <td>{expense.responseDate ?? "-"}</td>
                                                <td><a href={expense.filePath ?? ""} target='_blank' style={{ fontSize: "1.5rem" }}><BsFileEarmarkText /></a></td>
                                                <td>
                                                    <form onSubmit={(e) => handleExpenseCancel(e, index, expense.id)}>
                                                        <button className='btn btn-danger' disabled={expense.approvalStatus != "0"}><FaTimes /></button>
                                                    </form>
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
                                            <th>Request Date</th>
                                            <th>Advance Type</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>Description</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advances.map((advance, index) => (
                                            <tr key={index}>
                                                <td>{new Date(advance.requestDate).toLocaleDateString()}</td>
                                                <td>{advanceTypes[advance.advanceType]}</td>
                                                <td>{advance.amount}</td>
                                                <td>{currencyType[advance.currency]}</td>
                                                <td>
                                                    {
                                                        advance.approvalStatus == "0"
                                                            ? <span className='badge bg-warning'>Pending</span> :
                                                            advance.approvalStatus == "1" ?
                                                                <span className='badge bg-success'>Approved</span>
                                                                : advance.approvalStatus == "2" ?
                                                                    <span className='badge bg-danger'>Rejected</span>
                                                                    : <span className='badge bg-secondary'>Cancelled</span>
                                                    }
                                                </td>
                                                <td>{advance.responseDate ? new Date(advance.responseDate).toLocaleDateString() : "-"}</td>
                                                <td>{advance.description}</td>
                                                <td>
                                                    <form onSubmit={(e) => handleAdvanceCancel(e, index, advance.id)}>
                                                        <button className='btn btn-danger' disabled={advance.approvalStatus != "0"}><FaTimes /></button>
                                                    </form>
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
                                            <th>Request Date</th>
                                            <th>Leave Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Number of Days</th>
                                            <th>Approval Status</th>
                                            <th>Response Date</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaves.map((leave, index) => (
                                            <tr key={index}>
                                                <td>{new Date(leave.requestDate).toLocaleDateString()}</td>
                                                <td>{leaveTypes[leave.leaveType]}</td>
                                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                                <td>{leave.days}</td>
                                                <td>
                                                    {
                                                        leave.approvalStatus == "0"
                                                            ? <span className='badge bg-warning'>Pending</span> :
                                                            leave.approvalStatus == "1" ?
                                                                <span className='badge bg-success'>Approved</span>
                                                                : leave.approvalStatus == "2" ?
                                                                    <span className='badge bg-danger'>Rejected</span>
                                                                    : <span className='badge bg-secondary'>Cancelled</span>
                                                    }</td>
                                                <td>{leave.responseDate ? new Date(leave.responseDate).toLocaleDateString() : "-"}</td>
                                                <td>
                                                    <form onSubmit={(e) => handleLeaveCancel(e, index, leave.id)}>
                                                        <button className='btn btn-danger' disabled={leave.approvalStatus != "0"}><FaTimes /></button>
                                                    </form>
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

export default RequestList