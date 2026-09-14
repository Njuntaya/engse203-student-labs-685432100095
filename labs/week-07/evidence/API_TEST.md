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
| 1. GET /api/requests → array | ✅ / ❌ | ![เคส 1 code](แทรก-path-รูปที่นี่) | ![เคส 1 output](แทรก-path-รูปที่นี่) |
| 2. GET /api/requests/:id พบ → 200 | ✅ / ❌ | ![เคส 2 code](แทรก-path-รูปที่นี่) | ![เคส 2 output](แทรก-path-รูปที่นี่) |
| 3. GET /api/requests/:id ไม่พบ → 404 | ✅ / ❌ | ![เคส 3 code](แทรก-path-รูปที่นี่) | ![เคส 3 output](แทรก-path-รูปที่นี่) |
| 4. POST ถูกต้อง → 201 pending | ✅ / ❌ | ![เคส 4 code](แทรก-path-รูปที่นี่) | ![เคส 4 output](แทรก-path-รูปที่นี่) |
| 5. POST ไม่ครบ → 400 | ✅ / ❌ | ![เคส 5 code](แทรก-path-รูปที่นี่) | ![เคส 5 output](แทรก-path-รูปที่นี่) |
| 6. CORS header ตรงกับ origin | ✅ / ❌ | ![เคส 6 code](แทรก-path-รูปที่นี่) | ![เคส 6 output](แทรก-path-รูปที่นี่) |

**จำนวนเคสที่ผ่าน:** __ / 6

---

## 5. หมายเหตุ

- ก่อนรันทดสอบ ต้องแน่ใจว่าไม่มีกระบวนการอื่นถือ port ของ API อยู่ (เช่น `npm run dev` ที่เปิดค้างไว้) เพราะการทดสอบสร้างแอปขึ้นมาใหม่ผ่าน `createApp()` โดยตรง ไม่ได้เรียกผ่าน HTTP server ที่รันอยู่
- เคสที่ 2 อ้างอิง `REQ-001` และเคสที่ 3 อ้างอิง `REQ-999` — ต้องแน่ใจว่าข้อมูล seed (`loadSeed()`) มี `REQ-001` อยู่จริง และไม่มี `REQ-999`