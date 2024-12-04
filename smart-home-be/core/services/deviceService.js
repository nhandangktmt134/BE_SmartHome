const supabase = require('../config/supabaseClient');

const getAllDeviceByGardenId = async (room_id) => {
    const { data, error } = await supabase
        .from('device')
        .select()
        .eq('room_id', room_id)
        .order('name')
    if (error) {
        return error;
    }
    return data;
}

const updateDeviceStatus = async (room_id, name, status) => {
    const statusValue = status === 0 ? 'OFF' : 'ON';
    const { error } = await supabase
        .from('device')
        .update({ status: statusValue })
        .eq('name', name)
        .eq('room_id', room_id);

    if (error) {
        console.error('Error updating device status:', error);
        return false;
    }
    return true;
};

const updateLightStatus = async (status) => {
    const statusValue = status === 0 ? 'OFF' : 'ON';
    const { error } = await supabase
        .from('device')
        .update({ status: statusValue })
        .eq('note', 'light');
    if (error) {
        console.error('Error updating device status:', error);
        return false;
    }
    return true;
};

const updateFanStatus = async (status) => {
    const statusValue = status === 0 ? 'OFF' : 'ON';
    const { error } = await supabase
        .from('device')
        .update({ status: statusValue })
        .eq('note', 'fan');
    if (error) {
        console.error('Error updating device status:', error);
        return false;
    }
    return true;
};

const getDeviceSchedule = async (device_id) => {
    const { data, error } = await supabase
        .from('device_schedule')
        .select()
        .eq('device_id', device_id)
    if (error) {
        return error;
    }
    return data
}

const updateDeviceSchedule = async (device_id, time_on, time_off, notification, repeat) => {
    const { error } = await supabase
        .from('device_schedule')
        .upsert({
            device_id: device_id,
            time_on: time_on,
            time_off: time_off,
            notification: notification,
            repeat: repeat
        })
        .eq('device_id', device_id)
}

module.exports = {
    updateDeviceStatus,
    getAllDeviceByGardenId,
    getDeviceSchedule,
    updateDeviceSchedule,
    updateLightStatus,
    updateFanStatus,
}