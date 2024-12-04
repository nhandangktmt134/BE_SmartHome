const {
  getTempData,
  getHumiData,
  getLightData,
  getHumibyDate,
  getTempbyDate,
  getLightbyDate,
} = require("../services/sensorDataServices");

const displayDataTable = async (req, res) => {
  const room_id = req.params.room_id;

  const humiData = await getHumiData(room_id);
  const tempData = await getTempData(room_id);
  const lightData = await getLightData(room_id);

  return res.status(200).json({
    humiData: humiData,
    tempData: tempData,
    // moisData: moisData,
    lightData: lightData,
  });
};

const displayDatabyDate = async (req, res) => {
  const room_id = req.params.room_id;
  const date = req.params.date;
  const humiData = await getHumibyDate(room_id, date);
  const tempData = await getTempbyDate(room_id, date);
  const lightData = await getLightbyDate(room_id, date);

  return res.status(200).json({
    humiData: humiData,
    tempData: tempData,
    lightData: lightData,
  });
};

module.exports = {
  displayDataTable,
  displayDatabyDate,
};
