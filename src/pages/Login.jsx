
import React, { useState } from 'react';
import SignInForm from '../components/form/SignInForm.jsx';
import ErrorMessageSignIn from '../components/form/ErrorMessageSignIn.jsx';
import HeaderSignIngForm from '../components/form/HeaderSignIngForm.jsx';
import { Link } from 'react-router';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Login = () => {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Link to="/" className="inline-block m-0 hover:text-indigo-600">
          <FaArrowCircleLeft className="w-8 h-8" />
        </Link>
        <HeaderSignIngForm/>

        {error && <ErrorMessageSignIn error={error} />}

        <SignInForm setError={setError} />
      </div>
    </div>
  );
};

export default Login;