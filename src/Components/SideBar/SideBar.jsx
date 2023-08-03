import React from 'react';
import icon from '../../assets/icons/favicon.png';
import { AiFillDashboard } from 'react-icons/ai';
import { PiStudentFill } from 'react-icons/pi';
import { GrUserWorker } from 'react-icons/gr';
import { GiTeacher } from 'react-icons/gi';
import { VscFeedback } from 'react-icons/vsc';
import { MdForwardToInbox } from 'react-icons/md';
import { Link, Outlet, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation();
    return (
        <div className='flex'>
            {/* sidebar */}
            <aside className="sidebar justify-start bg-[#F06517] p-5">
                <section className="sidebar-title justify-center items-center pt-10">
                    <img src={icon} className='w-10 rounded-2xl mr-3' alt="" />
                    <div className="flex flex-col">
                        <span className='text-xl text-center'> UIU MS </span>
                        <span className="text-md font-normal text-white text-center"> Admin </span>
                    </div>
                </section>

                <div className="divider py-10 opacity-40"></div>

                <section className="flex flex-col w-full h-screen overflow-visible">
                    <nav className="menu rounded-md bg-[#F06517]">
                        <section className="menu-section px-4">
                            <ul className="menu-items">

                                <Link to='/dashboard/dashsite' className={`${location.pathname.includes('/dashsite') ? 'menu-item menu-active' : ''}`}>
                                    <li className="menu-item">
                                        <AiFillDashboard className='text-xl'></AiFillDashboard>
                                        <span className='pl-2'> Dashboard </span>
                                    </li>
                                </Link>


                                <Link to="/dashboard/addStudent" className={`${location.pathname.includes('addStudent') ? 'menu-item menu-active' : ''}`}>

                                    <li className="menu-item">
                                        <PiStudentFill className='text-xl'></PiStudentFill>
                                        <span className='pl-2'> Add Student </span>
                                    </li>
                                </Link>

                                <Link to="/dashboard/addFaculty" className={`${location.pathname.includes('addFaculty') ? 'menu-item menu-active' : ''}`}>
                                    <li className="menu-item">
                                        <GiTeacher className='text-xl'></GiTeacher>
                                        <span className='pl-2'> Add Faculty </span>
                                    </li>
                                </Link>

                                <Link to="/dashboard/addStaff" className={`${location.pathname.includes('addStaff') ? 'menu-item menu-active' : ''}`}>
                                    <li className="menu-item">
                                        <GrUserWorker className='text-xl'></GrUserWorker>
                                        <span className='pl-2'> Add Staff </span>
                                    </li>
                                </Link>


                                <Link>
                                    <li className="menu-item">
                                        <VscFeedback className='text-xl'></VscFeedback>
                                        <span className='pl-2'> Feedback </span>
                                    </li>
                                </Link>

                                <Link>
                                    <li className="menu-item">
                                        <MdForwardToInbox className='text-xl'></MdForwardToInbox>
                                        <span className='pl-2'> Inbox </span>
                                    </li>
                                </Link>



                                <Link>
                                    <li className="menu-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className='pl-2'>Teams</span>
                                    </li>
                                </Link>

                            </ul>
                        </section>
                    </nav>
                </section>

                {/* <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
                <div className="divider my-0"></div>
                <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
                    <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabindex="0">
                        <div className="flex flex-row gap-4 p-4">
                            <div className="avatar avatar-md">
                                <img src="https://i.pravatar.cc/150?img=30" alt="avatar" />
                            </div>

                            <div className="flex flex-col">
                                <span>Sandra Marx</span>
                                <span className="text-xs font-normal text-content2">sandra</span>
                            </div>
                        </div>
                    </label>
                    <div className="dropdown-menu dropdown-menu-right-top ml-2">
                        <a className="dropdown-item text-sm">Profile</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Account settings</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Change email</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Subscriptions</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Change password</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Refer a friend</a>
                        <a tabindex="-1" className="dropdown-item text-sm">Settings</a>
                    </div>
                </div>
            </section> */}
            </aside>

            {/* main content */}
            <div className='w-full'>
                <Outlet></Outlet>
            </div>

        </div>


    );
};

export default SideBar;