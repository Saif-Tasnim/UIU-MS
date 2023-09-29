import React from 'react';
import useCheckStaff from '../../hooks/useCheckStaff';

const StaffDashboard = () => {
    const [staff] = useCheckStaff()

    return (
        <div>
            <div className="card max-w-full mt-6 px-6">
                <div className="card-body flex-row justify-between">
                    <h2 className="card-header">
                        {staff.staffId} {staff?.firstName} {staff?.lastName}
                    </h2>

                    <h1> {staff.email} </h1>

                    <h1 className='text-xl text-[#F06517]'> {staff.designation} </h1>


                </div>

            </div>

        </div >
    );
};

export default StaffDashboard;