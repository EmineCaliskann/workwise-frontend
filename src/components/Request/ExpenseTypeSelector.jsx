import React from 'react';

const ExpenseTypeSelector = ({ selectedExpenseType, setSelectedExpenseType }) => {
  const expenseTypes = ["Housing", "Travel", "FoodAndDrinks", "Materials", "Education", "Health", "Fuel"]

  return (
    <div className='row'>
      {expenseTypes.map((name, index) => (
        <div className='col-md-6 col-lg-4 col-xl-3' key={index}>
          <div className="form-check mb-2" >
            <input
              className="form-check-input"
              type="radio"
              name="expenseType"
              id={`expenseType${index}`}
              value={index}
              checked={selectedExpenseType === index}
              onChange={() => setSelectedExpenseType(index)}
            />
            <label className="form-check-label" htmlFor={`expenseType${index}`}>
              {name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTypeSelector;