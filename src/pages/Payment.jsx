import React from 'react';
import PaymentMethodSelector from '../components/form/PaymentMethodSelector.jsx';
import { logoutHelper } from '../helpers/user.js'
import { useNavigate, Link } from 'react-router';

import { FaArrowCircleLeft } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutHelper();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <div className='w-full flex justify-between'>
            <Link to="/" className="hover:text-indigo-600">
              <FaArrowCircleLeft className="w-8 h-8" />
            </Link>
            <button onClick={handleLogout} className='button bg-indigo-600 text-white'>Cerrar Sesión</button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Activar licencia</h1>
          <p className="mt-2 text-gray-600">
            Completa los datos del pago para activar tu licencia.
          </p>
        </div>
        <PaymentMethodSelector />
      </div>
    </div>
  );
};

export default Payment;