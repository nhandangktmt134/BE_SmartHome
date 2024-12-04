
import paho.mqtt.client as mqtt
import json
import time

# MQTT_SERVER = "mqttserver.tk"
# MQTT_SERVER = "192.168.2.4"
MQTT_SERVER = "localhost"
MQTT_PORT = 1883

MQTT_TOPIC_PUB = ["feeds/Temp", "feeds/Humi", "feeds/Mois", "feeds/Light"]

def mqtt_recv_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    try:
        data = json.loads(payload)
        print("Received JSON:", data)
        # You can process the JSON data here
    except json.JSONDecodeError as e:
        print(f"Received non-JSON message: {payload}")

mqttClient = mqtt.Client()
# mqttClient.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
mqttClient.connect(MQTT_SERVER, int(MQTT_PORT), 60)

# Register MQTT events
mqttClient.on_message = mqtt_recv_message

mqttClient.loop_start()
i = 0
while True:
    # Create a JSON object
    tempData = {
        "station_id": "garden_0001",
        "station_name": "Garden 0001",
        "gps_longitude": 106.89,
        "gps_latitude": 10.5,
        "sensors":[
            {
                "sensor_id": "temp_0001",
                "sensor_name": "Temperature",
                "sensor_value": 112.3 + i,
                "sensor_unit": "oC"
            }
        ]

    }

    humiData = {
        "station_id": "garden_0001",
        "station_name": "Garden 0001",
        "gps_longitude": 106.89,
        "gps_latitude": 10.5,
        "sensors":[
            {
                "sensor_id": "humi_0001",
                "sensor_name": "Humidity",
                "sensor_value": 73.5 + i,
                "sensor_unit": "%"
            }
        ]
    }

    moisData = {
        "station_id": "garden_0001",
        "station_name": "Garden 0001",
        "gps_longitude": 106.89,
        "gps_latitude": 10.5,
        "sensors":[
            {
                "sensor_id": "mois_0001",
                "sensor_name": "Moisture",
                "sensor_value": 30 + i,
                "sensor_unit": "%"
            }
        ]
    }

    lightData = {
        "station_id": "garden_0001",
        "station_name": "Garden 0001",
        "gps_longitude": 106.89,
        "gps_latitude": 10.5,
        "sensors":[
            {
                "sensor_id": "light_0001",
                "sensor_name": "Light",
                "sensor_value": 112.3 + i,
                "sensor_unit": "lux"
            }
        ]
    }
    # Convert the JSON object to a JSON string
    json_tempData = json.dumps(tempData)
    json_humiData = json.dumps(humiData)
    json_moisData = json.dumps(moisData)
    json_lightData = json.dumps(lightData)

    # Publish the JSON data to the MQTT topic
    mqttClient.publish(MQTT_TOPIC_PUB[0], json_tempData, retain=True)
    print("Sending topic: ", MQTT_TOPIC_PUB[0], " Message: \n", json_tempData)
    mqttClient.publish(MQTT_TOPIC_PUB[1], json_humiData, retain=True)
    print("Sending topic: ", MQTT_TOPIC_PUB[1], " Message: \n", json_humiData)
    mqttClient.publish(MQTT_TOPIC_PUB[2], json_moisData, retain=True)
    print("Sending topic: ", MQTT_TOPIC_PUB[2], " Message: \n", json_moisData)
    mqttClient.publish(MQTT_TOPIC_PUB[3], json_lightData, retain=True)
    print("Sending topic: ", MQTT_TOPIC_PUB[3], " Message: \n", json_lightData)

    time.sleep(10)
    i+= 10