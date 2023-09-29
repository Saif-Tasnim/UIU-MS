import React, { useContext, useState } from 'react';
import './Login.css';
import { BsCheckCircle } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';

const LogIn = () => {
    const {user} = useContext(AuthContext);
    
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [logIn, setLogIn] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        // console.log(data);
        setLogIn(true);

        const { email, password } = data;
        signIn(email, password)
            .then(res => {
                const data = res.user;
                if(email === 'admin@gmail.com'){
                    data.displayName = "Admin"
                }
                // console.log(data);
                // Swal.fire(
                //     'Good job!',
                //     `Successfully ${data.displayName} Logged In !`,
                //     'success'
                // )
                setLogIn(false);
                if (email === 'admin@gmail.com') {
                   
                    navigate('/dashboard/dashsite');
                }

                else{
                   navigate('/user-dash/dashboard');
                }

            })
            .catch(err => {
                // console.log(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
                setLogIn(false);
            })



    };

    return (
        <div className='custom-login-bg h-screen bg-blend-overlay'>

            <div className='flex justify-center items-center h-screen'>
                {/* left part card */}

                <div className="card bg-[#F06517] text-white rounded-none rounded-l-xl py-1">
                    <div className="card-body">
                        <h2 className="card-header text-3xl font-bold mt-3">UIU Management System Access Page</h2>
                        <div className="divider"></div>
                        <p className="flex text-white text-sm items-center gap-2 mt-3"> <BsCheckCircle></BsCheckCircle> Cookies must be enabled in your browser  </p>
                        <p className='flex text-white text-sm items-center gap-2'> <BiUserCircle></BiUserCircle> Some courses may allow guest access</p>
                        <div className="card-footer mt-5 mb-2">
                            <button className="btn"> Log in as a Guest</button>
                        </div>
                    </div>
                </div>


                {/* right side card */}

                <div className="card border-2 bg-white rounded-none rounded-r-xl p-5">
                    <div className={`flex flex-col items-center`}>
                        <h1 className="text-xl mb-5 font-semibold ">Already Have An Account ? </h1>

                    </div>
                    {/* onSubmit={handleSubmit(onSubmit)} */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="form-field">
                                <input placeholder="Enter username or email" type="email" className="input max-w-full p-5" {...register("email", { required: true })} />

                                {errors.email?.type === 'required' ?
                                    <label className="form-label">
                                        <span className="form-label-alt mb-2  text-red-600 ml-3">Please enter a valid email.</span>

                                    </label>
                                    :
                                    <label className="form-label">
                                        <span className="form-label-alt mb-2 text-white ml-3"> jhjshdjs </span>

                                    </label>
                                }

                            </div>


                            <div className="form-field">
                                <div className="form-control flex-col">
                                    <input placeholder="Enter password" type="password" className="input max-w-full p-5" {...register("password")} />

                                    {errors.user?.type === 'required' ?
                                        <label className="form-label">
                                            <span className="form-label-alt mb-4 text-red-600 ml-3">Please enter a valid password. </span>

                                        </label>
                                        :
                                        <label className="form-label">
                                            <span className="form-label-alt pt-2 mb-2 text-white ml-3"> jhjshdjs </span>

                                        </label>
                                    }

                                </div>

                            </div>


                            <div className="form-field">
                                <div className="form-control justify-between">
                                    <div className="flex gap-2">
                                        <input type="checkbox" className="checkbox" />
                                        <a href="#">Remember me</a>
                                    </div>
                                    <label className="form-label">
                                        <a className="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                                    </label>
                                </div>
                            </div>
                            <div className="form-field pt-5">
                                <div className="form-control justify-between">
                                    <button type='submit' className="btn bg-[#F06517] text-white w-full">

                                        {logIn ? <TbFidgetSpinner className='text-3xl animate-spin text-white' /> : "Log In"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LogIn;