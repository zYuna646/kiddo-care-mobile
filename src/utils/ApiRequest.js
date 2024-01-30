import axios from "axios";
import {API_URL}  from '@env'


const BASE_URL = `${API_URL}/api`;

const ApiRequest = async (endpoint, method = "GET", body = null, headers = {}, params={}) => {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body ? JSON.stringify(body) : null,
      params: {
        ...params,
      },
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

export default ApiRequest;
