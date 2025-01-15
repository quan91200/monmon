import { useEffect } from 'react'
import MagicSnowflakes from 'magic-snowflakes'

const SnowfallEffect = () => {
    useEffect(() => {
        const snowEffectEnabled = localStorage.getItem('snowEffect') === 'true'

        // Nếu tuyết được bật, khởi tạo tuyết
        if (snowEffectEnabled) {
            const snowflakes = new MagicSnowflakes({
                count: 50,            // Số lượng tuyết
                color: '#ADD8E6',      // Màu tuyết
                speed: 1,            // Tốc độ rơi
                size: 10,            // Kích thước tuyết
                zIndex: 1000,        // Đặt độ ưu tiên của tuyết
            })

            snowflakes.start() // Bắt đầu rơi tuyết

            // Khi component bị unmount hoặc khi người dùng tắt tuyết, dừng tuyết
            return () => {
                snowflakes.stop() // Dừng tuyết khi không cần thiết
            }
        }

        // Nếu tuyết không được bật, chắc chắn rằng tuyết không còn hiển thị trên màn hình
        return () => {
            // Bạn có thể xóa hiệu ứng tuyết hoặc đảm bảo tuyết không còn hiện diện
            document.querySelectorAll('.magic-snowflakes').forEach((element) => {
                element.remove() // Xóa mọi bông tuyết đang hiển thị
            })
        }
    }, [])

    return null
}

export default SnowfallEffect