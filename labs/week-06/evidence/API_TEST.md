# API_TEST — LAB 06

**ชื่อ–รหัส:** ณัฐวุฒิ จันทายา (68543210009-5) **วันที่ทดสอบ:** 7/9/69

> บันทึก **ผลจริง** ที่เห็น ไม่ใช่ผลที่ควรได้ · ถ้าไม่ผ่านให้เขียนว่าไม่ผ่าน

| # | Method | Path | ส่งอะไร | status ที่ควรได้ | status ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|---|
| 1 | GET | `/` | — | 200 | 200 | ✅ |
| 2 | GET | `/api/requests` | — | 200 | 200 | ✅ |
| 3 | GET | `/api/requests/REQ-001` | — | 200 | 200 | ✅ |
| 4 | GET | `/api/requests/REQ-999` | — | 404 | 404 | ✅ |
| 5 | POST | `/api/requests` | ข้อมูลครบถูกต้อง | 201 |201 | ✅ |
| 6 | POST | `/api/requests` | `{"requesterName":"x"}` | 400 | 400| ✅ |
| 7 | DELETE | `/api/requests/REQ-003` | — | 204 | 204 | ✅ |
| 8 | DELETE | `/api/requests/REQ-999` | — | 404 |404 | ✅ |
| 9 | GET | `/api/unknown` | — | 404 |404 | ✅ |

## ⭐ Challenge (ถ้าทำ)

| # | Method | Path | status ที่ควรได้ | ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|
| 10 | GET | `/api/requests?status=pending` | 200 (กรองแล้ว) | ![statusfeild](image/statusfeild.png) | ✅ |
| 11 | PUT | `/api/requests/REQ-001` + `{"status":"in-progress"}` | 200 | ![PutnewStatus](image/PutnewStatus.png) | ✅ |
| 12 | PUT | `/api/requests/REQ-001` + `{"status":"ม้ว"}` | 400 | ![ErrorStatus](image/ErrorStatus.png) | ✅ |

## ทดสอบว่าข้อมูลอยู่ถาวร (CP08)

1 | POST เพิ่มคำร้องใหม่: Response ส่งสถานะ 201 Created พร้อมข้อมูล JSON ของคำร้องที่เพิ่งสร้างใหม่

2 | GET ดูรายการ — เห็นคำร้องใหม่ไหม: Response ส่งสถานะ 200 OK และพบรายการคำร้องใหม่ปรากฏอยู่ในรายการ JSON array

3 | Ctrl+C ปิดเซิร์ฟเวอร์ แล้วเปิดใหม่: เซิร์ฟเวอร์ถูกปิดการทำงานและเปิดใหม่อีกครั้งสำเร็จโดยไม่มีข้อผิดพลาด (ระบบโหลดข้อมูลจากไฟล์ data/requests.json เข้ามาใหม่)

4 | GET ดูรายการอีกครั้ง — คำร้องยังอยู่ไหม: Response ส่งสถานะ 200 OK และยังคงพบคำร้องที่สร้างไว้ก่อนปิดเซิร์ฟเวอร์ปรากฏอยู่ (ยืนยันว่าระบบบันทึกข้อมูลลงไฟล์ถาวรสำเร็จ)

## สรุปผล

- ผ่าน 9 / 9 (+ Challenge 3 / 3)
- รายการที่ไม่ผ่านและสาเหตุ:

## Screenshot ที่แนบ

- [x] `images/postman-get-200.png`
- [x] `images/postman-post-201.png`
- [x] `images/terminal-logger.png`
