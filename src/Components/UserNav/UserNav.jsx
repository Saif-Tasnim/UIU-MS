import React, { useContext } from 'react';
import useCheckStudent from '../../hooks/useCheckStudent';
import { AiFillDashboard } from 'react-icons/ai';
import { MdEventAvailable } from 'react-icons/md';
import { TbCloudShare } from 'react-icons/tb';
import { IoLibraryOutline } from 'react-icons/io5';
import { FaBusSimple } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import counselling from '../../assets/userNav/discussion.png';
import { AuthContext } from '../../Providers/AuthProvider';
import useFacultyCheck from '../../hooks/useFacultyCheck';
import useCheckStaff from '../../hooks/useCheckStaff';
import Footer from '../../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const UserNav = () => {

    const { user, loading } = useContext(AuthContext)
    console.log(user)

    const [studentUser, isLoading] = useCheckStudent();
    const [faculty, facultyLoading] = useFacultyCheck();
    const [staff, staffLoading] = useCheckStaff();


    const studentNav =
        <>
            <li className="menu-item items-center">
                <AiFillDashboard className='text-xl'></AiFillDashboard>
                <span className='pl-2'> Dashboard </span>
            </li>

            <li className="menu-item">
                <img src={counselling} className='w-6' alt="" />
                <span className='pl-2'> Counselling </span>
            </li>

            <li className="menu-item">
                <MdEventAvailable className='text-xl'></MdEventAvailable>
                <span className='pl-2'> Faculty Availability </span>
            </li>

            <li className="menu-item">
                <TbCloudShare className='text-xl'></TbCloudShare>
                <span className='pl-2'> Blog & Note Share </span>
            </li>

            <li className="menu-item">
                <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                <span className='pl-2'> E-Library </span>
            </li>

            <li className="menu-item">
                <FaBusSimple className='text-xl'></FaBusSimple>
                <span className='pl-2'> Shuttle Update </span>
            </li>


        </>

    const facultyNav =
        <>
            <li className="menu-item items-center">
                <AiFillDashboard className='text-xl'></AiFillDashboard>
                <span className='pl-2'> Dashboard </span>
            </li>

            <li className="menu-item">
                <img src={counselling} className='w-6' alt="" />
                <span className='pl-2'> Counselling </span>
            </li>

            <li className="menu-item">
                <MdEventAvailable className='text-xl'></MdEventAvailable>
                <span className='pl-2'> Update Availability </span>
            </li>

            <li className="menu-item">
                <FaBusSimple className='text-xl'></FaBusSimple>
                <span className='pl-2'> Course Update </span>
            </li>

            <li className="menu-item">
                <TbCloudShare className='text-xl'></TbCloudShare>
                <span className='pl-2'> Shuttle Update </span>
            </li>

            <li className="menu-item">
                <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                <span className='pl-2'> Material Request </span>
            </li>

        </>

    const staffNav =
        <>
            <li className="menu-item items-center">
                <AiFillDashboard className='text-xl'></AiFillDashboard>
                <span className='pl-2'> Dashboard </span>
            </li>

            <li className="menu-item">
                <img src={counselling} className='w-6' alt="" />
                <span className='pl-2'> Counselling </span>
            </li>

            <li className="menu-item">
                <MdEventAvailable className='text-xl'></MdEventAvailable>
                <span className='pl-2'> Update Shuttle </span>
            </li>

            <li className="menu-item">
                <IoLibraryOutline className='text-xl'></IoLibraryOutline>
                <span className='pl-2'> Material Pending </span>
            </li>

            <li className="menu-item">
                <GrCompliance className='text-xl'></GrCompliance>
                <span className='pl-2'> Complain </span>
            </li>
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

                            <span className='text-center'> UIU Management System </span>
                            <span className="text-xs font-normal text-white mt-3"> University Operations for Excellence </span>
                        </div>
                    </section>

                    <hr className='my-5' />

                    <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
                        <nav className="menu rounded-md">

                            <section className="menu-section px-4">

                                <ul className="menu-items">

                                    {
                                        studentUser && studentNav
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
                <div className='w-full overflow-y-scroll'>
                    <Outlet></Outlet>
                </div>

            </div>

            <Footer></Footer>

        </div>

    );
};

export default UserNav;