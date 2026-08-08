# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

| | |
|---|---|
| ชื่อ–นามสกุล | ณัฐวุฒิ จันทายา |
| รหัสนักศึกษา | 68543210009-5 |
| Section | SEC1 |

## URLs

| รายการ | ลิงก์ |
|---|---|
| Repository | https://github.com/Njuntaya/engse203-student-labs-685432100095/tree/labs/week-04/labs/week-04 |
| Pull Request | https://github.com/Njuntaya/engse203-student-labs-685432100095/pull/15 |
| GitHub Pages | https://njuntaya.github.io/engse203-student-labs-685432100095/labs/week-04/
 |

---

## Component Tree

```text
App  (state: requests, statusFilter)
│
├── AppHeader              — props: title, subtitle (stateless)
│
├── SummaryPanel            — props: summary (derived จาก requests ใน App)
│
├── RequestForm              — props: onAddRequest (callback → App)
│                               state ภายในตัวเอง: formData, errors, feedback
│
└── section.panel
    ├── FilterBar             — props: value (statusFilter), onFilterChange (callback → App)
    │
    └── RequestList           — props: requests (filteredRequests), onDeleteRequest (callback → App)
        └── RequestCard (map) — props: request, onDeleteRequest (callback ส่งต่อขึ้นไป App)
```

---

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

---

## State / Props / Callback Explanation

### State อยู่ที่ไหน

- **`requests`, `statusFilter`** → อยู่ที่ `App.jsx` เพราะหลาย component ต้องใช้ร่วมกัน
  - `SummaryPanel` เอาไปคำนวณสรุป
  - `RequestList` เอาไปกรอง/แสดงผล
- **`formData`, `errors`, `feedback`** → อยู่ใน `RequestForm.jsx` เพราะเป็นข้อมูลชั่วคราวตอนกรอกฟอร์ม ใช้แค่ในตัวมันเอง component อื่นไม่ต้องรู้ค่าระหว่างพิมพ์เลย

### Props ไหลลง (parent → child)

- `App` ส่ง `summary` ให้ `SummaryPanel`
- `App` ส่ง `statusFilter` ให้ `FilterBar`
- `App` ส่ง `filteredRequests` ให้ `RequestList` แล้วส่งต่อ `request` ให้ `RequestCard` อีกที

> `summary`/`filteredRequests` ไม่ใช่ state แยก แต่คำนวณสดจาก `requests`/`statusFilter` ทุกครั้งที่ `App` render ใหม่

### Callback ไหลกลับ (child → parent)

- `RequestForm` เรียก `onAddRequest`
- `FilterBar` เรียก `onFilterChange`
- `RequestCard` เรียก `onDeleteRequest` (ผ่าน `RequestList` ส่งต่อ)

ทั้งหมดกลับไปให้ `App` เป็นคนแก้ state จริงๆ เพราะ child เอง "แจ้ง" ขึ้นไปเฉยๆ ไม่มีสิทธิ์แก้ state ตรงๆ ทำให้ state มีแหล่งความจริงเดียว (single source of truth) ไม่มีทางที่หลาย component จะมีค่าขัดแย้งกัน

---

## Test Evidence

