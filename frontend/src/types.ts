
export interface TripDetails {
  startDate: string;
  endDate: string;
  destination: string;
  preferences: string;
}

export interface Activity {
  time: string;
  name: string;
  description: string;
}

export interface DailyItinerary {
  day: string;
  title?: string; // Optional title for the day
  activities: Activity[];
}

export interface ItineraryData {
  itinerary: DailyItinerary[];
}

// Used for grounding metadata if search is enabled.
export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // May include other types like "retrievedContext"
}
