import React from 'react';
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader } from 'react-bootstrap';
import managerSample from "../../assets/static/images/logo/manager.jpg"
import { Link } from 'react-router-dom';
import { FaRegIdBadge } from 'react-icons/fa6';
import { BsDiagram3 } from 'react-icons/bs';
import { BsFillPersonFill } from "react-icons/bs";

const EmployeeAvatar = ({ userId, photo, name, profession, department }) => {
    const popover = (
        <Popover id="popover-trigger-hover-focus">
            <PopoverHeader className='p-3'>
                <div><BsFillPersonFill /><span className='ms-3'>{name}</span></div>
            </PopoverHeader>
            <PopoverBody className='mb-1 p-3'>
                <div><FaRegIdBadge /><span className='ms-3'>{profession}</span></div>
                <hr />
                <div><BsDiagram3 /><span className='ms-3'>{department}</span></div>
            </PopoverBody>
        </Popover>
    );

    return (
        <OverlayTrigger placement="top" overlay={popover}>
            <Link to={"/employee-detail/" + userId}>
                <img src={photo ?? managerSample} style={{ cursor: "pointer" }} alt="Your Image" />
            </Link>
        </OverlayTrigger>
    );
};

export default EmployeeAvatar;
