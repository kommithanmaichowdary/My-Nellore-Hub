import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError(t('auth.loginError'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              N
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('auth.loginToNelloreHub')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center space-y-4">
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.75-5.75C34.64 3.36 29.82 1 24 1 14.82 1 6.98 6.98 3.69 15.09l6.68 5.18C12.36 14.36 17.73 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.98 37.02 46.1 31.23 46.1 24.5z"/>
                  <path fill="#FBBC05" d="M10.37 28.09c-1.09-3.27-1.09-6.82 0-10.09l-6.68-5.18C1.1 16.36 0 20.05 0 24c0 3.95 1.1 7.64 3.69 11.18l6.68-5.09z"/>
                  <path fill="#EA4335" d="M24 47c6.48 0 11.93-2.15 15.91-5.86l-7.19-5.6c-2.01 1.35-4.59 2.16-8.72 2.16-6.27 0-11.64-4.86-13.63-11.09l-6.68 5.09C6.98 41.02 14.82 47 24 47z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
              Sign in with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;