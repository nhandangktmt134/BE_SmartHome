const express = require("express");
const router = express.Router();
const {
  displayAllRooms,
  viewRoom,
  viewLight,
  viewFan,
} = require("../controllers/roomController");
const { displayDataTable, displayDatabyDate } = require("../controllers/sensorDataController");
const {
  viewDevice,
  viewDeviceSchedule,
  putDeviceSchedule,
  changeDeviceStatus,
  changeLightStatus,
  changeFanStatus,
} = require("../controllers/deviceController");
const { getArlamRoomid, checkTimeAndUpdateNote } = require("../controllers/Arlam");


const initWebRoutes = (app) => {
  //
  router.get("/api/v1/notice",getArlamRoomid);
  router.get("/api/v1/checknotice",checkTimeAndUpdateNote);
  router.get("/api/v1/room", displayAllRooms);
  router.get("/api/v1/:room_id", viewRoom);
  
  router.get("/api/v1/:room_id/data-table", displayDataTable);
  router.get("/api/v1/:room_id/device", viewDevice);
  router.get("/api/v1/:room_id/data-value/:date", displayDatabyDate);
  // router.post("/api/v1/:room_id/change-device-status", changeDeviceStatus);
  // router.get("/api/v1/:room_id/device/schedule/:device_id", viewDeviceSchedule);
  // router.put(
  //   "/api/v1/:room_id/device/schedule/:device_id/add-schedule",
  //   putDeviceSchedule
  // );
  // router.put("/api/v1/:room_id/device/status", )
  router.put("/api/v1/device", changeDeviceStatus);
  router.put("/api/v1/device/lightswitch", changeLightStatus);
  router.put("/api/v1/device/fanswitch", changeFanStatus);

  router.get("/api/v1/device/light", viewLight);
  router.get("/api/v1/device/fan", viewFan);



  return app.use("/", router);
};

module.exports = initWebRoutes;
