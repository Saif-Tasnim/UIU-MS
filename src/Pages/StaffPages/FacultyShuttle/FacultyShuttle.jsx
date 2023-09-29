import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const FacultyShuttle = () => {
    const [axiosSecure] = useAxiosSecure();
    const [modalData, setModalData] = useState({});


    const { data: bus = [], refetch, isLoading } = useQuery({
        queryKey: ['bus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/facultyBus')
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="skeleton h-24"></div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const status = form.status.value;
        const time = form.schedule.value;
        let nextSchedule = "";

        if (time) {
            nextSchedule = new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        }

        // console.log(status, nextSchedule);

        // console.log(modalData);
        const update = { currentStatus: status, nextSchedule };

        const res = await axiosSecure.patch(`facultyBus/${modalData._id}`, update)
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                'Updated!',
                'The Schedule Updated',
                'success'
            )

            refetch();
        }

    }

  

    return (
        <div className='my-10'>
            <h1 className='my-7 text-center text-xl'> Faculty Shuttle List </h1>

            <div className="flex w-full overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Bus No </th>
                            <th> Route </th>
                            <th> Current Status </th>
                            <th> Next Schedule </th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {bus.map((b, index) =>
                            <tr>
                                <th> {index + 1} </th>
                                <td> {b.busNo} </td>
                                <td> {b.route} </td>
                                <td>
                                    <p className={`${b.currentStatus === "Ignition Off" ? 'text-red-500 font-bold' : b.currentStatus === "Running" ? 'text-amber-500 font-bold' : 'text-green-500 font-bold'}`}>
                                        {b.currentStatus} </p> </td>
                                <td> {b.nextSchedule ? b.nextSchedule : "-------"} </td>
                                <td>
                                    <label class="btn btn-solid-error" htmlFor="modal-1"
                                        onClick={() => setModalData(b)}
                                    > Update </label> </td>
                            </tr>
                        )}


                        {/* modal info */}
                        <input className="modal-state" id="modal-1" type="checkbox" />
                        <div className="modal">
                            <label className="modal-overlay"></label>
                            <div className="modal-content max-w-2xl w-full flex flex-col gap-5 -translate-y-full duration-700 ease-in-out">

                                <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                <h2 className="text-xl text-center text-[#F06517] "> Update Schedule </h2>

                                <form action="" onSubmit={handleSubmit}>
                                    <div className='flex gap-7 my-8'>
                                        <div>
                                            <label htmlFor="" className='ml-3 mb-3'> Route </label>
                                            <input className="input input-secondary" defaultValue={modalData?.route}
                                                readOnly />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='ml-3 mb-3'>
                                                Bus No </label>
                                            <input className="input input-secondary" defaultValue={modalData?.busNo}
                                                readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-10 items-center'>
                                            <label htmlFor=""> Current Status </label>
                                            <select name="status" id="" className='select'>
                                                <option value="Running"> Running </option>
                                                <option value="Ignition Off"> Ignition Off </option>
                                                <option value="Ready to Go"> Ready to Go </option>
                                            </select>
                                        </div>

                                        <div className='flex gap-10 items-center'>
                                            <label htmlFor=""> Next Schedule  </label>
                                            <input type='time' className="input my-8" placeholder="Next Schedule!" name='schedule' />
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button type='submit' className="btn bg-[#F06517] btn-block">Update</button>

                                    </div>

                                </form>


                            </div>
                        </div>

                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default FacultyShuttle;


