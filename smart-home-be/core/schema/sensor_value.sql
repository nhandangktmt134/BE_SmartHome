CREATE TABLE sensors.sensor_value
(
    sensor_id  VARCHAR(20) NOT NULL,
    sensor_name VARCHAR(50),
    value      FLOAT       NOT NULL,
    unit       VARCHAR(20),
    created_at TIMESTAMP,
    PRIMARY KEY (sensor_id, created_at)
);