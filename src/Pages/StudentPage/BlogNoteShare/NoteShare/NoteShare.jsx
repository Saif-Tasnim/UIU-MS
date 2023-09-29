import React from 'react';
import UserCommonHeader from '../../../../Components/UserCommonHeader/UserCommonHeader';
import noteImg from '../../../../assets/Common/notes.gif';
import useCheckStudent from '../../../../hooks/useCheckStudent';
import { BsFillGearFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const NoteShare = () => {
    const [student] = useCheckStudent();
    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        console.log(data);

        // Get the PDF/ZIP file from the form data
        const file = data.file[0];

        console.log(file);

        // Create a new FormData object
        const formData = new FormData();

        // Add the file to the FormData object
        formData.append("file", file);

        // Other data
        formData.append("fullName", `${student.firstName} ${student.lastName}`);
        formData.append("email", student.email);
        formData.append("title", data.title);
        formData.append("course", data.course);
        formData.append("faculty", data.faculty);
        formData.append("permission", data.ok);

        console.log(formData);

        // Post the data to the API
        axiosSecure.post('/notes', formData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Uploaded!',
                        'Your Note is Upload Successfully!',
                        'success'
                    )
                }
            })

    };



    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>


            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={noteImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Add Your Notes </h1>
            </div>

            <div className='my-10 mx-6 border-2 p-5 rounded-xl'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-y-8 w-[60%]'>
                            <div className='flex gap-5 items-center'>
                                <label htmlFor=""> Author Name  : </label>
                                <input className="input input-solid ml-5" defaultValue={`${student?.firstName} ${student?.lastName}`}
                                    readOnly
                                />
                            </div>

                            <div className='flex gap-5 items-center'>
                                <label htmlFor=""> Author Id  : </label>
                                <input className="input input-solid ml-14" defaultValue={student?.studentId}
                                    readOnly
                                />
                            </div>

                        </div>

                        <div>
                            <div className="popover mr-16">
                                <label className="popover-trigger my-2 btn btn-solid-primary tooltip tooltip-hover" data-tooltip="Change Setting" tabIndex="0" >
                                    <BsFillGearFill className="animate-spin text-xl " /> </label>

                                <div className="popover-content" tabIndex="0">
                                    <div className="popover-arrow"> </div>
                                    <div className="p-4 text-sm">

                                        <p> <input type="radio" className="switch switch-ghost-success"
                                            {...register("ok")}
                                            value="all"
                                            defaultChecked
                                        /> <span className='ml-3'

                                        > View To All </span> </p>

                                        <p className='my-4'> <input type="radio" className="switch switch-ghost-success"
                                            {...register("ok")}
                                            value="me"
                                        /> <span className='ml-3'> Only Me </span> </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='my-14 flex flex-col gap-y-4'>
                        <label htmlFor="" className='text-center font-bold'> Note Title  </label>
                        <input className="input-ghost-success input block max-w-full" placeholder="Write Your Note Title Here ... " {...register("title")} />
                    </div>

                    <div className='my-14 flex flex-col gap-y-4'>
                        <label htmlFor="" className='text-center font-bold'> Course Teacher  </label>
                        <input className="input-ghost-success input block max-w-full" placeholder="Write Your Course Teacher Name Here ... " {...register("faculty")} />
                    </div>

                    <div className='my-14 flex flex-col gap-y-4'>
                        <label htmlFor="" className='text-center font-bold'> Course Name  </label>
                        <input className="input-ghost-success input block max-w-full" placeholder="Write The Course Name Here ... " {...register("course")} />
                    </div>

                    {/* <div className='my-14 flex flex-col gap-y-4'>
                        <label htmlFor="" className='text-center font-bold'> Blog Description  </label>
                        <textarea className="textarea-ghost-success textarea resize-none max-w-full h-[200px]" placeholder="Write Your Blogs Here Elaborately ..." name='details' />
                    </div> */}

                    <input type="file" className="input-file" accept=".pdf,.pptx,.zip"
                        {...register("file")}
                    />

                    <div className='flex gap-5 justify-end mr-8'>
                        <button type='submit' className="btn btn-solid-success"> Save & Upload </button>
                        <button type='reset' className="btn btn-solid-error"> Clear </button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default NoteShare;