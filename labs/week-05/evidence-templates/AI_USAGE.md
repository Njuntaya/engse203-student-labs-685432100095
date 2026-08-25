# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Claude (AI assistant) | ตรวจสอบ logic ที่ขาดหายใน `readStoredRequests` (schemaVersion, ID ซ้ำ) | `requestStorage.js` | source review / runtime test |
| Claude (AI assistant) | หาจุดผิด syntax ใน `createRequestId` (ลืม backtick template literal) | `requestService.js` | source review / runtime test |
| Claude (AI assistant) | อธิบายการทำงานของ `useState` | ไม่เกี่ยวข้องกับไฟล์เฉพาะ (ความเข้าใจทั่วไป) | source review |
| Claude (AI assistant) | ช่วยจัดรูปแบบตาราง Markdown | `TEST_REPORT.md` | source review |

**คำรับรอง:**
- [ ] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [ ] ตรวจ source และรัน test ด้วยตนเอง
- [ ] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้