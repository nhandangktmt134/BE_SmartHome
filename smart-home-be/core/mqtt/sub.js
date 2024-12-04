require("dotenv").config();
const mqtt = require("mqtt");
const supabase = require('../config/supabaseClient');
const { insertToTemperatureTable, insertToHumidityTable, insertToLightTable, insertDevice1, insertDevice2, insertDevice3, insertDevice4 } = require('../services/sensorDataServices');

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
    try {
      message = JSON.parse(message.toString());
      console.log("Received Message on topic: " + topic);
        if (await insertToLightTable(message)) {
          console.log('Inserted to light table');
        }
        if (await insertToHumidityTable(message)) {
          console.log('Inserted to light table');
        }
        if (await insertToTemperatureTable(message)) {
          console.log('Inserted to light table');
        }
        if (await insertDevice1(message)) {}
        if (await insertDevice2(message)) {}
        if (await insertDevice3(message)) {}
        if (await insertDevice4(message)) {}
    } catch (error) {
      console.error("Error processing and storing data:", error);
    }
  });
}

function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}

connectToBroker();
subscribeToTopic(`feeds/room1`);
subscribeToTopic(`feeds/room2`);
// subscribeToTopic(`feeds/Light`);
