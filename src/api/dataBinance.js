import axios from "axios";

const API_URL = "https://data.binance.com/api/v3/ticker/24hr";

export const fetchTickerData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
