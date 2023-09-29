import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Classroom = ({ faculty }) => {
    const [btn, setBtn] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [pendingStatus, setPendingStatus] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosSecure.get(`/officeMaterials/${faculty?.email}`);
                setPendingStatus(res.data);
            } catch (error) {
                // Handle the error here
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [faculty?.email]);


    const handleRadioClick = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const min = 1;
    const max = 5;

    const handleSubmit = event => {
        setBtn(true);
        event.preventDefault();

        const form = event.target;

        const room = form.room.value;
        const marker = form.marker.value;
        // const duster = form.duster;
        // const speaker = form.speaker;
        // const air = form.air;

        //    console.log(selectedOptions)

        //    console.log(marker,selectedOptions)

        if (room === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add room no'
            })
            setBtn(false);

            return;
        }

        if (marker === "" && selectedOptions.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add any material quantity'
            })
            setBtn(false);

            return;
        }

        // const item = [...selectedOptions , marker];


        const { email, firstName, lastName } = faculty;
        const data = { room, email, firstName, lastName, marker , selectedOptions, status: "pending" };

        // console.log(data);

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

                <input className="input-ghost-secondary input" type='number' placeholder="Enter Room No" name='room' />

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
                                    className="input input-solid" placeholder="Enter amount" name='marker'

                                /> </td>

                            </tr>

                            <tr>
                                <th>2</th>
                                <td> Duster </td>
                                <td className='flex gap-4'> <input type="radio" className="radio-solid-success radio" name='duster'
                                    onClick={() => handleRadioClick('Duster')}
                                /> Request </td>

                            </tr>

                            <tr>
                                <th> 3 </th>
                                <td> Speaker </td>
                                <td className='flex gap-4'> <input type="radio" className="radio-solid-success radio" name='speaker'
                                    onClick={() => handleRadioClick('Speaker')}
                                /> Request </td>
                            </tr>

                            <tr>
                                <th> 4 </th>
                                <td> Air Freshener </td>
                                <td className='flex gap-4'> <input type="radio" className="radio-solid-success radio" name='air freshener'
                                    onClick={() => handleRadioClick('Air Freshener')}
                                /> Request </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className='flex justify-center'>
                    {
                        pendingStatus ?
                            <button type='submit' className="btn btn-solid-success"
                                disabled
                            > Request Delivered </button>
                            :
                            <button type='submit' className="btn btn-solid-success"
                                disabled={btn}
                            > Proceed to Request </button>
                    }
                </div>

            </form>

        </div>
    );
};

export default Classroom;