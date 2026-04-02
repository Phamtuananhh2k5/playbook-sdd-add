# PLAYBOOK SDD ADD & CODEX

Static site chứa slide theo từng chapter, deploy bằng GitHub Pages với domain `https://linhndm.io.vn`.

## Cấu trúc gọn hiện tại

- `index.html`: trang chủ, danh sách chapter.
- `1/` ... `14/`: mỗi thư mục chapter chứa `index.html`.
- `9_codex/`, `11_codex/`: phiên bản codex.
- `CNAME`: custom domain cho GitHub Pages.

## Link chạy thật

- Trang chủ: `https://linhndm.io.vn/`
- Chapter: `https://linhndm.io.vn/1/` ... `https://linhndm.io.vn/14/`
- Codex:
  - `https://linhndm.io.vn/9_codex/`
  - `https://linhndm.io.vn/11_codex/`

## Cách cập nhật nội dung

1. Sửa file `index.html` của chapter cần cập nhật.
2. Nếu thêm chapter mới, tạo thư mục mới `<so_chapter>/index.html`.
3. Cập nhật link ở `index.html` (trang chủ).
4. Commit + push lên `main`.

## Deploy

- GitHub Pages tự build từ nhánh `main`.
- Nếu chưa thấy thay đổi ngay trên web, chờ 1-5 phút rồi hard refresh (`Ctrl+F5`).
