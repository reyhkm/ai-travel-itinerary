import React, { useState } from 'react';
import { TripDetails } from '../types';

interface TripInputFormProps {
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

const TripInputForm: React.FC<TripInputFormProps> = ({ onSubmit, isLoading }) => {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [destination, setDestination] = useState<string>('');
  const [preferences, setPreferences] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!startDate || !endDate || !destination.trim()) {
        setFormError("Please fill in Start Date, End Date, and Destination.");
        return;
    }
    if (new Date(startDate) > new Date(endDate)) {
        setFormError("End Date cannot be before Start Date.");
        return;
    }
    onSubmit({ startDate, endDate, destination, preferences });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-6">Plan Your Adventure</h2>
      
      {formError && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm ring-1 ring-red-200">{formError}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
          Destination (City, Country) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Kyoto, Japan"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-1">
          Travel Preferences (Optional)
        </label>
        <textarea
          id="preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={3}
          placeholder="e.g., Interested in historical sites, local cuisine, and nature."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:border-primary text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">Describe your interests like food, culture, adventure, relaxation, etc.</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-2.5 px-5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:enabled:scale-[1.02]"
        aria-live="polite"
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Itinerary...
          </>
        ) : (
          'Generate Itinerary'
        )}
      </button>
    </form>
  );
};

export default TripInputForm;