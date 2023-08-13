import React, { useContext, useState } from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import { TbFidgetSpinner } from 'react-icons/tb';

/* 

batchId: "202"
conPass: "1234"
email: "saiftasnim2002@gmail.com"
firstName: "Saif Tasnim"
gender: "male"
lastName: "Chowdhury"
password: "1234"
phone: "01877669501"
studentId: "011201223"

*/

const AddStudent = () => {

    const [logIn, setLogIn] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const { signUp, updateUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data)
        setLogIn(true);

        const { firstName, lastName, phone, studentId, email, password, gender, batchId } = data;

        if (!email.includes("uiu.ac.bd")) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'email is not uiu domain server',
            })

            return;
        }

        if (password !== data.conPass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Confirm Password is not correct',
            })

            return;
        }

        const user = { firstName, lastName, phone, studentId, email, password, gender, batchId, role: "student" };

        const fullName = firstName + " " + lastName;
        // console.log(user);
        // console.log(fullName , email , password , phone , studentId , gender ,batchId );

        signUp(email, password)
            .then(resUp => {
                updateUser(fullName)
                    .then(resDown => {
                        axiosSecure.post('/studentData', user)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire(
                                        'Good job!',
                                        'Successfully User Added to System ! ',
                                        'success'
                                    )
                                }

                                else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'This user id already exist'
                                    })
                                }

                                setLogIn(false);
                                reset();
                            }
                        )
                            .catch(err => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: err.message,

                                })
                            })
                        setLogIn(false);
                        reset();
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.message,

                        })
                    })
                setLogIn(false);
                reset();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,

                })
                setLogIn(false);
                reset();
            })



    }

    return (
        <div>
            <AdminHeader></AdminHeader>

            <div className='card max-w-full text-center my-6 py-4 text-[#f38343]'> Register A New Student
            </div>

            {/* student form */}
            <section className="bg-gray-2 shadow-lg border-2 w-[90%] mx-auto rounded-xl p-6 border-[#f38343]">
                <h1 className='text-center pb-3 font-bold'>Assign a new student</h1>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full">
                        <div>
                            <label className="sr-only" htmlFor="name">First Name </label>
                            <input className="input input-solid max-w-full" placeholder="First Name" type="text"  {...register("firstName", { required: true })} />
                            {errors.firstName?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> First Name Required</p>
                            )}
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="name">Last Name </label>
                            <input className="input input-solid max-w-full" placeholder="Last Name" type="text" id="lname" {...register('lastName', { required: true })} />
                            {errors.lastName?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Last Name Required</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full">
                        <div>
                            <label className="sr-only" htmlFor="email"> Email </label>
                            <input className="input input-solid max-w-full" placeholder="Email address" type="email" id="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Email Required</p>
                            )}
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="phone">Phone</label>
                            <input className="input input-solid max-w-full" placeholder="Phone Number" type="tel" id="phone"
                                {...register("phone", { required: true })}
                            />
                            {errors.phone?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Phone Required</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 w-full">
                        <div>
                            <label className="sr-only" htmlFor="email"> ID </label>
                            <input className="input input-solid max-w-full" placeholder="Assign A Unique Id" type="text" id="stuId"
                                {...register("studentId", { required: true })}
                            />
                            {errors.studentId?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Student Id Required</p>
                            )}
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full">

                        <div className="form-control relative w-full">
                            <input type="password" className="input input-solid max-w-full" placeholder="Enter password"
                                {...register('password', { required: true })}
                            />
                            {errors.password?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Password Required</p>
                            )}

                            <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-content3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </div>

                        <div className="form-control relative w-full">
                            <input type="password" className="input input-solid max-w-full" placeholder="Confirm password"
                                {...register("conPass", { required: true })}
                            />
                            {errors.conPass?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Password Required</p>
                            )}
                            <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-content3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>

                        </div>

                    </div>


                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full">
                        <div>
                            <label className="sr-only" htmlFor="email"> Batch Id </label>
                            <input className="input input-solid max-w-full" placeholder="Assign Batch Id" type="text" id="batch"
                                {...register("batchId", { required: true })}
                            />
                            {errors.batchId?.type === "required" && (
                                <p role='alert' className='text-red-400 ml-4'> Batch Id Required</p>
                            )}
                        </div>

                        <div className='flex gap-5 items-center mx-4 mt-2'>
                            <label className="" htmlFor="phone"> Gender : </label>

                            <div className='flex gap-3 items-center'>
                                <input type="radio" class="radio radio-bordered-primary" value="male" {...register('gender', { required: true })} /> <span> Male </span>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <input type="radio" class="radio radio-bordered-secondary" value="female" {...register('gender', { required: true })} /> Female
                            </div>

                            {errors.gender && (
                                <p role="alert" className="text-red-400">Gender is required</p>
                            )}

                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="rounded-lg btn bg-[#F06517] 
                        text-white btn-block"> {logIn ? <TbFidgetSpinner className='text-3xl animate-spin text-white' /> : "Add Student"} </button>
                    </div>
                </form>

            </section>

        </div>


    );
};

export default AddStudent;