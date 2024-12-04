require("dotenv").config();
const mqtt = require("mqtt");

var mqttClient;
var mqttHost = process.env.MQTT_HOST;
var mqttPort = process.env.MQTT_PORT;
const protocol = "mqtt";

// Change this to point to your MQTT broker or DNS name
// const username = "phucle";
// const password = "aio_ypjm65RZyBGwvGMygJoWFeaYVOlx";

function connectToBroker() {
  const clientId = "client";

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${mqttPort}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(
    hostURL,
    {
      // username: username,
      // password: password
    },
    options
  );

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    // mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected: " + clientId);
  });

  // Received Message
  // mqttClient.on("message", (topic, message, packet) => {
  //   console.log(
  //     "Received Message: " + message.toString() + "\nOn topic: " + topic
  //   );
  // });
}

function publishMessage(topic, message) {
  console.log(`Sending on Topic: ${topic}, \nMessage: \n${message}`);
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

connectToBroker();

// const deviceTopic = ["feeds/ControlRoom1", "feeds/ControlRoom2"];

const pubDeviceStatus = (room_id, name, status) => {
  // let numeric = room_id.match(/\d+/)[0];
  // let numericValue = parseInt(numeric, 10);

  // topic = deviceTopic[numericValue - 1];
  topic = "feeds/ControlRoom";
  const sendMessage = (topic, room_id, name, status) => {
    const message = JSON.stringify({
      room_id: room_id,
      "Device id": name,
      Device_value: status,
    });
    publishMessage(topic, message);
  };

  if (room_id === "room_1000" && name === "device_1000") {
    sendMessage(topic, "room_0001", "device_0001", status);
    sendMessage(topic, "room_0001", "device_0002", status);
    sendMessage(topic, "room_0001", "device_0003", status);
    sendMessage(topic, "room_0002", "device_0001", status);
    sendMessage(topic, "room_0002", "device_0002", status);
    sendMessage(topic, "room_0002", "device_0003", status);
  } else if (room_id === "room_1000") {
    sendMessage(topic, "room_0001", name, status);
    sendMessage(topic, "room_0002", name, status);
  } else if (name === "device_1000") {
    sendMessage(topic, room_id, "device_0001", status);
    sendMessage(topic, room_id, "device_0002", status);
    sendMessage(topic, room_id, "device_0003", status);
  } else {
    sendMessage(topic, room_id, name, status);
  }

};

// const pubDeviceStatus = (room_id, name, status) => {
//   if (room_id && typeof room_id === 'string') {
//     let numericMatch = room_id.match(/\d+/);
//     if (numericMatch !== null && numericMatch.length > 0) {
//       let numericValue = parseInt(numericMatch[0], 10);

//       topic = deviceTopic[numericValue - 1];
//       message = JSON.stringify({
//         room_id: room_id,
//         "Device id": name,
//         Device_value: status,
//       });

//       publishMessage(topic, message);
//     } else {
//       console.error('Unable to extract numeric value from room_id:', room_id);
//     }
//   } else {
//     console.error('Invalid or undefined room_id:', room_id);
//   }
// };

// pubDeviceStatus("room_0001", "device_0001", 1);

module.exports = {
  pubDeviceStatus,
};
