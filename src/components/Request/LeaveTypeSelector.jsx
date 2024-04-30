import React from 'react'

function LeaveTypeSelector({ selectedLeaveType, setSelectedLeaveType }) {
    const leaveTypes = ["Annual", "Unpaid", "Excuse", "Sick", "Special", "LongTerm", "Medical", "Maternity", "Marriage", "Bereavement"];

    return (
        <div className='row'>
            {leaveTypes.map((name, index) => (
                <div className='col-md-6 col-lg-4 col-xl-3' key={index}>
                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="expenseType"
                            id={`expenseType${index}`}
                            value={index}
                            checked={selectedLeaveType === index}
                            onChange={() => setSelectedLeaveType(index)}
                        />
                        <label className="form-check-label" htmlFor={`expenseType${index}`}>
                            {name}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LeaveTypeSelector