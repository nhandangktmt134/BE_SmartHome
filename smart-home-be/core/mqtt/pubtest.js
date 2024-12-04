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
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received Message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage(topic, message) {
  console.log(`Sending Topic: ${topic}, Message: ${message}`);
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

const tempData = {
  station_id: "garden_0001",
  station_name: "Garden 0001",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    {
      sensor_id: "temp_0001",
      sensor_name: "Temperature",
      sensor_value: 112.3,
      sensor_unit: "oC",
    },
  ],
};

const humiData = {
  station_id: "garden_0001",
  station_name: "Garden 0001",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    {
      sensor_id: "humi_0001",
      sensor_name: "Humidity",
      sensor_value: 73.5,
      sensor_unit: "%",
    },
  ],
};

const lightData = {
  station_id: "garden_0001",
  station_name: "Garden 0001",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    {
      sensor_id: "light_0001",
      sensor_name: "Light",
      sensor_value: 112.3,
      sensor_unit: "lux",
    },
  ],
};

const Data = [
  { room_id: "room_0001", "Device id": "device_0001", Device_value: 1 },
  
  { room_id: "room_0002", "Device id": "device_0001", Device_value: 0 },
];

const jsondata = [
  // JSON.stringify(tempData),
  // JSON.stringify(humiData),
  // JSON.stringify(lightData),
  JSON.stringify(Data),
];

connectToBroker();

// setInterval(() => {
//   const topic = ["feeds/Temp", "feeds/Humi", "feeds/Light"];
//   for (let i = 0; i < topic.length; i++) {
//     publishMessage(topic[i], jsondata[i]);
//   }
// }, 5000);

setInterval(() => {
  publishMessage("feeds/ControlRoom", JSON.stringify(Data[0]));
}, 3000);
setInterval(() => {
  publishMessage("feeds/ControlRoom", JSON.stringify(Data[1]));
}, 3000);
