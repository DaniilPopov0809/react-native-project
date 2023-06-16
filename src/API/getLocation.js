import axios from "axios";
BASE_URL = "https://nominatim.openstreetmap.org/";

async function getLocation(latitude, longitude) {
  try {
    const response = await axios.get(
      `${BASE_URL}reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=ru`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getLocation;
