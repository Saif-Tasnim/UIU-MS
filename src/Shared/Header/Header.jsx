import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="navbar bg-[#F06517] fixed pb-3 z-10">
            <div className="navbar-start font-extrabold text-xl">
                <Link className="navbar-item">United International University </Link>
            </div>
            <div className="navbar-center">
                <Link className="navbar-item text-white">Home </Link>
                <Link className="navbar-item text-white">About</Link>
                <Link className="navbar-item text-white">Academics</Link>
                <Link className="navbar-item text-white">Research</Link>
                <Link className="navbar-item text-white"> Contacts </Link>
            </div>
            <div className="navbar-end">
                <Link className="navbar-item">
                <button className="btn btn-outline-warning text-white">Log In</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;