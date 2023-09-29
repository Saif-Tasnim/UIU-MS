import React from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Inbox = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: complain = [], refetch } = useQuery({
        queryKey: ['complain'],
        queryFn: async () => {
            const res = await axiosSecure.get('/complain')
            return res.data;
        }
    })

    const handleAcceptBtn = async (id) => {
        const result = await axiosSecure.patch(`/complain/${id}`)
        if(result.data.modifiedCount > 0){
            Swal.fire(
                'Viewed!',
                'Please solve the issue ASAP!',
                'success'
              )
        }
    }
    return (
        <div>
            <AdminHeader> </AdminHeader>

            <div className='card max-w-full text-center my-6 py-4 text-[#f38343]'>   Inbox
            </div>

            <div className="flex w-full overflow-x-auto">
                <table className="table-hover table p-5">
                    <thead>
                        <tr>
                            <th>  Id   </th>
                            <th>  Email   </th>
                            <th> Subject  </th>
                            <th> Action </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            complain.map(bk =>

                                <tr>

                                    <td> <p className='text-[#F06517]'> {bk.staffId} </p> </td>

                                    <td> <p className='pl-3'>{bk.from}</p> </td>

                                    <td>

                                        <div className="popover">
                                            <label className="popover-trigger my-2 btn bg-[#F06517] text-white" tabIndex="0"> {bk.subject} </label>
                                            <div className="popover-content border-4 border-orange-500 w-[600px] popover-top-center" tabIndex="0">
                                                <div className="popover-arrow"></div>
                                                <div className="p-4 text-sm"> {bk.details} </div>
                                            </div>
                                        </div>

                                    </td>
                                    
                                    <td> <button className={`${bk.status !== 'pending' ?'btn btn-outline-success' : 'btn btn-outline-warning'}`}
                                        onClick={() => handleAcceptBtn(bk._id)}
                                        
                                    > {bk.status === 'pending' ? 'Solve Problem' : "Mark Read"} </button></td>

                                </tr>
                            )
                        }


                    </tbody>
                </table>



            </div>

        </div>
    );
};

export default Inbox; <AdminHeader> </AdminHeader>