| Test ID | Actual Result | Evidence/Screenshot |
|---|---|---|
| TC-01 Initial | โหลดหน้าแรกแสดง 3 คำร้องเริ่มต้นจาก `initialRequests.js` (REQ-1001, REQ-1002, REQ-1003) และ Summary แสดง total=3, pending=1, inProgress=1, completed=1 ถูกต้อง | <img width="1918" height="1034" alt="Tc-01 Initial" src="https://github.com/user-attachments/assets/7fdced25-25b6-4738-93ac-4b240a260458" /> |
| TC-02 Controlled input | พิมพ์ในทุก field (requesterName, location, details) แล้วค่าปรากฏใน state ทันที (value ผูกกับ formData) — ต้องยืนยันด้วย React DevTools บนเบราว์เซอร์จริง | <img width="1913" height="1000" alt="TC-02 Controlled input" src="https://github.com/user-attachments/assets/adcb6340-a690-4351-bb9a-5a952d61e932" /> |
| TC-03 Invalid | Submit ฟอร์มเปล่า/ข้อมูลไม่ครบ → error message แสดงใต้แต่ละ field ตรงกับ `validateRequest()` (4 error: requesterName, requestType, location, details), ฟอร์มไม่ reset และไม่เพิ่มรายการใหม่ | <img width="1913" height="999" alt="TC-03 Invalid" src="https://github.com/user-attachments/assets/ed38b46b-67b1-428b-9fad-f28863022285" /> |
| TC-04 Valid add | กรอกครบและถูกต้อง → รายการใหม่ถูกเพิ่มเข้า list ด้วย object ใหม่ (immutable spread), status = "pending" เสมอ, ฟอร์ม reset กลับเป็นค่าเริ่มต้น, feedback ขึ้นข้อความ "เพิ่มคำร้องใหม่เรียบร้อยแล้ว" | <img width="1919" height="1035" alt="TC-04 Valid add" src="https://github.com/user-attachments/assets/eeed9ad4-f860-493f-9d23-dae2e44cb30c" /> |
| TC-05 Filter | คลิกปุ่มกรองสถานะ (เช่น "รอดำเนินการ") → RequestList แสดงเฉพาะ request ที่ status ตรงกัน | <img width="1919" height="989" alt="TC-05 Filter" src="https://github.com/user-attachments/assets/d6817ec3-a4b3-4e01-8553-21b731897312" /> |
| TC-06 All | คลิกปุ่ม "ทั้งหมด" → กลับมาแสดงครบทุก request อีกครั้ง ไม่มีรายการตกหล่น | <img width="1914" height="948" alt="TC-06 All" src="https://github.com/user-attachments/assets/2ec11c81-3bbc-40f6-ab4a-a8462c62c754" /> |
| TC-07 Empty | กรองสถานะที่ไม่มีข้อมูล → `filteredRequests.length = 0` แสดง empty state "ไม่มีคำร้องในสถานะนี้..." แทนลิสต์ว่างเปล่า | <img width="1911" height="956" alt="TC-07 Empty" src="https://github.com/user-attachments/assets/0d8d45ba-1cf2-4c08-8943-03d3d6d6f568" /> |
| TC-08 Delete | กดปุ่ม "ลบ" ที่การ์ด → ส่ง id ผ่าน callback, `filter()` เอาเฉพาะ id นั้นออก (array เดิมไม่ mutate), รายการหายไปจากลิสต์ทันที | <img width="1912" height="954" alt="TC-08 Delete" src="https://github.com/user-attachments/assets/5fa85972-ccba-4fb4-aba9-8c023d721ef2" /> |
| TC-09 Mobile | ทดสอบที่ 375px → เป็นหนึ่งคอลัมน์ ไม่มี horizontal scroll, ปุ่ม/ฟอร์มกดง่าย — ต้องทดสอบบนเบราว์เซอร์จริง (DevTools responsive mode) | <img width="503" height="938" alt="TC-09 Mobile" src="https://github.com/user-attachments/assets/ab94bb04-14e1-470a-bdd8-e0a617be1198" /> |
| TC-10 Keyboard | Tab ไล่ลำดับ field ได้ครบ, `:focus-visible` เห็นชัด (outline สีเหลือง), radio ใช้ลูกศรเลือกได้ — ต้องทดสอบบนเบราว์เซอร์จริง | <img width="1909" height="942" alt="TC-10 Keyboard" src="https://github.com/user-attachments/assets/4f2dd887-bfac-44da-93f6-f98ba827e6a2" /> |
| TC-11 Build | `npm run build` ผ่านจริง ไม่มี error/warning | <img width="1094" height="253" alt="TC-11 Build" src="https://github.com/user-attachments/assets/af320cb1-b415-4380-8e60-ce9bf7739bee" /> |
| TC-12 Pages | เปิด GitHub Pages URL ใน Incognito → หน้าเว็บโหลดและทำงานได้ครบ ไม่มี asset 404 — ยังไม่ได้ deploy ต้องทำหลัง push repo | <img width="1094" height="253" alt="Tc-12" src="https://github.com/user-attachments/assets/a556cd32-d22f-4ce5-9430-0cd0ee60ca4d" />


---

## Screenshots

- Desktop: `evidence/desktop.png`
  <img width="1918" height="1034" alt="Tc-01 Initial" src="https://github.com/user-attachments/assets/ddc4800d-5ff0-4607-a0d9-42964a1c9296" />

- Mobile 375px: `evidence/mobile-375.png`
  <img width="503" height="938" alt="TC-09 Mobile" src="https://github.com/user-attachments/assets/7eadd75f-1854-4b2c-92c5-bd6955efcaed" />

- Validation/empty state: TODO
  <img width="1913" height="999" alt="TC-03 Invalid" src="https://github.com/user-attachments/assets/9643050c-dc70-490d-9492-8cc6be8d9398" />


---

## Week 03 → Week 04 Reflection

### สิ่งที่รู้สึกต่างที่สุด: "ใครเป็นคนสั่งให้หน้าจอเปลี่ยน"

- **Week 03** — เราเป็นคนสั่งเองทุกครั้ง พอข้อมูลเปลี่ยน ต้องเขียนโค้ดไปหา element บนหน้าเว็บแล้วแก้ค่าให้ตรงกับข้อมูลใหม่ด้วยมือ เช่น เพิ่มคำร้องเสร็จก็ต้องเขียนโค้ดเพิ่มการ์ดใหม่เข้ารายการ แล้วยังต้องไปแก้ตัวเลขสรุปด้านบนเป็นอีกขั้นตอนหนึ่งแยกต่างหาก
- **Week 04 (React)** — เราแค่บอกว่า "ข้อมูลตอนนี้เป็นอะไร" ผ่าน `setRequests` แล้วปล่อยให้ React ไปจัดการเรื่องหน้าจอเองทั้งหมด ไม่ต้องมานั่งไล่ว่ามีกี่จุดที่ต้องอัปเดตตาม

### จุดที่เห็นชัดในโค้ดของตัวเอง

