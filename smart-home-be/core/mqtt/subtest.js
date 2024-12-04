require("dotenv").config();
const mqtt = require("mqtt");
const { Client } = require("pg");

var mqttClient;
var mqttHost = process.env.MQTT_HOST;
var mqttPort = process.env.MQTT_PORT;
const protocol = "mqtt";

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
    console.log("mqttHost:" + mqttHost);
  });

  // Received Message
  mqttClient.on("message", async (topic, message, packet) => {
    //   message = JSON.parse(message);
    //   console.log("Received Message on topic: " + topic);
    console.log("Message: " + message);
  });
}

function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}

connectToBroker();
// subscribeToTopic(`${username}/feeds/Temp`);
subscribeToTopic("feeds/room1");
// subscribeToTopic("feeds/ControlRoom1");
