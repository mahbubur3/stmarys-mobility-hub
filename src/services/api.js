import axios from "axios";

// My TFL api key
const APP_KEY = process.env.REACT_APP_TFL_KEY;

// Fetch status of transport
export const getLineStatus = async () => {
  const response = await axios.get(`https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status`, {
      params: {
        app_key: APP_KEY,
      },
    }
  );

  return response.data;
};

// Start and ending point
export const searchLocation = async (query) => {
  const response = await axios.get(
    `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(query)}`,
    {
      params: {
        app_key: APP_KEY,
        maxResults: 5,
      },
    }
  );

  return response.data.matches || [];
};

// Fetch journey
export const getJourney = async (from, to, fromName, toName) => {
  const response = await axios.get(
    `https://api.tfl.gov.uk/Journey/JourneyResults/${encodeURIComponent(from)}/to/${encodeURIComponent(to)}`,
    {
      params: {
        app_key: APP_KEY,
        fromName,
        toName,
      },
    }
  );

  return response.data.journeys;
};
