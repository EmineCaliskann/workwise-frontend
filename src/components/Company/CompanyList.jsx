import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import axios from "axios";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const uri = "https://workwiseappi.azurewebsites.net/api/company"

    useEffect(() => {
        Get();
    }, []);

    async function Get() {
        try {
            const response = await axios.get(uri);
            if (response.data) {
                setCompanies(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="row">
                <h1 className='fw-normal text-center'>Company List</h1>
                <hr />
                {companies.map(x => <CompanyCard key={x.id} company={x} />)}
            </div>
        </>
    );
}

export default CompanyList;