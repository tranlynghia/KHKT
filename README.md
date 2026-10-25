# Cố Vấn Học Đường AI — Trường PTDTNT THCS & THPT Phước Sơn 🏫

Hệ thống trợ lý học đường thông minh hỗ trợ giải đáp quy chế, nội quy, thang 200 điểm thi đua nề nếp và quy định nội trú của **Trường Phổ thông Dân tộc Nội trú THCS & THPT Phước Sơn** (Áp dụng năm học 2026 - 2027 theo Hướng dẫn số 18/HD-DTNTPS).

---

## ✨ Điểm Nổi Bật

- **Phong Cách Bảng Phấn Xanh Tối Giản (School Chalkboard UI)**: Thiết kế giao diện bảng phấn chân thực, viền gỗ mộc, bụi phấn mờ ảo diệu.
- **Hệ Thống 6 Chủ Đề Lễ Hội Toàn Diện**:
  1. 🍂 **Mùa Thu Tựu Trường**: Lá phong, lá bạch quả, lá sồi rơi lượn trên nền bảng phấn truyền thống.
  2. 🎄 **Giáng Sinh (Noel)**: Bông tuyết pha lê, hoa tuyết 8 cánh, tông đỏ ấm áp và an lành.
  3. 🎃 **Lễ Hội Halloween**: Dơi đêm, bí ngô phát sáng Jack-o-Lantern, nhện tím ma mị.
  4. 🧧 **Tết Cổ Truyền (Xuân 2027)**: Mưa hoa đào hồng thắm, hoa mai vàng, bao lì xì đỏ may mắn.
  5. 🎆 **Happy New Year (2027)**: Kim tuyến confetti, sao vàng lấp lánh và pháo hoa rực rỡ.
  6. 🏮 **Tết Trung Thu**: Đèn ông sao truyền thống, lồng đèn giấy xếp, vầng trăng rằm tháng Tám.
- **Hiệu Ứng Tương Tác Đồng Bộ (Interactive Effects)**:
  - Khi đổi chủ đề, mọi hiệu ứng lia chuột (hover), nhấp chuột xúc giác (active tactile feedback), màu sắc bong bóng tin nhắn, biểu tượng trường (emblem) và huy hiệu trạng thái đều tự động chuyển đổi theo mùa.
  - Động cơ vật lý hạt GSAP mượt mà, tối ưu hiệu năng 60 FPS.
- **Hỏi Đáp Thông Minh Đa Tài Liệu**:
  - Tự động nạp và lập chỉ mục nhanh văn bản Word (`.docx`), PDF (`.pdf`), Text (`.txt`).
  - Hỗ trợ giọng đọc cố vấn học đường (Text-to-Speech) và hỏi nhanh bằng giọng nói tiếng Việt.
  - Sổ tay nề nếp tra cứu nhanh khung điểm số đầu bài, trực nhật, KTX.

---

## 🚀 Cài Đặt & Khởi Chạy

### 1. Yêu cầu môi trường
- Python 3.10 trở lên.
- Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

### 2. Cấu hình Gemini API Key
Sao chép file `.env.example` thành `.env` và điền khóa API của bạn:

```bash
cp .env.example .env
```

Mở `.env` và thêm:
```env
GEMINI_API_KEY="your_api_key_here"
```

### 3. Chạy ứng dụng
Khởi chạy máy chủ:

```bash
python app.py
```

Truy cập hệ thống tại: **[http://localhost:8080](http://localhost:8080)**

---

## 📂 Cấu Trúc Dự Án

```text
├── app.py                 # Máy chủ Flask & xử lý ngữ cảnh Gemini AI
├── requirements.txt       # Danh sách gói phụ thuộc
├── .env.example           # Mẫu file cấu hình môi trường
├── data/                  # Thư mục chứa văn bản quy định (.docx, .pdf, .txt)
├── static/
│   ├── css/
│   │   └── style.css      # Hệ thống thiết kế Chalkboard UI & 6 chủ đề lễ hội
│   └── js/
│       ├── leaves.js      # HolidayParticlesEngine điều khiển hiệu ứng hạt GSAP
│       └── main.js        # Logic vấn đáp, âm thanh, giọng nói & drawer
└── templates/
    └── index.html         # Giao diện chính của cố vấn học đường
```

---

## 📜 Bản Quyền & Giấy Phép
Dự án được xây dựng phục vụ nghiên cứu Khoa học Kỹ thuật (KHKT) và ứng dụng thực tiễn tại **Trường PTDTNT THCS & THPT Phước Sơn**.
