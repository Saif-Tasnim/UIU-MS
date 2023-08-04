import React from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import saif from '../../../assets/admin/teams/340562070_247737787707111_7136171336027561103_n.jpg';
import ifty from '../../../assets/admin/teams/FB_IMG_1691127187093.jpg'
import muhit from '../../../assets/admin/teams/FB_IMG_1691126694414.jpg'
import soha from '../../../assets/admin/teams/IMG-20230102-WA0013.jpg'
import arafat from '../../../assets/admin/teams/profile-pic (1)-new.png'

const Teams = () => {
    return (
        <div>
            <AdminHeader> </AdminHeader>

            <div className='card max-w-full text-center my-6 py-4 text-[#f38343]'> Team Info
            </div>

            {/* team card details */}
            <div className='flex justify-center mb-6'>
                {/* saif card design */}
                <div className='border-2 shadow-lg flex items-center rounded-lg h-[156px]'>

                    <div className='w-40 flex p-3'>
                        <img src={saif} className='w-4/5 rounded-lg' alt="" />
                    </div>

                    <div className='mr-4 text-center'>
                        <h1 className='text-[#f38343] font-bold'> Saif Tasnim Chowdhury </h1>
                        <p> Captain </p>
                        <p> Develop Frontend-Backend Sector </p>
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-2 gap-5 mb-4 mx-5'>
                {/* arafat card design */}
                <div className='border-2 shadow-lg flex items-center rounded-lg'>

                    <div className='w-36 flex p-3'>
                        <img src={arafat} className='w-4/5 rounded-lg' alt="" />
                    </div>

                    <div className='mr-4 text-center'>
                        <h1 className='text-[#f38343] font-bold'> Arafat Hossen </h1>
                        <p> Vice Captain </p>
                        <p> Develop Frontend </p>
                    </div>
                </div>

                {/* soha card design */}
                <div className='border-2 shadow-lg flex items-center rounded-lg'>

                    <div className='w-36 flex p-3'>
                        <img src={soha} className='w-4/5 rounded-lg' alt="" />
                    </div>

                    <div className='mr-4 text-center'>
                        <h1 className='text-[#f38343] font-bold'> Sirajum Monira Soha </h1>
                        <p> Code Conductor </p>
                        <p> Collaborates with frontend and UI  </p>
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-2 gap-5 mb-4 mx-5'>
                {/* Ifty card design */}
                <div className='border-2 shadow-lg flex items-center rounded-lg h-[156px]'>

                <div className='w-36 flex p-3'>
                        <img src={ifty} className='w-4/5 rounded-lg' alt="" />
                    </div>

                    <div className='mr-4 text-center'>
                        <h1 className='text-[#f38343] font-bold'> Ifetkharul Islam Ifty </h1>
                        <p> UX/UI Maestro </p>
                        <p> Develop Figma Design </p>
                    </div>
                </div>

                {/* Muhit card design */}
                <div className='border-2 shadow-lg flex items-center rounded-lg h-[156px]'>

                    <div className='w-36 flex p-3'>
                        <img src={muhit} className='w-4/5 rounded-lg' alt="" />
                    </div>

                    <div className='mr-4 text-center'>
                        <h1 className='text-[#f38343] font-bold'> Abdul Muhit Chowdhury </h1>
                        <p> Frontend Ninja </p>
                        <p> Collaborate With Project UI  </p>
                    </div>
                </div>

            </div>




        </div>
    );
};

export default Teams;