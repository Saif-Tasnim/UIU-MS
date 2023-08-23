import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import busImg from '../../../assets/Common/bus-3.gif'

const ShuttleUpdate = () => {
    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={busImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Shuttle Update </h1>
            </div>

            <div className="flex w-full overflow-x-auto my-8 mx-8">
                <table className="table-zebra table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Bus No </th>
                            <th> Route </th>
                            <th> Current Status </th>
                            <th> Next Schedule </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td> BUS-01 </td>
                            <td> UIU - Mohammedpur </td>
                            <td> <p className='text-red-500 font-bold'>Ignition Off</p> </td>
                            <td> 5:30 pm </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ShuttleUpdate;