const supabase = require("../config/supabaseClient");

const getAllRoom = async () => {
  const { data, error } = await supabase.from("room").select();
  if (error) {
    return error;
  }
  return data;
};
const ArlamInfo = async () => {
  const { data, error } = await supabase.from("schedule").select("*");
  if (error) {
    return error;
  }
  return data;
}

const getScheduledTasks = async () => {
  const { data, error } = await supabase
    .from("schedule")
    .select("*")
    .order("time", { ascending: true });

  if (error) {
    console.error('Error fetching scheduled tasks:', error);
    return null;
  }

  const currentTime = new Date();

  const upcomingTasks = data.filter(task => {
    const taskTime = new Date(task.time);
    return taskTime > currentTime;
  });

  return upcomingTasks;
};
const deletePastTasks = async () => {
  const currentTime = new Date();

  const { data, error } = await supabase
    .from("schedule")
    .select("*");

  if (error) {
    console.error('Error fetching scheduled tasks:', error);
    return null;
  }

  const pastTasks = data.filter(task => new Date(task.time) <= currentTime);

  if (pastTasks.length > 0) {
    const { error: deleteError } = await supabase
      .from("schedule")
      .delete()
      .in("id", pastTasks.map(task => task.id));

    if (deleteError) {
      console.error('Error deleting past tasks:', deleteError);
      return null;
    }
  }

  return pastTasks.length;
};

const ArlamInfoforroom = async (room_id) => {
  const { data, error } = await supabase
    .from("schedule")
    .select()
    .eq("name", room_id)
    .eq('note', 'FAlSE')
    ;
  if (error) {
    return error;
  }
  return data;
}
const getActionArlam = async (room_id) => {
  const { data, error } = await supabase
    .from("schedule")
    .select("name,device,status,time")
    .limit(1)
    // .eq("sensor.room_id", room_id)
    // .like("sensor_id", "%temp%")  
    .eq("name", room_id)
    .order("time", { ascending: true });
  if (error) {
    return error;
  }
  return data;
};
const getNumLightActive = async () => {
  const { data, error } = await supabase
    .from('device')
    .select('*', { count: 'exact' })
    .eq('status', 'ON')
    .eq('note', 'light');

  if (error) {
    console.error('Error fetching device count:', error);
    return null;
  }
  return data;
};

const getNumFanActive = async () => {
  const { data, error } = await supabase
    .from('device')
    .select('*', { count: 'exact' })
    .eq('status', 'ON')
    .eq('note', 'fan');

  if (error) {
    console.error('Error fetching device count:', error);
    return null;
  }

  // Data will contain the count of devices where status is 'ON'
  return data;
};

const getRoomById = async (room_id) => {
  const { data, error } = await supabase
    .from("room")
    .select()
    .eq("id", room_id);
  if (error) {
    return error;
  }
  return data;
};

const getLastTemperature = async (room_id) => {
  const { data, error } = await supabase
    .from("temp_value")
    .select("created_at, room_id, value, unit")
    .limit(1)
    // .eq("sensor.room_id", room_id)
    // .like("sensor_id", "%temp%")
    .order("created_at", { ascending: false });
  if (error) {
    return error;
  }
  return data;
};

const getLastHumidity = async (room_id) => {
  const { data, error } = await supabase
    .from("humi_value")
    .select("created_at, room_id, value, unit")
    .limit(1)
    // .eq("sensor.room_id", room_id)
    // .like("sensor_id", "%humi%")
    .order("created_at", { ascending: false });
  if (error) {
    return error;
  }
  return data;
};

const getLastLight = async (room_id) => {
  const { data, error } = await supabase
    .from("light_value")
    .select("created_at, room_id, value, unit")
    .limit(1)
    // .eq("sensor.room_id", room_id)
    // .like("sensor_id", "%light%")
    .order("created_at", { ascending: false });
  if (error) {
    return error;
  }
  return data;
};


module.exports = {
  getAllRoom,
  getRoomById,
  getLastTemperature,
  getLastHumidity,
  getLastLight,
  getNumLightActive,
  getNumFanActive,
  ArlamInfo,
  ArlamInfoforroom,
  getScheduledTasks,
  deletePastTasks
};
