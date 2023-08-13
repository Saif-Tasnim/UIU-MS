import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import img from '../../assets/admin/manageUser/h5gnz1ji36o61.webp'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCheckStudent from '../../hooks/useCheckStudent';
import useFacultyCheck from '../../hooks/useFacultyCheck';
import useCheckStaff from '../../hooks/useCheckStaff';


const UserCommonHeader = () => {
    const { user, logOut } = useContext(AuthContext);
    const [student] = useCheckStudent();
    const [faculty] = useFacultyCheck();
    const [staff] = useCheckStaff();

    const navigate = useNavigate();


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
                    <h3 className='pl-3'>Quest For Excellence </h3>
                </div>

                <h4 className='text-[#F06517] font-bold pl-40 navbar-center'>

                    {student && "Student Site"}

                    {faculty && "Faculty Site"}

                    {staff && "Staff Site"}

                </h4>


                <div className="navbar-end">
                    <div className="avatar avatar-ring avatar-md tooltip tooltip-bottom" data-tooltip={user?.displayName}>
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                                    <img src={user?.photoURL || img} alt="avatar" />
                                </label>
                                <div className="dropdown-menu dropdown-menu-bottom-left">

                                    <Link className="dropdown-item text-sm"> Dashboard </Link>
                                    <Link tabIndex="-1" className="dropdown-item text-sm"> Profile </Link>
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