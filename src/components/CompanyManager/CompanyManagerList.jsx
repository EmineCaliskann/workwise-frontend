import React, { useEffect, useState } from 'react'
import CompanyManagerCard from './CompanyManagerCard'
import axios from 'axios';

function CompanyManagerList() {
    const [managers, setManagers] = useState([]);
    const uri = "https://workwiseappi.azurewebsites.net/api/companymanager"

    useEffect(() => {
        Get();
    }, []);

    async function Get() {
        try {
            const response = await axios.get(uri);
            if (response.data) {
                setManagers(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className='row'>
                <h1 className='fw-normal text-center'>Company Managers</h1>
                <hr />
                {managers.map(x => <CompanyManagerCard key={x.id} manager={x} />)}
            </div>
        </>
    )
}

export default CompanyManagerList