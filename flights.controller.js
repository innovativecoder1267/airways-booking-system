import axios from "axios";
import asynchandler from "../utils/asynchandler.js"
import apierrorhandler from "../utils/apierrorhandler.js";

const searchFlights = asynchandler(async (req, res) => {
  const { from, to, departureDate, passengers, returnDate } = req.query;
  console.log("All details received",from,to,departureDate,passengers,returnDate)
  console.log("Request query:", req.query);
  if (!from || !to || !departureDate || !passengers) {
    throw new apierrorhandler(400, "Please fill all the mandatory fields");
  }
  
  const originCode = from.trim().toUpperCase();
  const destinationCode=to.trim().toUpperCase();
  const tokenResponse=await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.APISECRET
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  )
  const token = tokenResponse.data.access_token;
  console.log("Generated token:", token);

  const params = {
    originLocationCode: originCode,
    destinationLocationCode: destinationCode,
    departureDate,
    adults: Number(passengers)
  };
  if (returnDate) {
    params.returnDate = returnDate;
  }

  const response = await axios.get(
    "https://test.api.amadeus.com/v2/shopping/flight-offers",
    {
      headers: { Authorization: `Bearer ${token}` },
      params
    }
  );


  console.log("Flight offers response:", response.data);

  if (!response.data || response.data.length === 0) {
    throw new apierrorhandler(404, "No flight offers found for the given criteria");
  }

  res.status(200).json({
    success: true,
    message: "Flight offers fetched successfully",
    data: response.data
  });
}
)
export default {
    searchFlights,
    
}

