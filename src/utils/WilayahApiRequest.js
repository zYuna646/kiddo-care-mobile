import axios from "axios";
import {WILAYAH_API_URL, WILAYAH_API_KEY}  from '@env'

const BASE_URL = WILAYAH_API_URL;
const API_KEY = WILAYAH_API_KEY;

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
