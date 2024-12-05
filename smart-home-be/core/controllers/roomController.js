const cron = require('node-cron');
const {
  updateDeviceStatus
} = require("../services/deviceService");
const {
  getAllRoom,
  getRoomById,
  getLastTemperature,
  getLastHumidity,
  getLastLight,
  getNumLightActive,
  getNumFanActive,
  ArlamInfo,
  ArlamInfoforroom,
  getScheduledTasks
} = require("../services/roomServices");

const displayAllRooms = async (req, res) => {
  const listGarden = await getAllRoom();
  return res.status(200).json(listGarden);
  // return res.render('displayAllRooms.ejs', { listGarden: listGarden });
};
const displayAllRoomsArlamforrom = async (req, res) => {
  const room_id = req.params.room_id;
  const list = await ArlamInfoforroom(room_id);
  return res.status(200).json({
    room: room_id,
    data: {
      notice: list,
    },
  });
  // return res.render('displayAllRooms.ejs', { listGarden: listGarden });
};
const displayAllRoomsArlam = async (req, res) => {

  const list = await ArlamInfo();
  return res.status(200).json(list);
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

const getDeviceStatus = async () => { };


const startScheduler = async () => {
  const tasks = await getScheduledTasks();

  tasks.forEach(task => {
    const scheduledTime = new Date(task.time);
    const currentTime = new Date();

    const timeUntilExecution = scheduledTime - currentTime - 10000;

    if (timeUntilExecution > 0) {
      console.log(`Sẽ thực hiện công việc cho ${task.name} sau ${timeUntilExecution / 1000} giây`);

      setTimeout(() => {
        executeScheduledTask(task);
      }, timeUntilExecution);
    } else {
      console.log(`Thời gian đã qua cho công việc ${task.name}, không thực hiện.`);
    }
  });
};

// Hàm để kiểm tra dữ liệu mới
const checkForNewTasks = async () => {
  const newTasks = await getScheduledTasks();
  // Cập nhật lại lịch trình nếu có nhiệm vụ mới
  startScheduler(newTasks);
};

// Gọi hàm kiểm tra dữ liệu mới theo định kỳ
setInterval(checkForNewTasks, 60000); // Kiểm tra mỗi phút

// Định nghĩa hàm thực hiện công việc
const executeScheduledTask = (task) => {
  console.log(`Đang thực hiện công việc cho ${task.name} với thiết bị ${task.device} với trạng thái ${task.status}`);
  updateDeviceStatus(task.name, task.device, task.status)
};

// Khởi động lịch
startScheduler();
module.exports = {
  displayAllRooms,
  viewRoom,
  getDeviceStatus,
  viewLight,
  viewFan,
  displayAllRoomsArlam,
  displayAllRoomsArlamforrom,
  startScheduler
};
