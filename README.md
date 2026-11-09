# skill-hub-web
Code trang web công khai và skill mẫu miễn phí.

- `index.html`, `assets/`: trang tĩnh, không cần build. Chạy thử bằng `python -m http.server` hoặc bật GitHub Pages.
- `data/skills.js`: danh sách skill hiển thị. Sửa file này để thêm hoặc bớt.
- `skills/`: skill mẫu miễn phí (MIT).

## Nguồn và giấy phép
Các skill được liệt kê thuộc về tác giả gốc; trang chỉ trỏ tới kho của họ và ghi lại giấy phép. Xem giấy phép từng kho trước khi dùng lại.

## Nối với dịch vụ admin
Đặt địa chỉ dịch vụ `admin-api` (repo skill-hub-core) vào `assets/config.js`. Trang sẽ lấy danh sách skill do admin chọn từ `/public/skills`; nếu dịch vụ không chạy, trang dùng `data/skills.js`.
