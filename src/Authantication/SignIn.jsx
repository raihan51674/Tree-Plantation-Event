import { useContext, useRef } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

const SignIn = () => {
  const emailRef = useRef();
  const { SignInUser, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignInUser(email, password)
      .then(() => {
        toast.success('Login successful');
        navigate(location?.state || '/');
      })
      .catch(() => {
        toast.error('Invalid email or password');
      });
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success('Login successful');
        navigate(location?.state || '/');
      })
      .catch(() => {
        toast.error('Google login failed');
      });
  };

  // const handleForgetPassword = () => {
  //   const email = emailRef.current?.value;
  //   ForgetPassword(email)
  //     .then(() => {
  //       toast.success('Password reset email sent. Check your inbox.');
  //     })
  //     .catch((error) => toast.error(error.message));
  // };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gradient-to-tr from-white via-slate-100 to-slate-200 p-4">
      <Helmet>
      <title>Login page</title>
     <meta name="description" content="Track your subscriptions easily." />
    </Helmet>
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome to Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-blue-600 underline mb-1 hover:underline mt-1 float-right"
            >
              Forgot password?
            </button> */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="w-1/4 h-px bg-gray-300"></span>
          OR
          <span className="w-1/4 h-px bg-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium text-black text-sm">Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          New user?{' '}
          <Link to="/auth/register" className="text-blue-600 underline hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
