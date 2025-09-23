
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { authenticateUser } from '../../helpers/auth.js';
import Input from './Input.jsx';
import Spinner from '../common/Spinner.jsx';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useAccess } from '../../context/AccessProvider.jsx';

const SignInForm = (props) => {
  const { setAuthTokenAndRevalidate } = useAccess();
  const { isLoading, error, getData } = useVisitorData(
    { ignoreCache: true },
    { immediate: false }
  )
  const { setError } = props;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoadingCustom(true);
    try {
      const { requestId, visitorId } = await getData();
      const { token } = await authenticateUser(email, password, { requestId, visitorId });
      await setAuthTokenAndRevalidate(token);
      setIsLoadingCustom(false);
      navigate('/folders');
    } catch (error) {
      setError(error.message);
      setIsLoadingCustom(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md space-y-4">
        <Input 
          title="Correo electrónico"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="tu@email.com"
        />

        <Input 
          title="Contraseña"
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="••••••••"
        />
      </div>

      <div className="flex justify-center">

        <div className="text-sm">
          <a
            href="/password/start"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoadingCustom}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoadingCustom ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
          } transition-colors duration-300`}
        >
          {isLoadingCustom ? (
            <>
              <Spinner />
              Procesando...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </div>
    </form>
  )
}

export default SignInForm