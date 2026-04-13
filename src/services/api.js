import axios from "axios";

const BASE_URL = "https://api.tfl.gov.uk";

const APP_KEY = process.env.REACT_APP_TFL_KEY;

export const getLineStatus = async () => {
  const response = await axios.get(
    `${BASE_URL}/Line/Mode/tube,overground,dlr/Status`,
    {
      params: {
        app_key: APP_KEY,
      },
    }
  );

  return response.data;
};