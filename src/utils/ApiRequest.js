const BASE_URL = "https://api.example.com";

const ApiRequest = async (endpoint, method = "GET", body = null) => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export default ApiRequest;
