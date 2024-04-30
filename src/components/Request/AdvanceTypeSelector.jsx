import React from 'react'

function AdvanceTypeSelector({ selectedAdvanceType, setSelectedAdvanceType }) {
    const advanceTypes = ["Individual", "Institutional"]

    return (
        <div className='row'>
            {advanceTypes.map((name, index) => (
                <div className='col-md-6' key={index}>
                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="expenseType"
                            id={`expenseType${index}`}
                            value={index}
                            checked={selectedAdvanceType === index}
                            onChange={() => setSelectedAdvanceType(index)}
                        />
                        <label className="form-check-label" htmlFor={`expenseType${index}`}>
                            {name}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdvanceTypeSelector