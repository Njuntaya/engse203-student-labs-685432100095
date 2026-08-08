# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: ณัฐวุฒิ จันทายา
- รหัสนักศึกษา: 68543210009-5
- Section: SEC1

## URLs

- Repository: TODO
- Pull Request: TODO
- GitHub Pages: TODO

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

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

State อยู่ที่ไหน — requests กับ statusFilter อยู่ที่ App.jsx เพราะหลาย component ต้องใช้ร่วมกัน (เช่น SummaryPanel เอาไปคำนวณสรุป, RequestList เอาไปกรอง/แสดงผล) ส่วน formData/errors/feedback อยู่ใน RequestForm.jsx เพราะเป็นข้อมูลชั่วคราวตอนกรอกฟอร์ม ใช้แค่ในตัวมันเอง component อื่นไม่ต้องรู้ค่าระหว่างพิมพ์เลย

Props ไหลลง — App ส่ง summary ให้ SummaryPanel, ส่ง statusFilter ให้ FilterBar, ส่ง filteredRequests ให้ RequestList แล้วส่งต่อ request ให้ RequestCard อีกที โดย summary/ filteredRequests ไม่ใช่ state แยก แต่คำนวณสดจาก requests/ statusFilter ทุกครั้งที่ App render ใหม่

Callback ไหลกลับ — RequestForm เรียก onAddRequest, FilterBar เรียก onFilterChange, RequestCard เรียก onDeleteRequest (ผ่าน RequestList ส่งต่อ) กลับไปให้ App เป็นคนแก้ state จริง ๆ เพราะ child เอง "แจ้ง" ขึ้นไปเฉย ๆ ไม่มีสิทธิ์แก้ state ตรง ๆ ทำให้ state มีแหล่ง ความจริงเดียว (single source of truth) ไม่มีทางที่หลาย component จะมีค่า ขัดแย้งกัน

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | โหลดหน้าแรกแสดง 3 คำร้องเริ่มต้นจาก initialRequests.js (REQ-1001, REQ-1002, REQ-1003) และ Summary แสดง total=3, pending=1, inProgress=1, completed=1 ถูกต้อง | TODO | TODO |
| TC-02 Controlled input | พิมพ์ในทุก field (requesterName, location, details) แล้วค่าปรากฏใน state ทันที (value ผูกกับ formData) — ต้องยืนยันด้วย React DevTools บนเบราว์เซอร์จริง | TODO | TODO |
| TC-03 Invalid | Submit ฟอร์มเปล่า/ข้อมูลไม่ครบ → error message แสดงใต้แต่ละ field ตรงกับ validateRequest() (4 error: requesterName, requestType, location, details), ฟอร์มไม่ reset และไม่เพิ่มรายการใหม่ | TODO | TODO |
| TC-04 Valid add | กรอกครบและถูกต้อง → รายการใหม่ถูกเพิ่มเข้า list ด้วย object ใหม่ (immutable spread), status = "pending" เสมอ, ฟอร์ม reset กลับเป็นค่าเริ่มต้น, feedback ขึ้นข้อความ "เพิ่มคำร้องใหม่เรียบร้อยแล้ว" | TODO | TODO |
| TC-05 Filter | คลิกปุ่มกรองสถานะ (เช่น "รอดำเนินการ") → RequestList แสดงเฉพาะ request ที่ status ตรงกัน | TODO | TODO |
| TC-06 All | คลิกปุ่ม "ทั้งหมด" → กลับมาแสดงครบทุก request อีกครั้ง ไม่มีรายการตกหล่น | TODO | TODO |
| TC-07 Empty | กรองสถานะที่ไม่มีข้อมูล → filteredRequests.length = 0 แสดง empty state "ไม่มีคำร้องในสถานะนี้..." แทนลิสต์ว่างเปล่า | TODO | TODO |
| TC-08 Delete | กดปุ่ม "ลบ" ที่การ์ด → ส่ง id ผ่าน callback, filter() เอาเฉพาะ id นั้นออก (array เดิมไม่ mutate), รายการหายไปจากลิสต์ทันที  | TODO | TODO |
| TC-09 Mobile | ทดสอบที่ 375px → เป็นหนึ่งคอลัมน์ ไม่มี horizontal scroll, ปุ่ม/ฟอร์มกดง่าย — ต้องทดสอบบนเบราว์เซอร์จริง (DevTools responsive mode) | TODO | TODO |
| TC-10 Keyboard | Tab ไล่ลำดับ field ได้ครบ, :focus-visible เห็นชัด (outline สีเหลือง), radio ใช้ลูกศรเลือกได้ — ต้องทดสอบบนเบราว์เซอร์จริง| TODO | TODO |
| TC-11 Build | npm run build ผ่านจริง ไม่มี error/warning | TODO | TODO |
| TC-12 Pages | เปิด GitHub Pages URL ใน Incognito → หน้าเว็บโหลดและทำงานได้ครบ ไม่มี asset 404 — ยังไม่ได้ deploy ต้องทำหลัง push repo | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

สิ่งที่รู้สึกต่างที่สุดระหว่างสองสัปดาห์คือ "ใครเป็นคนสั่งให้หน้าจอเปลี่ยน" Week 03 เราเป็นคนสั่งเองทุกครั้ง คือพอข้อมูลเปลี่ยน ต้องเขียนโค้ดไปหา element บนหน้าเว็บแล้วแก้ค่าให้ตรงกับข้อมูลใหม่ด้วยมือ เช่น เพิ่มคำร้องเสร็จก็ต้อง เขียนโค้ดเพิ่มการ์ดใหม่เข้ารายการ แล้วยังต้องไปแก้ตัวเลขสรุปด้านบนเป็นอีกขั้น ตอนหนึ่งแยกต่างหาก พอมาทำ Week 04 ด้วย React กลายเป็นว่าเราแค่บอกว่า "ข้อมูล ตอนนี้เป็นอะไร" ผ่าน setRequests แล้วปล่อยให้ React ไปจัดการเรื่องหน้าจอเอง ทั้งหมด ไม่ต้องมานั่งไล่ว่ามีกี่จุดที่ต้องอัปเดตตาม

