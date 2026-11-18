# Caller

Ứng dụng chat/gọi thoại/gọi video 1–1 WebRTC native, local-first, không PeerJS, không signaling server, không backend. GitHub Pages chỉ host HTML/CSS/JS và QR libraries được vendored.

## Sử dụng

1. Mở https://bdx0.github.io/caller/ trên hai thiết bị. Tài khoản ECDSA P-256 tự tạo và lưu trong trình duyệt.
2. A chọn Kết nối → Tạo QR. B chọn Quét QR, quét đủ các phần tự chuyển (hoặc dán toàn bộ chuỗi được sao chép). B tạo QR phản hồi; A quét hết QR phản hồi. Giữ cả hai app mở.
3. Khi DataChannel mở, gửi tin nhắn và gọi thoại/video. QR kết bạn chỉ ghi danh tính; không tự mở kết nối. Sau khi refresh, ngắt mạng hoặc đóng tab, cần trao đổi QR lại. Có thể trao đổi ảnh/mã qua kênh ngoài nếu ở xa.
4. Tài khoản → Mã đồng bộ tài khoản. Trên thiết bị mới chọn Khôi phục. Mã chứa khóa riêng: giữ bí mật. Để đồng bộ dữ liệu, hai thiết bị cùng danh tính chọn Đồng bộ dữ liệu và thực hiện offer/answer tương tự. Dữ liệu merge theo ID; không có cloud sync.

## Kiến trúc và giới hạn

- Native RTCPeerConnection, RTCDataChannel, media transceivers; non-trickle ICE, SDP ký bằng ECDSA và trao qua QR. QR là signaling thủ công, không có signaling server.
- Cloudflare và Google STUN mặc định, không TURN. Trong Kết nối → Chẩn đoán mạng, người dùng có thể kiểm tra ICE và nhập TURN URL/username/credential riêng nếu cần; không có signaling server. STUN không relay chat/video. NAT chặt, CGNAT hoặc firewall chặn UDP có thể không kết nối được. Có thể thử cùng Wi-Fi, cấp quyền mic (không phát âm thanh) hoặc TURN tương thích; TURN là relay tùy chọn và có thể có phí. Không có chi phí relay mặc định.
- Lịch sử và khóa riêng lưu localStorage theo account ID; bảo vệ thiết bị, sao lưu recovery code, không dùng máy công cộng. Recovery code không phải mật khẩu; người có code có thể giả danh. Xóa dữ liệu browser có thể mất lịch sử. Không phải ứng dụng đã kiểm toán bảo mật.
- Chat offline được xếp hàng cục bộ, gửi khi peer kết nối lại; không có push, cuộc gọi khi app đóng, định danh server hay tự tìm người online. PWA chỉ cache app shell.
- Chỉ có hai dependency cho xử lý QR: qrcode-generator 1.4.4 và jsQR 1.4.0, có mã nguồn cục bộ trong vendor/; không dùng thư viện WebRTC khác.

## Dev

GitHub Pages: Settings → Pages → GitHub Actions (workflow deploy.yml). HTTPS bắt buộc với WebRTC media và Web Crypto. Với máy local dùng python3 -m http.server 8000 và mở localhost.
