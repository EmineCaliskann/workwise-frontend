import React, { useEffect, useState } from 'react'
import EmployeeCard from './EmployeeCard';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const uri = "https://workwiseappi.azurewebsites.net/api/employee"

    useEffect(() => {
        Get();
    }, []);

    async function Get() {
        try {
            const response = await axios.get(uri);
            if (response.data) {
                setEmployees(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='row'>
            <h1 className='fw-normal text-center'>Company Employees</h1>
            <hr />
            {employees.map(x => <EmployeeCard key={x.id} employee={x} />)}
        </div>
    )
}

export default EmployeeList