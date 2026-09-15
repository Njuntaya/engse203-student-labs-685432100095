# API_TEST — Campus Service Request API

สรุปการทดสอบ API ด้วย `node:test` และ `supertest` ตาม TODO W07-TEST (CP16)

---

## 1. ข้อมูลทั่วไป

| หัวข้อ | รายละเอียด |
|---|---|
| **ไฟล์ทดสอบ** | `tests/api.test.js` (ปรับตามตำแหน่งไฟล์จริง) |
| **เครื่องมือที่ใช้** | `node:test`, `node:assert/strict`, `supertest` |
| **จำนวนเคสทดสอบ** | 6 เคส |
| **คำสั่งรันทดสอบ** | `npm test` |
| **ผู้จัดทำ** | ณัฐวุฒิ จันทายา 68543210009-5 |
| **วันที่ทดสอบ** | 15/09/2026 |

---

## 2. รายการเคสทดสอบ

| # | เคส | Endpoint | คาดหวัง |
|---|---|---|---|
| 1 | GET รายการทั้งหมด | `GET /api/requests` | `200` และ body เป็น Array |
| 2 | GET รายการเดียว พบ | `GET /api/requests/REQ-001` | `200` และ `id` ตรงกับที่ขอ |
| 3 | GET รายการเดียว ไม่พบ | `GET /api/requests/REQ-999` | `404` และมี field `error` |
| 4 | POST ข้อมูลถูกต้อง | `POST /api/requests` | `201`, `status` เป็น `pending`, มี `id` |
| 5 | POST ข้อมูลไม่ครบ | `POST /api/requests` | `400` และมี field `error` |
| 6 | CORS header ตอบ origin ที่อนุญาต | `GET /api/requests` (ส่ง header `Origin`) | header `access-control-allow-origin` ตรงกับ origin ที่ส่งไป |

---

## 3. วิธีรันชุดทดสอบ

```bash
npm test
```

รันจาก root ของโปรเจกต์ฝั่ง API (โฟลเดอร์ที่มี `package.json` และสคริปต์ `test`)

---

## 4. ผลการรันทดสอบ

**สรุปผล**

| เคส | ผลลัพธ์ | Code | Terminal Output |
|---|:---:|---|---|
| 1. GET /api/requests → array | ✅  | ![เคส 1 code](APITEST_Picture/Code/test1%20code.jpg) | ![เคส 1 output](APITEST_Picture/Console/test1%20console.jpg) |
| 2. GET /api/requests/:id พบ → 200 | ✅ | ![เคส 2 code](APITEST_Picture/Code/test2%20code.jpg) | ![เคส 2 output](APITEST_Picture/Console/test3%20console.jpg) |
| 3. GET /api/requests/:id ไม่พบ → 404 | ✅ | ![เคส 3 code](APITEST_Picture/Code/test3%20code.jpg) | ![เคส 3 output](APITEST_Picture/Console/test4%20console.jpg) |
| 4. POST ถูกต้อง → 201 pending | ✅ | ![เคส 4 code](APITEST_Picture/Code/test4%20code.jpg) | ![เคส 4 output](APITEST_Picture/Console/test5%20console.jpg) |
| 5. POST ไม่ครบ → 400 | ✅  | ![เคส 5 code](APITEST_Picture/Code/test5%20code.jpg) | ![เคส 5 output](APITEST_Picture/Console/test6%20console.jpg) |
| 6. CORS header ตรงกับ origin | ✅ | ![เคส 6 code](APITEST_Picture/Code/testALL%20Code.jpg) | ![เคส 6 output](APITEST_Picture/Console/testALL%20console.jpg) |

**จำนวนเคสที่ผ่าน:** 6 / 6

---

## 5. หมายเหตุ

- ก่อนรันทดสอบ ต้องแน่ใจว่าไม่มีกระบวนการอื่นถือ port ของ API อยู่ (เช่น `npm run dev` ที่เปิดค้างไว้) เพราะการทดสอบสร้างแอปขึ้นมาใหม่ผ่าน `createApp()` โดยตรง ไม่ได้เรียกผ่าน HTTP server ที่รันอยู่
- เคสที่ 2 อ้างอิง `REQ-001` และเคสที่ 3 อ้างอิง `REQ-999` — ต้องแน่ใจว่าข้อมูล seed (`loadSeed()`) มี `REQ-001` อยู่จริง และไม่มี `REQ-999`