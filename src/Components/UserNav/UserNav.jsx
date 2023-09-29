import React, { useContext } from 'react';
import useCheckStudent from '../../hooks/useCheckStudent';
import { AiFillDashboard } from 'react-icons/ai';
import { MdEventAvailable } from 'react-icons/md';
import { TbCloudShare } from 'react-icons/tb';
import { IoLibraryOutline } from 'react-icons/io5';
import { FaBusSimple, FaBlog } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import counselling from '../../assets/userNav/discussion.png';
import { AuthContext } from '../../Providers/AuthProvider';
import useFacultyCheck from '../../hooks/useFacultyCheck';
import useCheckStaff from '../../hooks/useCheckStaff';
import Footer from '../../Shared/Footer/Footer';
import { Link, Outlet, useLocation } from 'react-router-dom';

const UserNav = () => {

    const { user, loading } = useContext(AuthContext)
    // console.log(user)
    const location = useLocation();

    // console.log(location)


    const [student, isLoading] = useCheckStudent();
    const [faculty, facultyLoading] = useFacultyCheck();
    const [staff, staffLoading] = useCheckStaff();

    const studentNav =
        <>
            <Link to='/user-dash/dashboard' className={`${location.pathname.includes('/dashboard') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item items-center">
                    <AiFillDashboard className='text-xl'></AiFillDashboard>
                    <span className='pl-2'> Dashboard </span>
                </li>
            </Link>

            {/* student counselling */}
            <Link to="/user-dash/studentCounsellingPage" className={`${location.pathname.includes('/studentCounsellingPage') ? 'menu-item menu-active' : ''}`}> 
                <li className="menu-item">
                    <img src={counselling} className='w-6' alt="" />
                    <span className='pl-2'> Counselling </span>
                </li>
            </Link>

            {/* faculty availability */}
            <Link to='/user-dash/showAvailableFaculty' className={`${location.pathname.includes('/showAvailableFaculty') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <MdEventAvailable className='text-xl'></MdEventAvailable>
                    <span className='pl-2'> Faculty Availability </span>
                </li>
            </Link>

            {/* blogs share link */}
            <Link to='/user-dash/blogNoteShare' className={`${location.pathname.includes('/blogNoteShare') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <TbCloudShare className='text-xl'></TbCloudShare>
                    <span className='pl-2'> Blog & Note Share </span>
                </li>
            </Link>

            {/* e-library link */}

            {/* <Link>
                <li className="menu-item">
                    <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                    <span className='pl-2'> E-Library </span>
                </li>
            </Link> */}

            {/* shuttle update link */}
            <Link to='/user-dash/shuttleSchedule' className={`${location.pathname.includes('/shuttleSchedule') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <FaBusSimple className='text-xl'></FaBusSimple>
                    <span className='pl-2'> Shuttle Schedule </span>
                </li>
            </Link>


        </>

    const facultyNav =
        <>
            <Link to='/user-dash/dashboard' className={`${location.pathname.includes('/dashboard') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item items-center">
                    <AiFillDashboard className='text-xl'></AiFillDashboard>
                    <span className='pl-2'> Dashboard </span>
                </li>
            </Link>

            {/* counselling link */}
            <Link to='/user-dash/facultyCounselling' className={`${location.pathname.includes('/facultyCounselling') ? 'menu-item menu-active' : ''}`}>

                <li className="menu-item">
                    <img src={counselling} className='w-6' alt="" />
                    <span className='pl-2'> Counselling </span>
                </li>
            </Link>

            <Link>

            </Link>


            {/* counselling update */}
            <Link to='/user-dash/counsellingUpdate' className={`${location.pathname.includes('/counsellingUpdate') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <TbCloudShare className='text-xl'></TbCloudShare>
                    <span className='pl-2'> Counselling Schedule </span>
                </li>
            </Link>

            {/* material request update */}
            <Link to='/user-dash/materialRequest' className={`${location.pathname.includes('/materialRequest') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                    <span className='pl-2'> Material Request </span>
                </li>
            </Link>

            {/* shuttle update */}
            <Link to='/user-dash/shuttleUpdate' className={`${location.pathname.includes('/shuttleUpdate') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <FaBusSimple className='text-xl'></FaBusSimple>
                    <span className='pl-2'>  Shuttle Schedule </span>
                </li>
            </Link>
           
            <Link to='/user-dash/shareBlog' className={`${location.pathname.includes('/shareBlog') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <FaBlog className='text-xl'></FaBlog>
                    <span className='pl-2'> Share Blog </span>
                </li>
            </Link>
        
        </>

    const staffNav =
        <>
            <Link to='/user-dash/dashboard' className={`${location.pathname.includes('/dashboard') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item items-center">
                    <AiFillDashboard className='text-xl'></AiFillDashboard>
                    <span className='pl-2'> Dashboard </span>
                </li>
            </Link>

            {/* <li className="menu-item">
                <img src={counselling} className='w-6' alt="" />
                <span className='pl-2'> Counselling </span>
            </li> */}


            <Link to='/user-dash/updateShuttle' className={`${location.pathname.includes('/updateShuttle') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <MdEventAvailable className='text-xl'></MdEventAvailable>
                    <span className='pl-2'> Update Shuttle </span>
                </li>
            </Link>


            <Link to='/user-dash/materialPending' className={`${location.pathname.includes('/materialPending') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                    <span className='pl-2'> Material Pending </span>
                </li>
            </Link>

            <Link to='/user-dash/complainStaff' className={`${location.pathname.includes('/complainStaff') ? 'menu-item menu-active' : ''}`}>
                <li className="menu-item">
                    <GrCompliance className='text-xl'></GrCompliance>
                    <span className='pl-2'> Issue </span>
                </li>
            </Link>
        </>



    if (loading || isLoading || facultyLoading || staffLoading) {
        return <div className="skeleton h-24"></div>
    }


    return (

        <div>

            <div className='flex max-h-screen'>

                <aside className="sidebar justify-start bg-[#F06517] max-h-screen">
                    <section className="sidebar-title items-center p-8">

                        <div className="flex flex-col mt-8">

                            <span className='text-center text-2xl'> UIU Management System </span>
                            <span className="text-xs font-normal text-white mt-3"> University Operations for Excellence </span>
                        </div>
                    </section>

                    <hr className='my-5' />

                    <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
                        <nav className="menu rounded-md">

                            <section className="menu-section px-4">

                                <ul className="menu-items">

                                    {
                                        student && studentNav
                                    }

                                    {
                                        faculty && facultyNav
                                    }

                                    {
                                        staff && staffNav
                                    }

                                </ul>
                            </section>
                        </nav>
                    </section>

                </aside>

                {/* main content */}
                <div className='w-full overflow-y-scroll overflow-x-hidden'>
                    <Outlet></Outlet>
                </div>

            </div>

            <Footer></Footer>

        </div>

    );
};

export default UserNav;