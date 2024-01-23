const BASE_URL = "http://api.binderbyte.com/wilayah/api";
import axios from "axios";

const WilayahApi = async (endpoint, method = "GET", body = null, headers = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  console.log(body);
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body ? JSON.stringify(body) : null,
    });

    if (!(response.status >= 200 && response.status < 300)) {
      if (response.data && response.data.errors) {
        const errorMessage = response.data.errors.message;
        console.error(
          `API error! Status: ${response.status}, Message: ${errorMessage}`
        );
        console.log(response);

        throw new Error(errorMessage);
      } else {
        console.log(response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default WilayahApi;
