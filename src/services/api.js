import axios from "axios";

const APP_KEY = process.env.REACT_APP_TFL_KEY;
const BASE_URL = "https://api.tfl.gov.uk";

const requestConfig = {
  params: {
    app_key: APP_KEY,
  },
};

export const getLineStatus = async () => {
  const response = await axios.get(
    `${BASE_URL}/Line/Mode/tube,overground,dlr/Status`,
    requestConfig
  );

  return response.data;
};

export const searchLocation = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/StopPoint/Search/${encodeURIComponent(query)}`,
    {
      params: {
        app_key: APP_KEY,
        maxResults: 5,
      },
    }
  );

  return response.data.matches || [];
};

export const getJourney = async (from, to, fromName, toName) => {
  const response = await axios.get(
    `${BASE_URL}/Journey/JourneyResults/${encodeURIComponent(from)}/to/${encodeURIComponent(to)}`,
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

export const getNearbyStops = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/StopPoint`, {
    params: {
      app_key: APP_KEY,
      lat,
      lon,
      radius: 900,
      stopTypes: "NaptanMetroStation,NaptanRailStation,NaptanPublicBusCoachTram",
    },
  });

  return response.data.stopPoints || [];
};

export const getNearbyBikePoints = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/BikePoint`, {
    params: {
      app_key: APP_KEY,
      lat,
      lon,
      radius: 900,
    },
  });

  return response.data || [];
};
