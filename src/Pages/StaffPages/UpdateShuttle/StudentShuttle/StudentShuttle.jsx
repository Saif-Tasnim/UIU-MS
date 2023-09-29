import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const StudentShuttle = () => {
    const [axiosSecure] = useAxiosSecure();
    const [modalData, setModalData] = useState({});

    const { data: bus = [], refetch } = useQuery({
        queryKey: ['bus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/studentShuttle')
            return res.data;
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const from = form.from.value;
        const to = form.to.value;
        const status = form.status.value;
        const time = form.schedule.value;
        const currentLocation = form.currentLocation.value;

        let nextSchedule = "";

        if (time) {
            nextSchedule = new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        }

        const update = { from, to, currentStatus:status, nextSchedule, currentLocation }

        const res = await axiosSecure.patch(`/studentShuttle/${modalData._id}`, update)
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                'Updated!',
                'The Schedule Updated',
                'success'
            )

            refetch();
        }

        else {
            Swal.fire(
                'No Change!',
                'The Schedule has not changed',
                'success'
            )
        }

    }

    return (
        <div className='my-10'>
            <h1 className='my-7 text-center text-xl'> Student Shuttle List </h1>

            <div className="flex w-full overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Shuttle No </th>
                            <th> From </th>
                            <th> To </th>
                            <th> Current Status </th>
                            <th> Next Schedule </th>
                            <th> Current Location </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bus.map((b, index) =>
                            <tr>
                                <th> {index + 1} </th>
                                <td> {b.shuttleNo} </td>
                                <td> {b.from} </td>
                                <td> {b.to} </td>
                                <td>
                                    <p className={`${b.currentStatus === "Ignition Off" ? 'text-red-500 font-bold' : b.currentStatus === "Running" ? 'text-amber-500 font-bold' : b.currentStatus === "Parking Zone" ?'text-indigo-500 font-bold' :'text-green-500 font-bold'}`}>
                                        {b.currentStatus} </p> </td>
                                <td> {b.nextSchedule ? b.nextSchedule : "-------"} </td>
                                <td> {b.currentLocation}  </td>
                                <td>
                                    <label class="btn btn-solid-error" htmlFor="modal-1"
                                        onClick={() => setModalData(b)}
                                    > Update </label> </td>

                                <input className="modal-state" id="modal-1" type="checkbox" />
                                <div className="modal">
                                    <label className="modal-overlay"></label>
                                    <div className="modal-content max-w-2xl w-full flex flex-col gap-5 -translate-y-full duration-700 ease-in-out">

                                        <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                        <h2 className="text-xl text-center text-[#F06517] "> Update Schedule </h2>

                                        <form action="" onSubmit={handleSubmit}>
                                            <div className='flex gap-7 items-center'>
                                                <label htmlFor="" className='ml-3 mb-3 mt-3'> Shuttle No </label>
                                                <input className="input input-secondary" defaultValue={modalData?.shuttleNo}
                                                    readOnly />
                                            </div>

                                            <div className='flex gap-7 my-8'>
                                                <div>
                                                    <label htmlFor="" className='ml-3 mb-3'> From </label>
                                                    <select class="select select-ghost-secondary"
                                                        name='from'
                                                    >
                                                        <option> {modalData?.from} </option>
                                                        <option> {modalData?.to} </option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="" className='ml-3 mb-3'>
                                                        To </label>
                                                    <select class="select select-ghost-secondary"
                                                        name='to'
                                                    >
                                                        <option> {modalData?.to}
                                                        </option>
                                                        <option> {modalData?.from}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex gap-10 items-center'>
                                                    <label htmlFor=""> Current Status </label>
                                                    <select name="status" id="" className='select'>
                                                        <option value="Running"> Running </option>
                                                        <option value="Ignition Off"> Ignition Off </option>
                                                        <option value="Ready to Go"> Ready to Go </option>
                                                        <option value="Parking Zone"> Parking Zone </option>
                                                    </select>
                                                </div>

                                                <div className='flex gap-10 items-center'>
                                                    <label htmlFor=""> Next Schedule  </label>
                                                    <input type='time' className="input my-8" placeholder="Next Schedule!" name='schedule' />
                                                </div>
                                            </div>
                                            <div className='mb-6 flex gap-5 items-center'>
                                                <label htmlFor=""> Current Location </label>
                                                <select class="select select-ghost-secondary" name='currentLocation'>
                                                    <option> UIU </option>
                                                    <option> Notun Bazar </option>
                                                    <option> Sayed Nagar </option>
                                                </select>
                                            </div>

                                            <div className="flex gap-3">
                                                <button type='submit' className="btn bg-[#F06517] btn-block"> Update       </button>

                                            </div>

                                        </form>


                                    </div>
                                </div>

                            </tr>

                        )

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentShuttle;