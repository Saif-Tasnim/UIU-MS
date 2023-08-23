import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Officeroom = ({ faculty }) => {
    const min = 0;
    const max = 5;

    const [btn, setBtn] = useState(false);
    const [axiosSecure] = useAxiosSecure();

    const handleSubmit = event => {
        event.preventDefault();
        setBtn(true);

        const form = event.target;

        const tissue = form.tissue.value;
        const ink = form.ink.value;
        const paper = form.paper.value;

        const { room, email, firstName, lastName } = faculty;
        const data = { tissue, ink, paper, room, email, firstName, lastName };

        if ((paper == 0 && ink == 0 && tissue == 0) || (paper === "" && ink === "" && tissue === "")) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add any material quantity'
            })
            setBtn(false);

            return;

        }

       
        axiosSecure.post(`/officeMaterials`, data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Pending!',
                        'Your request successfully reached.',
                        'success'
                    )
                }
            })


        setBtn(false);
    }

    return (

        <div>
            <div className='my-10 mx-6'>

                <form onSubmit={handleSubmit}>

                    <div className="flex w-full overflow-x-auto my-10">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Materials </th>
                                    <th> Quantity </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td> Tissue Box </td>
                                    <td> <input type='number'
                                        min={min}
                                        max={max}
                                        className="input input-solid" placeholder="Enter amount" name='tissue' /> </td>

                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td> Printer Ink </td>
                                    <td> <input type='number'
                                        min={min}
                                        max={max}
                                        className="input input-solid" placeholder="Enter amount" name='ink' /> </td>

                                </tr>

                                <tr>
                                    <th> 3 </th>
                                    <td> Paper </td>
                                    <td> <input type='number'
                                        min={min}
                                        
                                        className="input input-solid" placeholder="Enter amount" name='paper' /> </td>
                                </tr>

                                {/* <tr>
                                    <th> 4 </th>
                                    <td> Paper </td>
                                    <td> <input type='number'
                                        min={min}
                                        max={max}
                                        className="input input-solid" placeholder="Enter amount" /> </td>
                                </tr> */}

                            </tbody>
                        </table>
                    </div>

                    <div className='flex justify-center'>
                        <button type='submit' className="btn btn-solid-success"
                            disabled={btn}
                        > Proceed to Request </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Officeroom;