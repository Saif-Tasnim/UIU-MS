import React, { useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import complainImg from '../../../assets/Common/complain.gif';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import useCheckStaff from '../../../hooks/useCheckStaff';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Complain = () => {
    const [staff] = useCheckStaff();
    const [axiosSecure] = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);

        const res = await axiosSecure.post('/complain' , data)
        if(res.data.insertedId){
            Swal.fire(
                'Sent!',
                'Your Complain is sent to Admin!',
                'success'
              )

              reset();

        }
    }

    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>


            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={complainImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Issue </h1>
            </div>

            <section className="bg-gray-2 shadow-lg border-2 w-[90%] mx-auto rounded-xl p-6 border-[#f38343]">
                <h1 className='text-center pb-3 font-bold mb-12'> Send Issue Here </h1>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex gap-7 items-center'>
                        <label className="" htmlFor="name"> From  </label>
                        <input className="input input-solid max-w-full" placeholder="First Name" type=""email  {...register("from", { required: true })}
                            defaultValue={staff.email}
                            readOnly
                        />

                    </div>

                    <div className='flex gap-7 items-center'>
                        <label className="" htmlFor="name"> Id </label>
                        <input className="input input-solid max-w-full" placeholder="" type="text" id="lname" {...register('staffId', { required: true })} 
                        defaultValue={staff.staffId}
                        readOnly
                        />
                       
                    </div>


                    <div className="mt-10">
                        <div className='flex flex-col'>
                            <label className="my-6 text-center font-bold" htmlFor="email"> Subject </label>
                            <input className="input input-solid max-w-full" placeholder="Subject" id="email"
                                {...register("subject", { required: true })}
                            />
                            {errors.subject?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Email Required</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className='flex flex-col'>
                            <label className="my-6 text-center font-bold" htmlFor="email"> Details  </label>
                            <textarea className="textarea-ghost-success textarea max-w-full h-[200px]" placeholder="Elaborate Your Problem"
                                {...register("details", { required: true })}
                                
                            />
                            {errors.details?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Email Required</p>
                            )}
                        </div>
                    </div>

                  

                    <div className="pt-2">
                        <button type="submit" className="rounded-lg btn bg-[#F06517] 
                        text-white btn-block"> Send To Admin </button>
                    </div>
                </form>

            </section>
        </div>
    );
};

export default Complain;