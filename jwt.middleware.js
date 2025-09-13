import jwt from "jsonwebtoken";
import apierrorhandler from "../utils/apierrorhandler.js";
import asynchandler from "../utils/asynchandler.js";

const Extractjwt = asynchandler((req, res, next) => {
  // Extract token from cookies or headers
  const authHeader = req.headers["authorization"];
  const token = req.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

  // Check if token exists
  if (!token) {
    throw new apierrorhandler(401, "Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.GENERATE_ACCESSTOKEN);

    if (!decoded) {
      throw new apierrorhandler(401, "Can't decode the token");
    }

    // 👇 Correct field (id, not _id)
    const userId = decoded?.id;
    // Check if userId exists in the decoded token or not   
    if (!userId) {
      throw new apierrorhandler(401, "User ID not found in token");
    }
    //Attach user ID to request object 
    
    req.user = { id: userId }; // Attach user ID
    next(); // Continue
  } catch (error) {
    console.log(error?.message || error, "Error occurred in extracting the token");
    throw new apierrorhandler(401, "Invalid or expired token");
  }
});
export default Extractjwt;