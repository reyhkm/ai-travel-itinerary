import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 shadow-sm" role="alert">
      <div className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2.5 text-red-500 flex-shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div>
            <h3 className="text-sm font-semibold text-red-800">Oops! Something went wrong.</h3>
            <p className="text-sm text-red-700 mt-0.5">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;