import React, { useContext } from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import student from '../../../assets/admin/stats/student.gif'
import faculty from '../../../assets/admin/stats/faculty.gif';
import staff from '../../../assets/admin/stats/staff.gif';
import { AuthContext } from '../../../Providers/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <AdminHeader></AdminHeader>
            {/* 
            <div className='card max-w-full text-center my-6 py-4 text-[#F06517]'> Dashboard
            </div> */}

            {/* stats */}
            <section className="p-3 my-6 card max-w-full">

                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
                    {/* student card */}
                    <div className="flex p-3 space-x-4 rounded-lg md:space-x-6 border-2 bg-blue-400">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4">
                            <img src={student} className='w-24 rounded-md' alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold"> 2000 </p>
                            <p className="capitalize"> Student </p>
                        </div>
                    </div>

                    {/* faculty card */}
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border-2 bg-violet-400">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <img src={faculty} className='w-24 rounded-md' alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi"> 800 </p>
                            <p className="capitalize"> Faculty </p>
                        </div>
                    </div>

                    {/* staff card */}
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border-2 bg-orange-400">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4">
                            <img src={staff} className='w-24 rounded-lg' alt="" />
                        </div>

                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold "> 600 </p>
                            <p className="capitalize"> Satff </p>
                        </div>
                    </div>

                    {/* <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-800">
                                <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">17%</p>
                            <p className="capitalize">Bounce rate</p>
                        </div>
                    </div> */}

                </div>
            </section>

        </div>
    );
};

export default Dashboard;