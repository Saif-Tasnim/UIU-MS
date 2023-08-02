import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire(
          'Good job!',
          'Successfully signed out',
          'success'
        )
        navigate('/');
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
  }

  return (
    <div className='card flex flex-row max-w-full justify-between px-8 py-3 items-center'>
      <h2 className='text-[#F06517]'> United International University </h2>
      <h4 className='text-[#F06517] font-bold'> Admin Site  </h4>
      <div>
        <button className='btn bg-[#F06517] text-white' onClick={handleLogOut}> Log Out </button>
      </div>
    </div>
  );
};

export default AdminHeader;


