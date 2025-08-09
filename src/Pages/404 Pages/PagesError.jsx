import React from 'react';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PagesError = ({ errorCode = 404, errorMessage = "Page Not Found" }) => {
  const navigate = useNavigate();
  
  // Different error illustrations based on error type
  const errorIllustrations = {
    404: (
      <svg className="w-64 h-64" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 416C341.385 416 412 345.385 412 260C412 174.615 341.385 104 256 104C170.615 104 100 174.615 100 260C100 345.385 170.615 416 256 416Z" stroke="#2E7D32" strokeWidth="32" strokeMiterlimit="10"/>
        <path d="M256 160L256 280" stroke="#4FC3F7" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M256 320L256 336" stroke="#2E7D32" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    500: (
      <svg className="w-64 h-64" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 80C149.9 80 64 165.9 64 272C64 378.1 149.9 464 256 464C362.1 464 448 378.1 448 272C448 165.9 362.1 80 256 80Z" stroke="#2E7D32" strokeWidth="32" strokeMiterlimit="10"/>
        <path d="M256 144V272" stroke="#4FC3F7" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M256 336L256 368" stroke="#2E7D32" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    default: (
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-[#4FC3F7]/10 rounded-full animate-pulse"></div>
        <AlertTriangle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 text-[#2E7D32]" />
      </div>
    )
  };

  return (
    <div className="min-h-screendark:from-[#0a2e1a] dark:to-[#052e16] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Error Illustration */}
        <div className="bg-[#2E7D32]/5 dark:bg-gray-700/50 p-8 flex justify-center">
          {errorIllustrations[errorCode] || errorIllustrations.default}
        </div>
        
        {/* Error Content */}
        <div className="p-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2E7D32]/10 dark:bg-green-900/30 text-[#2E7D32] dark:text-green-300 text-sm font-medium mb-6">
            <AlertTriangle className="h-4 w-4 mr-2" />
            ERROR {errorCode}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {errorMessage}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {errorCode === 404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "Something went wrong on our end. We're working to fix it."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-full shadow-md transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-3">Still need help?</p>
            <a 
              href="mailto:support@greeninitiative.com" 
              className="inline-flex items-center text-[#4FC3F7] hover:text-[#2E7D32] dark:hover:text-green-300 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesError;