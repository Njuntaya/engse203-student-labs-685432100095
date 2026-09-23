# 🤖 AI Usage Declaration

เอกสารชี้แจงการใช้งาน AI ในการพัฒนาโปรเจกต์นี้

---

## เครื่องมือที่ใช้

### Gemini (Google AI)

ช่วยวิเคราะห์โค้ด ปรับแต่งการตั้งค่า และแก้ปัญหา Deployment

**ขอบเขตการใช้งาน**

- **Backend Config & Deployment** — ช่วยตรวจสอบการตั้งค่า Environment Variables (`.env`), การจัดการ Dynamic Port และกำหนด Root Directory / Build Command บน Render
- **Frontend API Integration** — ช่วยแนะนำการรับค่า `VITE_API_BASE_URL` ใน `apiClient.js` เพื่อให้เชื่อมต่อ API ระหว่าง GitHub Pages และ Render ได้ถูกต้อง
- **CORS Setup** — ช่วยกำหนดและแก้ไขปัญหา Cross-Origin (CORS) ระหว่าง Frontend และ Backend บน Production

### Claude (Anthropic)

ช่วยจัดทำและจัดรูปแบบเอกสารประกอบโปรเจกต์

**ขอบเขตการใช้งาน**

- **Database Documentation** — ช่วยเขียนและจัดรูปแบบ `README.md` / `DATA_MODEL.md` อธิบายโครงสร้างตาราง `users` และ `requests` ความสัมพันธ์ระหว่างตาราง และเหตุผลของการเลือกชนิดข้อมูล/ข้อกำหนด (Constraints)
- **Test Evidence Documentation** — ช่วยจัดรูปแบบ `DB_EVIDENCE.md` รวบรวมผลการทดสอบ Constraint ทั้ง 5 เคส พร้อมแนบคำสั่ง SQL และรูปภาพผลลัพธ์จาก Terminal
- **API Contract Documentation** — ช่วยจัดรูปแบบ `API_CONTRACT.md` ให้อ่านง่ายขึ้น (จัดตาราง endpoint, ใส่ code block ให้ตัวอย่างคำสั่ง curl/HTTP, แก้ไขตาราง Changelog ที่โครงสร้างผิดพลาด)


---