import axios from "axios";

// My TFL api key
const APP_KEY = process.env.REACT_APP_TFL_KEY;

// Fetch status of transport
export const getLineStatus = async () => {
  const response = await axios.get(
    `https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status`,
    {
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
    `https://api.tfl.gov.uk/StopPoint/Search/${query}`,
    {
      params: {
        app_key: APP_KEY,
      },
    }
  );

  return response.data.matches.slice(0, 3);
};