จุดที่เห็นชัดในโค้ดของตัวเองคือ summary กับ filteredRequests ใน App.jsx ไม่ได้เก็บเป็น state แยกเลย แต่คำนวณสดจาก requests ทุกครั้งที่ component render ใหม่ ตรงนี้ต่างจาก Week 03 มากเพราะเมื่อก่อนถ้าจะโชว์ตัวเลขสรุปต้อง มานั่งอัปเดตตัวแปรนับจำนวนแยกไปเรื่อย ๆ เอง ตอนนี้แค่ requests.filter(...) ตอน render ก็ได้ค่าที่ถูกต้องเสมอ ไม่มีทางที่ตัวเลขสรุปกับรายการจริงจะไม่ ตรงกันได้เลย เพราะมันมาจากข้อมูลชุดเดียวกัน

ส่วนตอนทำฟอร์ม (RequestForm.jsx) ก็รู้สึกว่างานเปลี่ยนไปคนละแบบ จาก Week 03 ที่ตอน submit ต้องไปเขียนโค้ดอ่านค่าจาก input ทีละตัวและเช็คเองว่าค่าที่กรอก โอเคไหม กลายเป็นว่า React ให้เราผูก value ของทุก field เข้ากับ formData ใน state ตรง ๆ ตั้งแต่แรก แล้ว validate จาก state ก้อนเดียวผ่านฟังก์ชัน validateRequests ทำให้ error message ที่โชว์บนจอ (errors.requesterName เป็นต้น) ตรงกับสถานะจริงเสมอ ไม่ต้องกลัวว่า error ที่แสดงกับค่าที่กรอกจริงจะ ไม่ sync กัน

โดยรวมข้อดีที่รู้สึกได้ชัดคือลดงาน "จำเอง" ลงไปเยอะมาก แต่ก็มีเรื่องใหม่ที่ ต้องระวังแทน เช่นตอนทำ badge สถานะ/ความเร่งด่วน (LAB4-R12) ต้องคิดเรื่อง conditional rendering ให้ถูก (เช่น request.priority === 'urgent' && ...) และตอน list ว่างก็ต้องคิดเพิ่ม empty state เอง (LAB4-R11) ซึ่งเป็นมุมที่ Week 03 ไม่ค่อยต้องคิดถึงเพราะเขียน DOM ตรง ๆ อยู่แล้ว สรุปคือ Week 04 ทำให้ โค้ดสั้นและเชื่อถือได้มากขึ้นในภาพรวม แต่ก็ต้องเปลี่ยนวิธีคิดจาก "จะแก้ DOM ตรงไหน" มาเป็น "state ตอนนี้ควรเป็นอะไร แล้ว UI ควรหน้าตายังไงจากค่านั้น"

## AI / External Resource Disclosure

เครื่องมือที่ใช้: Claude (Anthropic) โดยใช้ในบทบาทผู้ช่วยตรวจสอบโค้ด (code review) และอธิบายแนวคิดประกอบการเรียนรู้ มิได้ใช้เพื่อสร้างโค้ดทั้งไฟล์ ตั้งแต่ต้น โค้ดทั้งหมดในงานชิ้นนี้เขียนขึ้นเองเป็นหลัก

ลักษณะการใช้งาน

เขียนโค้ดในแต่ละไฟล์ (App.jsx, RequestForm.jsx ฯลฯ) ด้วยตนเองก่อน ทีละส่วนตาม TODO ที่ starter กำหนด แล้วจึงนำไปให้ตรวจสอบความถูกต้อง
สอบถามเพื่อขอคำอธิบายแนวคิดที่ยังไม่เข้าใจ เช่น เหตุผลที่ state ต้องเป็น immutable, ความหมายของ controlled form, และหลักการพิจารณาว่า state ควร เป็นของ component ใด
สอบถามเพื่อวิเคราะห์ปัญหาที่พบระหว่างพัฒนา เช่น กรณีที่ขอบสีแดงของ error ไม่แสดงผลครบทุก field และได้รับคำอธิบายสาเหตุในเชิง CSS specificity
สอบถามเพื่อขอความช่วยเหลือในการวางโครงเอกสาร README (เช่น โครงสร้าง component และการอธิบาย state ownership) 

ตัวอย่างคำถาม/พรอมป์ที่ใช้

"ตรวจโค้ดนี้ให้หน่อย" (แนบโค้ดที่เขียนเอง)
"ทำไมพิมพ์ในฟอร์มแล้วไม่มีอะไรเกิดขึ้น"
"อธิบายว่า LAB4-R05/R06/R07 ทำงานยังไง"

ข้อเสนอแนะจาก AI ที่นำมาปรับใช้จริง

แก้ไข typo/ข้อผิดพลาดที่ถูกชี้ให้เห็น เช่น serState → useState, nextError → nextErrors, setError → setErrors, error.title → error.requesterName
เพิ่ม value/onChange ให้ครบทุก field ของฟอร์ม เพื่อให้เป็น controlled form อย่างสมบูรณ์ตามที่ได้รับการชี้แนะว่ายังขาดอยู่
ปรับ handleDeleteRequest ให้ใช้เมธอด filter() เพื่อคงหลักการอัปเดต state แบบ immutable