- `summary` กับ `filteredRequests` ใน `App.jsx` ไม่ได้เก็บเป็น state แยกเลย แต่คำนวณสดจาก `requests` ทุกครั้งที่ component render ใหม่
- ต่างจาก Week 03 มาก เพราะเมื่อก่อนถ้าจะโชว์ตัวเลขสรุปต้องมานั่งอัปเดตตัวแปรนับจำนวนแยกไปเรื่อยๆ เอง
- ตอนนี้แค่ `requests.filter(...)` ตอน render ก็ได้ค่าที่ถูกต้องเสมอ ไม่มีทางที่ตัวเลขสรุปกับรายการจริงจะไม่ตรงกันได้เลย เพราะมันมาจากข้อมูลชุดเดียวกัน

### ตอนทำฟอร์ม (RequestForm.jsx)

- **Week 03** — ตอน submit ต้องไปเขียนโค้ดอ่านค่าจาก input ทีละตัวและเช็คเองว่าค่าที่กรอกโอเคไหม
- **Week 04** — React ให้เราผูก `value` ของทุก field เข้ากับ `formData` ใน state ตรงๆ ตั้งแต่แรก แล้ว validate จาก state ก้อนเดียวผ่านฟังก์ชัน `validateRequests`
- ทำให้ error message ที่โชว์บนจอ (`errors.requesterName` เป็นต้น) ตรงกับสถานะจริงเสมอ ไม่ต้องกลัวว่า error ที่แสดงกับค่าที่กรอกจริงจะไม่ sync กัน

### สรุปโดยรวม

ข้อดีที่รู้สึกได้ชัดคือลดงาน "จำเอง" ลงไปเยอะมาก แต่ก็มีเรื่องใหม่ที่ต้องระวังแทน เช่น:

- ตอนทำ badge สถานะ/ความเร่งด่วน (LAB4-R12) ต้องคิดเรื่อง conditional rendering ให้ถูก (เช่น `request.priority === 'urgent' && ...`)
- ตอน list ว่างก็ต้องคิดเพิ่ม empty state เอง (LAB4-R11)

ซึ่งเป็นมุมที่ Week 03 ไม่ค่อยต้องคิดถึงเพราะเขียน DOM ตรงๆ อยู่แล้ว สรุปคือ Week 04 ทำให้โค้ดสั้นและเชื่อถือได้มากขึ้นในภาพรวม แต่ก็ต้องเปลี่ยนวิธีคิดจาก **"จะแก้ DOM ตรงไหน"** มาเป็น **"state ตอนนี้ควรเป็นอะไร แล้ว UI ควรหน้าตายังไงจากค่านั้น"**

---

## AI / External Resource Disclosure

**เครื่องมือที่ใช้:** Claude (Anthropic) โดยใช้ในบทบาทผู้ช่วยตรวจสอบโค้ด (code review) และอธิบายแนวคิดประกอบการเรียนรู้ มิได้ใช้เพื่อสร้างโค้ดทั้งไฟล์ตั้งแต่ต้น โค้ดทั้งหมดในงานชิ้นนี้เขียนขึ้นเองเป็นหลัก

### ลักษณะการใช้งาน

- เขียนโค้ดในแต่ละไฟล์ (`App.jsx`, `RequestForm.jsx` ฯลฯ) ด้วยตนเองก่อนทีละส่วนตาม TODO ที่ starter กำหนด แล้วจึงนำไปให้ตรวจสอบความถูกต้อง
- สอบถามเพื่อขอคำอธิบายแนวคิดที่ยังไม่เข้าใจ เช่น เหตุผลที่ state ต้องเป็น immutable, ความหมายของ controlled form, และหลักการพิจารณาว่า state ควรเป็นของ component ใด
- สอบถามเพื่อวิเคราะห์ปัญหาที่พบระหว่างพัฒนา เช่น กรณีที่ขอบสีแดงของ error ไม่แสดงผลครบทุก field และได้รับคำอธิบายสาเหตุในเชิง CSS specificity
- สอบถามเพื่อขอความช่วยเหลือในการวางโครงเอกสาร README (เช่น โครงสร้าง component และการอธิบาย state ownership)

### ตัวอย่างคำถาม/พรอมป์ที่ใช้

- "ตรวจโค้ดนี้ให้หน่อย" (แนบโค้ดที่เขียนเอง)
- "ทำไมพิมพ์ในฟอร์มแล้วไม่มีอะไรเกิดขึ้น"
- "อธิบายว่า LAB4-R05/R06/R07 ทำงานยังไง"

### ข้อเสนอแนะจาก AI ที่นำมาปรับใช้จริง

- แก้ไข typo/ข้อผิดพลาดที่ถูกชี้ให้เห็น เช่น `serState` → `useState`, `nextError` → `nextErrors`, `setError` → `setErrors`, `error.title` → `error.requesterName`
- เพิ่ม `value`/`onChange` ให้ครบทุก field ของฟอร์ม เพื่อให้เป็น controlled form อย่างสมบูรณ์ตามที่ได้รับการชี้แนะว่ายังขาดอยู่
- ปรับ `handleDeleteRequest` ให้ใช้เมธอด `filter()` เพื่อคงหลักการอัปเดต state แบบ immutable
