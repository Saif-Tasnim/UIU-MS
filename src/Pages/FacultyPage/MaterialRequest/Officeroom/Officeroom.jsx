import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Officeroom = ({ faculty }) => {
    const min = 1;
    const max = 5;
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

    const handleSubmit = event => {
        event.preventDefault();
        setBtn(true);

        const form = event.target;

        const marker = form.marker.value;
        const ctPaper = form.ctPaper.value;
        const a4Paper = form.a4Paper.value;
        const pin = form.pin.value;

        const { room, email, firstName, lastName } = faculty;
        const data = { marker, ctPaper, a4Paper, pin, room, email, firstName, lastName, selectedOptions, status: 'pending' };

        if (marker === "" && ctPaper === "" && a4Paper === "" && pin === "" && selectedOptions.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have not add any material quantity'
            })
            setBtn(false);

            return;

        }

        console.log(data)


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
                                    <th></th>
                                    <th> Quantity </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td> Marker </td>
                                    <td></td>
                                    <td> <input type='number'
                                        min={min}
                                        max={max}
                                        className="input input-solid" placeholder="Enter amount" name='marker' /> </td>

                                </tr>
                                <tr>
                                    <th> 2 </th>
                                    <td> Tissue Box </td>
                                    <td></td>
                                    <td className='flex gap-3'>
                                        <input type="radio" className="radio-solid-success radio" name='tissue'
                                            onClick={() => handleRadioClick('tissue')}
                                        />  Request </td>
                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td> Printer Ink </td>
                                    <td></td>
                                    <td className='flex gap-3'>
                                        <input type="radio" className="radio-solid-success radio" name='ink'
                                            onClick={() => handleRadioClick('ink')}
                                        /> Request </td>



                                </tr>

                                <tr>
                                    <th> 4 </th>
                                    <td> Ct Paper </td>
                                    <td></td>

                                    <td>

                                        <input type='number'
                                            min={min}
                                            className="input input-solid" placeholder="Enter amount" name='ctPaper' />
                                    </td>


                                </tr>



                                <tr>
                                    <th> 5 </th>
                                    <td> A4 Paper </td>
                                    <td></td>
                                    <td>

                                        <input type='number'
                                            min={min}
                                            className="input input-solid" placeholder="Enter amount" name='a4Paper' />
                                    </td>


                                </tr>


                                <tr>
                                    <th> 6 </th>
                                    <td> Stapler Pin </td>
                                    <td></td>
                                    <td> <input type='number'
                                        min={min}
                                        max={max}
                                        className="input input-solid"
                                        name='pin' placeholder="Enter amount" /> </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='flex justify-center'>

                        {pendingStatus ?
                            <button type='submit' className="btn btn-solid-success"
                                disabled
                            > Request Delivered </button>
                            :
                            <button type='submit' className="btn btn-solid-success"
                                disabled={btn}
                            > Proceed to Request </button>}
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Officeroom;