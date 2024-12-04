// Import các thư viện cần thiết
const supabase = require('../config/supabaseClient');

// Lấy thông tin tất cả thiết bị trong phòng theo `room_id`
const getArlamRoomid = async (req, res) => {
    const listGarden = await getAllArlamRoom();
    return res.status(200).json(listGarden);
    // return res.render('displayAllRooms.ejs', { listGarden: listGarden });
};
const getAllArlamRoom = async () => {
    const { data, error } = await supabase.from("room").select();
    if (error) {
      return error;
    }
    return data;
  };
// Hàm kiểm tra thời gian và cập nhật trạng thái nếu đúng
const checkTimeAndUpdateNote = async () => {
    const currentTime = new Date(); // Thời gian hiện tại

    try {
        // Lấy tất cả thiết bị chưa có note trong cơ sở dữ liệu
        const { data, error } = await supabase
            .from('device')
            .select('*')
            .is('Note', false); // Chỉ lấy các thiết bị chưa có giá trị trong `note`

        if (error) {
            console.error('Error fetching devices:', error.message);
            return;
        }

        let allDevicesUpdated = false;

        // Duyệt qua tất cả thiết bị và kiểm tra thời gian
        for (let device of data) {
            const timeNotice = new Date(device.time_notice); // Chuyển `time_notice` thành kiểu Date

            // Nếu thời gian hiện tại >= thời gian trong `time_notice`, cập nhật `note`
            if (currentTime >= timeNotice) {
                const { error } = await supabase
                    .from('device')
                    .update({ note: 'hehehhe' }) // Cập nhật giá trị cho `note`
                    .eq('id', device.id);

                if (error) {
                    console.error(`Error updating note for device ID ${device.id}:`, error.message);
                } else {
                    allDevicesUpdated = true;
                    console.log(`Device ID ${device.id} updated with note "hehehhe".`);
                }
            }
        }

        if (allDevicesUpdated) {
            console.log('Devices updated with "hehehhe" in note.');
        } else {
            console.log('No devices need to be updated yet.');
        }
    } catch (error) {
        console.error('Error checking time and updating notes:', error.message);
    }
};

module.exports = { getArlamRoomid, checkTimeAndUpdateNote };
