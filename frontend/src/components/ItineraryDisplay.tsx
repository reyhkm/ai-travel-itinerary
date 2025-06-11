import React from 'react';
import { ItineraryData, Activity, GroundingChunk } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isFirst: boolean;
  isLast: boolean;
}

interface ItineraryDisplayProps {
  itineraryData: ItineraryData | null;
  groundingSources: GroundingChunk[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out">
    <h4 className="font-semibold text-primary-dark text-md">{activity.name}</h4>
    {activity.time && <p className="text-xs text-gray-500 mb-1.5 mt-0.5">{activity.time}</p>}
    <p className="text-sm text-gray-700 leading-relaxed">{activity.description}</p>
  </div>
);

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itineraryData, groundingSources }) => {
  if (!itineraryData || !itineraryData.itinerary || itineraryData.itinerary.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-600 py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <p className="font-medium">No itinerary details available.</p>
        <p className="text-sm">The AI might not have been able to generate a plan for the provided inputs.</p>
      </div>
    );
  }

  const webSources = groundingSources.filter(source => source.web && source.web.uri);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-3">Your Personalized Itinerary</h2>
      <div className="space-y-8">
        {itineraryData.itinerary.map((dailyPlan, index) => (
          <div key={index} className="p-5 bg-white rounded-lg shadow-lg border border-gray-200/80">
            <div className="flex items-center mb-5">
                <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full mr-3 select-none">
                    {dailyPlan.day.startsWith('Day') ? dailyPlan.day.split(' - ')[0] : `Day ${index + 1}`}
                </span>
                <h3 className="text-lg font-semibold text-primary-dark flex-grow">
                    {dailyPlan.title ? dailyPlan.title : `Activities for ${dailyPlan.day.split(' - ')[1] || dailyPlan.day }`}
                </h3>
            </div>
             {dailyPlan.day.split(' - ')[1] && !dailyPlan.title && <p className="text-sm text-gray-500 mb-4 -mt-4 ml-[calc(1rem+0.75rem+0.625rem)] pl-0.5">{dailyPlan.day.split(' - ')[1]}</p>}


            {dailyPlan.activities && dailyPlan.activities.length > 0 ? (
              <div className="space-y-4">
                {dailyPlan.activities.map((activity, activityIndex) => (
                  <ActivityCard
                    key={activityIndex}
                    activity={activity}
                    isFirst={activityIndex === 0}
                    isLast={activityIndex === dailyPlan.activities.length -1}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm py-3 text-center">No specific activities planned for this day. Enjoy some free time!</p>
            )}
          </div>
        ))}
      </div>
      {webSources.length > 0 && (
        <div className="mt-10 p-4 bg-primary-light/10 border border-primary-light/30 rounded-lg">
          <h3 className="text-md font-semibold text-primary-dark mb-2">Information Sources:</h3>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            {webSources.map((source, idx) => (
              source.web && <li key={idx} className="text-sm">
                <a
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark hover:underline"
                  title={source.web.title || source.web.uri}
                >
                  {source.web.title || source.web.uri}
                </a>
              </li>
            ))}
          </ul>
           <p className="text-xs text-primary-dark/70 mt-3">Note: These sources were used by the AI to help generate the itinerary. Please verify all information independently.</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryDisplay;