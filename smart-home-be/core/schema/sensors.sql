DROP TABLE IF EXISTS sensors;
CREATE TABLE sensors(
    sensor_id VARCHAR(20),
    sensor_name VARCHAR(20),
    sensor_value FLOAT,
    sensor_unit VARCHAR(20)
);
SELECT * FROM sensors;