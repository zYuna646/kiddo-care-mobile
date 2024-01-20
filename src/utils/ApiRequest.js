const BASE_URL = "https://b527-103-26-12-152.ngrok-free.app/api";
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
      if (response.data && response.data.errors) {
        const errorMessage = response.data.errors.message;
        console.error(
          `API error! Status: ${response.status}, Message: ${errorMessage}`
        );
        throw new Error(errorMessage);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default ApiRequest;
