import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';


const BlogShare = () => {

    const [expandedStates, setExpandedStates] = useState([]);
    const [like, setLike] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/facultyBlog');
            return res.data;
        }
    });

    const handleToggleExpanded = (index) => {
        setExpandedStates((prevExpandedStates) => {
            const newExpandedStates = [...prevExpandedStates];
            newExpandedStates[index] = !newExpandedStates[index];
            return newExpandedStates;
        });

        // console.log(expandedStates);
    };


    return (

        <div>

            <UserCommonHeader>  </UserCommonHeader>
            
            <div className='my-10 flex justify-center'>

                <Link to='/user-dash/studentBlog'>
                    <button className="btn bg-[#F06517] flex gap-2 text-white">
                        <BsFillPencilFill />  <span> Write Your Blog </span> </button>
                </Link>

            </div>

            <div className='card max-w-full mt-10 mb-7 px-6 py-5 flex-row items-center justify-center gap-8'>
                <span className='text-[#F06517] text-lg'> All Blogs Here </span>
            </div>

            <section className="py-6 sm:py-12">
                <div className="container p-6 mx-auto space-y-4">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-2">

                        {
                            blogs.map((b, index) =>
                                <article key={index} className="flex flex-col bg-slate-100 rounded-xl p-3">
                                    <div className="flex flex-col p-6 ">

                                        <h3 className="flex-1 py-2 text-lg font-semibold text-center">
                                            {b.summary} </h3>

                                        <div className='flex justify-between items-center text-sm my-16'>
                                            <div className='flex flex-col gap-y-4'>
                                                <h1> Author Name : {b.firstName} {b.lastName} </h1>
                                                <p> Email :  {b.email} </p>
                                            </div>
                                            <h1 className='font-bold'> {b.date ? b.date : "August 24, 2023"}  </h1>
                                        </div>

                                        <div>

                                        </div>

                                        <div className='mt-3'>


                                            {
                                                expandedStates[index] ?
                                                    <p className={`${expandedStates[index] ? 'translate-y-8  ease-in-out duration-700 leading-8' : ''}`}>
                                                        {b.details}

                                                        <span className='text-[#F06517] hover:cursor-pointer block mt-3' onClick={() => handleToggleExpanded(index)}>  Read Less </span>
                                                    </p>
                                                    :
                                                    <p className={`translate-y-0  ease-in-out duration-700 leading-8`}> {b.details.split(' ').slice(0, 15).join(' ')} <span className='text-[#F06517] hover:cursor-pointer' onClick={() => handleToggleExpanded(index)}> ... Read More </span>  </p>
                                            }




                                            {/* <p className=''>  {b.details}

                                                <span className='text-[#F06517] ml-3 hover:cursor-pointer' onClick={() => {
                                                    handleToggleExpanded(index)
                                                }}> {index === expandedStates ? "Read Less" : "Read More"} </span>
                                            </p> */}


                                            {/* this part is for like button working */}

                                            {/* <div className="flex justify-between items-center mx-3 mt-14">

                                                {
                                                    b.like ?
                                                        <button
                                                            className="btn rounded-lg text-4xl tooltip tooltip-hover "
                                                            data-tooltip="Press Like"
                                                            disabled
                                                        >  <AiTwotoneLike className="text-blue-600"
                                                            /> </button> :
                                                        
                                                        <button
                                                            className="btn rounded-lg text-4xl tooltip tooltip-hover "
                                                            data-tooltip="Press Like"
                                                            onClick={() => handleToggleLike(b._id)}
                                                        >
                                                            <AiOutlineLike className="animate-pulse text-blue-600" />

                                                        </button>
                                                }




                                                <span className="text-[#F06517] font-semibold"> {b.like || 0} likes </span>
                                            </div> */}


                                        </div>

                                    </div>
                                </article>

                            )
                        }
                    </div>
                </div>
            </section >

        </div >
    );
};

export default BlogShare;