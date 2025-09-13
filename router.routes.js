import { Router } from "express";
import  controllers from "../controllers/userauthenticate.controller.js";
import Extractjwt from "../middlewares/jwt.middleware.js";
import flightsController from "../controllers/flights.controller.js";
import paymentController from "../controllers/payment.controller.js";
import ShowBookings from "../controllers/Booking.controller.js";
const router = Router();
router.route("/register").post(controllers.registerUser);
router.route("/login").post(controllers.logincustomer)
router.route("/logout").post(Extractjwt,controllers.logoutcustomer);
router.route("/flights").get(flightsController.searchFlights)
router.route("/initiate").post(paymentController.Creating)
router.route("/paymentverify").post(paymentController.PaymentVerification)
router.route("/SaveInDb").post(Extractjwt,paymentController.Dbsaver)
router.route("/Getdata").get(Extractjwt,ShowBookings)
export default router;