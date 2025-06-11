import React, { useState, useCallback } from 'react';
import { TripDetails, ItineraryData, GroundingChunk } from './types';
import TripInputForm from './components/TripInputForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<GroundingChunk[]>([]);

  const handleFormSubmit = useCallback(async (details: TripDetails) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setGroundingSources([]);

    if (!details.startDate || !details.endDate || !details.destination) {
        setError("Please fill in all required fields: Start Date, End Date, and Destination.");
        setIsLoading(false);
        return;
    }
    if (new Date(details.startDate) > new Date(details.endDate)) {
        setError("End Date cannot be before Start Date.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
        throw new Error(errorResult.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.itineraryData) {
        setItinerary(result.itineraryData);
      }
      if (result.sources) {
        setGroundingSources(result.sources);
      }
      if (!result.itineraryData && !result.error) {
        setError("The AI could not generate an itinerary for the given inputs. Please try adjusting your preferences or destination.");
      } else if (result.error) {
        setError(result.error);
      }
    } catch (e: any) {
      console.error("Error generating itinerary:", e);
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xl">
          <TripInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorDisplay message={error} />}
          {itinerary && !isLoading && !error && (
            <ItineraryDisplay itineraryData={itinerary} groundingSources={groundingSources} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;