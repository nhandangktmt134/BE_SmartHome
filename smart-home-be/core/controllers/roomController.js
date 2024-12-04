const {
  getAllRoom,
  getRoomById,
  getLastTemperature,
  getLastHumidity,
  getLastLight,
  getNumLightActive,
  getNumFanActive,
} = require("../services/roomServices");

const displayAllRooms = async (req, res) => {
  const listGarden = await getAllRoom();
  return res.status(200).json(listGarden);
  // return res.render('displayAllRooms.ejs', { listGarden: listGarden });
};

const viewRoom = async (req, res) => {
  const room_id = req.params.room_id;
  // console.log(room_id);
  const room = await getRoomById(room_id);
  const lastTemp = await getLastTemperature(room_id);
  const lastHumi = await getLastHumidity(room_id);
  const lastLight = await getLastLight(room_id);
  return res.status(200).json({
    room: room,
    data: {
      lastTemp: lastTemp,
      lastHumi: lastHumi,
      lastLight: lastLight,
    },
  });
};

const viewLight = async (req, res) => {
  const numLight = await getNumLightActive();
  return res.status(200).json(numLight);
}

const viewFan = async (req, res) => {
  const numLight = await getNumFanActive();
  return res.status(200).json(numLight);
}

const getDeviceStatus = async () => {};

module.exports = {
  displayAllRooms,
  viewRoom,
  getDeviceStatus,
  viewLight,
  viewFan,
};
