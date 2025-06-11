import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-500 py-8 text-center border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Travel Itinerary Planner. Powered by Google Gemini.
        </p>
        <p className="text-xs mt-1">
          For demonstration purposes only. Always verify travel information.
        </p>
      </div>
    </footer>
  );
};

export default Footer;