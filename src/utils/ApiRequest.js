const BASE_URL = "https://7922-36-85-221-64.ngrok-free.app/api";
import axios from "axios";

const ApiRequest = async (endpoint, method = "GET", body = null) => {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body ? JSON.stringify(body) : null,
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export default ApiRequest;
