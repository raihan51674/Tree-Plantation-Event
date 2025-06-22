import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const { createUser, GoogleLogin,setUserData,updateUser } = useContext(AuthContext);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo =e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage('');
    const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegEx.test(password)) {
      setErrorMessage('Password must include uppercase, lowercase, digit, and be at least 6 characters.');
      return;
    }

    createUser(email, password)
      .then((result) =>  {
         toast.success('User create successful');
       const user=result.user;
       updateUser({displayName:name,photoURL:photo}).then(()=>{
         setUserData({...user,displayName:name,photoURL:photo })
       }).catch(()=>{
        toast.error('Invalid user');
        setUserData(user)
       })

        navigate('/')
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then(() =>
        {
        toast.success('User create successfully');
        navigate('/')
        })
      
      .catch((error) => 
        {
        toast.error('Invalid user');
        setErrorMessage(error.message)
        });
  };

  return (
    <div className="bg-gradient-to-br text-black min-h-screen py-15 flex items-center justify-center p-4">

      <Helmet>
      <title>Register page</title>
     <meta name="description" content="Track your subscriptions easily." />
    </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Raihan Islam"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              id="photo"
              name="photo"
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShow ? 'text' : 'password'}
                required
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute right-3 top-2.5 text-blue-600 text-sm cursor-pointer select-none"
              >
                {passwordShow ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition"
          >
            Register
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border py-2 rounded-xl shadow-sm hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="mt-5 text-center text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-700 underline font-semibold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
