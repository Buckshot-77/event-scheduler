const routes = require("express").Router();
const {
  getSchedule,
  postSchedule,
  deleteSchedule,
} = require("../controller/scheduleController.js");

routes.get("/", getSchedule);
routes.post("/", postSchedule);
routes.delete("/", deleteSchedule);

module.exports = routes;
