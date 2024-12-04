const supabase = require("../config/supabaseClient");

const getHumiData = async (room_id) => {
  const { data, error } = await supabase
    .from("humi_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .order('created_at', { ascending: false })
    // .like("sensor_id", "%humi%");
  if (error) {
    return error;
  }
  return data;
};

const getHumibyDate = async (room_id, date) => {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  const { data, error } = await supabase
    .from("humi_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .gte("created_at", startOfDay.toISOString()) // Greater than or equal to start of the day
    .lte("created_at", endOfDay.toISOString()) // 
    .order('created_at', { ascending: false })
    if (error) {
      return error;
    }
    return data;
}

const getTempData = async (room_id) => {
  const { data, error } = await supabase
    .from("temp_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .order('created_at', { ascending: false })
  if (error) {
    return error;
  }
  return data;
};

const getTempbyDate = async (room_id, date) => {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  const { data, error } = await supabase
    .from("temp_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .gte("created_at", startOfDay.toISOString()) // Greater than or equal to start of the day
    .lte("created_at", endOfDay.toISOString()) // 
    .order('created_at', { ascending: false })
    if (error) {
      return error;
    }
    return data;
}

const getMoisData = async (room_id) => {
  const { data, error } = await supabase
    .from("moisture_data")
    .select("created_at, , value, unit")
    .eq("room_id", room_id)
    .order('created_at', { ascending: false })
  if (error) {
    return error;
  }
  return data;
};

const getLightData = async (room_id) => {
  const { data, error } = await supabase
    .from("light_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .order('created_at', { ascending: false })
  if (error) {
    return error;
  }
  return data;
};

const getLightbyDate = async (room_id, date) => {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  const { data, error } = await supabase
    .from("light_value")
    .select("created_at, value, unit")
    .eq("room_id", room_id)
    .gte("created_at", startOfDay.toISOString()) // Greater than or equal to start of the day
    .lte("created_at", endOfDay.toISOString()) // 
    .order('created_at', { ascending: false })
    if (error) {
      return error;
    }
    return data;
}

const insertToHumidityTable = async (data) => {
  const { error } = await supabase.from("humi_value").insert({
    created_at: new Date().toISOString(),
    // sensor_id: data.sensors[0].sensor_id,
    room_id: data.room.id,
    value: data.sensors.sensor_humi,
    // unit: data.sensors[0].sensor_unit,
  });
  if (error) {
    console.log(error);
    return error;
  } 
  // else {
  //   console.log("Inserted into Humi Table");
  // }
  return 1;
};

const insertToTemperatureTable = async (data) => {
  const { error } = await supabase.from("temp_value").insert({
    created_at: new Date().toISOString(),
    // sensor_id: data.sensors[0].sensor_id,
    room_id: data.room.id,
    value: data.sensors.sensor_temp,
    // unit: data.sensors[0].sensor_unit,
  });
  if (error) {
    console.log(error);
    return error;
  } 
  // else {
  //   console.log("Inserted into Temp Table");
  // }
  return 1;
};

const insertToLightTable = async (data) => {
  const { error } = await supabase.from("light_value").insert({
    created_at: new Date().toISOString(),
    // sensor_id: data.sensors[0].sensor_id,
    room_id: data.room.id,
    value: data.sensors.sensor_light,
    // unit: data.sensors[0].sensor_unit,
  });

  if (error) {
    console.log(error);
    return error;
  } 
  // else {
  //   console.log("Inserted into Light Table");
  // }
  return 1;
};

const insertDevice1 = async (data) => {
  const {error} = await supabase
    .from("device")
    .update({status: data.device.relay1})
    .eq("room_id", data.room.id)
    .eq("name", 'device_0001');
  if (error) {
    console.log(error);
    return error;
  } 
    else {
    // console.log("Update into Device Table", data.room.id);
    // console.log(data.room.id);
  }
  return 1;
};

const insertDevice2 = async (data) => {
  const {error} = await supabase
  .from("device")
  .update({
    status: data.device.relay2,
  })
  .eq("room_id", data.room.id)
  .eq("name", 'device_0002');
if (error) {
  console.log(error);
  return error;
} 
  else {
  // console.log("Update into Device Table", data.room.id);
  // console.log(data.room.id);
}
return 1;
};

const insertDevice3 = async (data) => {
  const {error} = await supabase
  .from("device")
  .update({
    status: data.device.relay3,
  })
  .eq("room_id", data.room.id)
  .eq("name", 'device_0003');
if (error) {
  console.log(error);
  return error;
} 
  else {
  // console.log("Update into Device Table", data.room.id);
  // console.log(data.room.id);
}
return 1;
};

const insertDevice4 = async (data) => {
  const {error} = await supabase
  .from("device")
  .update({
    status: data.device.relay4,
  })
  .eq("room_id", data.room.id)
  .eq("name", 'device_0004');
if (error) {
  console.log(error);
  return error;
} 
  else {
  // console.log("Update into Device Table", data.room.id);
  // console.log(data.room.id);
}
return 1;
};


module.exports = {
  getHumiData,
  getTempData,
  getMoisData,
  getLightData,
  insertToTemperatureTable,
  insertToHumidityTable,
  insertToLightTable,
  insertDevice4,
  insertDevice3,
  insertDevice2,
  insertDevice1,
  getHumibyDate,
  getTempbyDate,
  getLightbyDate,
};
