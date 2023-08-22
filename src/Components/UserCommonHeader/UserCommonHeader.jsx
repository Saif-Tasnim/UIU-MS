import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import img from '../../assets/admin/manageUser/h5gnz1ji36o61.webp'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCheckStudent from '../../hooks/useCheckStudent';
import useFacultyCheck from '../../hooks/useFacultyCheck';
import useCheckStaff from '../../hooks/useCheckStaff';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const UserCommonHeader = () => {
    const { user, logOut } = useContext(AuthContext);
    const [student] = useCheckStudent();
    const [faculty , , refetch] = useFacultyCheck();
    const [staff] = useCheckStaff();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [axiosSecure] = useAxiosSecure();

    const navigate = useNavigate();


    const handleOptionClick = async (sch) => {
        const data = { status: sch };
        const res = await axiosSecure.patch(`/updateAvailable/${faculty?.email}`, data)
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                'Updated!',
                `Your current status : ${sch} is updated`,
                'success'
            )
            refetch();
        }
    }



    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    'Good job!',
                    `Successfully ${user.displayName} Signed Out !`,
                    'success'
                )
                navigate('/');
            })
    }

    return (
        <div>
            <div className='card flex flex-row max-w-full py-3 pr-14 pl-8 items-center'>
                <div className='navbar-start flex-col'>
                    <h2 className='text-[#F06517]'> United International University </h2>
                    <h3 className='pl-3'> Quest For Excellence </h3>
                </div>

                <h4 className='text-[#F06517] font-bold pl-40 navbar-center'>

                    {student && "Student Site"}

                    {faculty && "Faculty Site"}

                    {staff && "Staff Site"}

                </h4>


                <div className="navbar-end">
                    <div className="avatar avatar-ring avatar-md tooltip tooltip-bottom" data-tooltip={user?.displayName}>
                        <div className="dropdown-container">
                            <div className="dropdown relative">
                                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                                    <img src={user?.photoURL || img} alt="avatar" />
                                </label>
                                <div className="dropdown-menu dropdown-menu-bottom-left">
                                    {
                                        faculty && <>
                                            <p className='dropdown-item text-sm flex  flex-row gap-2'>Current Status : <span className={`${faculty.status === "Free Now" ? 'text-green-600 font-bold' : faculty.status === "Busy Now" ? 'text-amber-600 font-bold' : faculty.status === "In Leave" ? 'text-red-600 font-bold' : ""}`}>
                                                {
                                                    faculty.status ? faculty.status : "Free Now"
                                                }
                                            </span> </p>
                                        </>
                                    }

                                    <Link className="dropdown-item text-sm"> Dashboard </Link>
                                    
                                    <Link tabIndex="-1" className="dropdown-item text-sm"> Profile </Link>

                                    {
                                        faculty &&
                                        <>
                                            <div className="dropdown-item text-sm"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            > Update Availability </div>


                                            {isDropdownOpen && (
                                                <div className="dropdown-options absolute -left-28 top-32 bg-white p-5 rounded-md">
                                                    <div className="dropdown-item text-sm" onClick={() => handleOptionClick('Free Now')}>
                                                        Free Now
                                                    </div>
                                                    <div className="dropdown-item text-sm" onClick={() => handleOptionClick('Busy Now')}>
                                                        Busy Now
                                                    </div>
                                                    <div className="dropdown-item text-sm" onClick={() => handleOptionClick('In Leave')}>
                                                        In Leave
                                                    </div>
                                                </div>
                                            )}
                                        </>



                                    }

                                    <div tabIndex="-1" className="dropdown-item text-sm" onClick={handleLogOut}> LogOut </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default UserCommonHeader;