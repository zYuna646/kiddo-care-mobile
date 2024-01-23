import axios from "axios";

const BASE_URL = "http://api.binderbyte.com/wilayah";
const API_KEY = "93ed7ed0d33583305428bf71e8bd62e4c73b5ccc7ba1a426063b27f67a84f123";

const WilayahApi = async (endpoint, method = "GET", body = null, headers = {}) => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params: {
        api_key: API_KEY,
        ...body,
      },
    });

    if (!(response.status >= 200 && response.status < 300)) {
      const errorMessage = response.data?.errors?.message || `HTTP error! Status: ${response.status}`;
      console.error(`API error! Status: ${response.status}, Message: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default WilayahApi;

export const fetchKabupaten = async ( id ) => {
  try {
    const kabupaten = await WilayahApi("kabupaten", "GET", {
      id_provinsi: id,
    });

    if (kabupaten != null) {
      return kabupaten;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchKecamatan = async ( id ) => {
  try {
    const kecamatan = await WilayahApi("kecamatan", "GET", {
      id_kabupaten: id,
    });

    if (kecamatan != null) {
      return kecamatan;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
