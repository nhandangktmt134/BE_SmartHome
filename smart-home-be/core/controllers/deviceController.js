const {
  updateDeviceStatus,
  getAllDeviceByGardenId,
  getDeviceSchedule,
  updateDeviceSchedule,
  updateLightStatus,
  updateFanStatus,
} = require("../services/deviceService");
const { pubDeviceStatus } = require("../mqtt/pub");

const viewDevice = async (req, res) => {
  const room_id = req.params.room_id;
  const listDevice = await getAllDeviceByGardenId(room_id);
  return res.status(200).json({
    device: listDevice,
  });
  // return res.render('viewDevice.ejs', { listDevice: listDevice });
};

const changeDeviceStatus = async (req, res) => {
  let devices = req.body;

  if (!Array.isArray(devices)) {
    devices = [devices];
  }
  for (const device of devices) {
    const { room_id, name, status } = device;
    // Kiểm tra tính hợp lệ của dữ liệu
    if (
      typeof room_id !== "string" ||
      typeof name !== "string" ||
      typeof status !== "string "
    ) {
      return res.status(400).send("Invalid device data format.");
    }

    await pubDeviceStatus(room_id, name, status);
    await updateDeviceStatus(room_id, name, status);
  }
  // let room_id = req.body.room_id;
  // let name = req.body.name;
  // let status = req.body.status;
  //   pubDeviceStatus(room_id, name, status);
  //   updateDeviceStatus(room_id, name, status);
  return res.send("Update status succeed!").status(200);
};

const changeLightStatus = async (req, res) => {
  let status = req.body.status;
  updateLightStatus(status);
  return res.send("Update status succeed!").status(200);
};

const changeFanStatus = async (req, res) => {
  let status = req.body.status;
  updateFanStatus(status);
  return res.send("Update status succeed!").status(200);
};

const viewDeviceSchedule = async (req, res) => {
  const device_id = req.params.device_id;
  const deviceSchedule = await getDeviceSchedule(device_id);
  // return res.render('deviceSchedule.ejs');
  return res.status(200).json({
    deviceSchedule: deviceSchedule,
  });
};

const putDeviceSchedule = async (req, res) => {
  const device_id = req.params.device_id;
  const time_on = req.body.time_on;
  const time_off = req.body.time_off;
  const notification = req.body.notification;
  const repeat = req.body.repeat;

  updateDeviceSchedule(device_id, time_on, time_off, notification, repeat);

  res.send("Update schedule succeed!").status(200);
};
module.exports = {
  viewDevice,
  changeDeviceStatus,
  viewDeviceSchedule,
  putDeviceSchedule,
  changeLightStatus,
  changeFanStatus,
};
