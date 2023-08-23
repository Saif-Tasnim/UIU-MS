import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Classroom = ({ faculty }) => {
    const [btn, setBtn] = useState(false);
    const [axiosSecure] = useAxiosSecure();

    const min = 0;
    const max = 5;

    const handleSubmit = event => {
        setBtn(true);
        event.preventDefault();

        const form = event.target;

        const room = form.room.value;
        const marker = form.marker.value;
        const duster = form.duster.value;
        const speaker = form.speaker.value;

        if (room === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add room no'
            })
            setBtn(false);

            return;
        }

        if ((marker === "" && duster === "" && speaker === "") || (marker == 0 && duster == 0 && speaker == 0)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add any material quantity'
            })
            setBtn(false);

            return;
        }

        const { email, firstName, lastName } = faculty;
        const data = { room, email, firstName, lastName, marker, duster, speaker }

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

        <div className='my-10 mx-6'>

            <form onSubmit={handleSubmit}>

                <input className="input-ghost-secondary input" placeholder="Enter Room No" name='room' />

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
                                <td> Marker </td>
                                <td> <input type='number'
                                    min={min}
                                    max={max}
                                    className="input input-solid" placeholder="Enter amount" name='marker' /> </td>

                            </tr>
                            <tr>
                                <th>2</th>
                                <td> Duster </td>
                                <td> <input type='number'
                                    min={min}
                                    max={max}
                                    className="input input-solid" placeholder="Enter amount" name='duster' /> </td>

                            </tr>

                            <tr>
                                <th> 3 </th>
                                <td> Speaker </td>
                                <td> <input type='number'
                                    min={min}
                                    max={max}
                                    className="input input-solid" placeholder="Enter amount" name='speaker' /> </td>
                            </tr>

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
    );
};

export default Classroom;