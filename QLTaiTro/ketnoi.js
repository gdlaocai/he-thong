// --- CẤU HÌNH ĐƯỜNG DẪN HỆ THỐNG ---
const linkapi = "https://script.google.com/macros/s/AKfycbys1vRnTRAgGnJLAR1CRoHMs0APmGfALISRylysGv06AyLM9_fun7cQroRj7l5aaVum/exec"; 

// --- HÀM TRUYỀN TẢI DỮ LIỆU ĐỒNG BỘ ---
async function callServer(tenYeuCau, duLieuTai = {}) {
    duLieuTai.yeuCau = tenYeuCau;
    
    // Đính kèm chữ ký điện tử vào mọi gói tin gửi đi
    const chuKyHeThong = sessionStorage.getItem("HT_CHU_KY_SO");
    if (chuKyHeThong) {
        duLieuTai.chuKy = chuKyHeThong;
    }

    try {
        const phanHoi = await fetch(linkapi, {
            method: 'POST',
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(duLieuTai)
        });
        return await phanHoi.json();
    } catch (loiMang) {
        console.error("Lỗi đồng bộ:", loiMang);
        throw new Error("Mất kết nối với máy chủ hành chính. Đề nghị kiểm tra lại đường truyền mạng.");
    }
}