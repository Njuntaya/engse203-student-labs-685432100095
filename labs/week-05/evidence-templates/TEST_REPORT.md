# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** ณัฐวุฒิ จันทายา (68543210009-5)
**OS / Browser / Node:** Windows11 / Microsoft Edge / Node version 22  

# TC-L5 — Manual Test Log (ENGSE203 LAB05)

กรอก Actual result จากการรันจริง ใช้ PASS, FAIL หรือ NOT RUN และอ้างหลักฐานแบบ relative path

## ผลทดสอบ

| ID | ทำอะไร | ผลที่ควรได้ | ผลจริง | สถานะ | หลักฐาน |
|---|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | Dashboard แสดงแผงสรุปและรายการคำร้อง | แสดงหน้า Dashboard พร้อมการ์ดสรุปยอดและรายการคำร้องครบถ้วน | PASS | `images/dashboard-home.png` |
| TC-L5-02 | กดเมนู Dashboard → New Request → About ทีละปุ่ม | เปลี่ยนหน้าทันที เมนูที่เลือก highlight ตรงกับหน้าปัจจุบัน | เปลี่ยนหน้าได้ทันที เมนู active ตรงกับหน้าปัจจุบัน | PASS | `images/navigation-active.png` |
| TC-L5-03 | เปิด `#/requests/new` แล้วกด F5 | หลัง refresh ยังอยู่หน้า New Request ไม่หายและไม่เจอ 404 | รีเฟรชแล้วฟอร์มไม่หายและไม่เจอ 404 | PASS |  |
| TC-L5-04 | เปิด `#/requests/REQ-001` | หน้าแสดงรายละเอียดของคำร้อง REQ-001 ครบถ้วน | แสดงรายละเอียดคำร้อง REQ-001 ถูกต้องครบถ้วน | PASS | `images/route-detail-found.png` |
| TC-L5-05 | เปิด `#/requests/REQ-999` (ID ไม่มีจริง) | ขึ้นข้อความแจ้งไม่พบคำร้อง พร้อมปุ่มกลับหน้าหลัก | แสดงข้อความไม่พบคำร้อง พร้อมปุ่มกลับหน้าหลักถูกต้อง | PASS | `images/route-detail-not-found.png` |
| TC-L5-06 | เปิด `#/unknown` | หน้า NotFound พร้อม header และ footer + ลิงก์กลับ Dashboard | แสดงหน้า 404 NotFound พร้อม Layout ส่วนบนและล่างปกติ | PASS | `images/route-not-found.png` |
| TC-L5-07 | ลบข้อมูลใน LocalStorage แล้วเปิด Dashboard | ระบบตรวจพบข้อมูลหาย ดึง Seed Data กลับมาลงใหม่อัตโนมัติ | ดึง Seed Data กลับมาลงใหม่อัตโนมัติถูกต้อง | PASS | `images/storage-auto-seed.png` |
| TC-L5-08 | สังเกตหน้าตอนกำลังรอโหลดข้อมูล | เห็นสปินเนอร์พร้อมข้อความ "กำลังโหลดข้อมูล…" ก่อนข้อมูลจริงมา | แสดงสปินเนอร์และข้อความโหลดถูกต้องตามลำดับ | PASS | `images/state-loading.png` |
| TC-L5-09 | เปิด `#/?scenario=error` | การ์ดแจ้งเตือนสีแดง "โหลดข้อมูลไม่สำเร็จ" พร้อมปุ่ม "ลองอีกครั้ง" | แสดงการ์ด error พร้อมปุ่ม retry ถูกต้อง | PASS | `images/state-error-retry.png` |
| TC-L5-10 | กดปุ่ม "ลองอีกครั้ง" จากเคส error | เคลียร์ค่า error ใน URL แล้วดึงข้อมูลปกติสำเร็จ | เคลียร์ error และโหลดข้อมูลสำเร็จตามที่คาด | PASS | `images/state-retry-success.png` |
| TC-L5-11 | เปิด `#/?scenario=empty` | แสดงหน้าว่างเปล่า แจ้ง "ยังไม่มีคำร้อง" พร้อมปุ่มชวนสร้างคำร้อง | แสดง empty state พร้อมปุ่มถูกต้อง | PASS | `images/state-empty.png` |
| TC-L5-12 | รันคำสั่งตรวจโค้ดอัตโนมัติ (public checker) | สคริปต์ตรวจผ่านหมดทุกข้อ ไม่มี error | ตรวจผ่านครบทุกข้อ | PASS | `images/npm_run-check-pass.png` (All checks passed) |
| TC-L5-13 | กดส่งฟอร์มโดยกรอกข้อมูลไม่ครบ/ผิดกติกา | ข้อความสีแดงแจ้งเตือนใต้ช่องที่ผิด ฟอร์มไม่ยอมส่ง | แจ้งเตือนถูกช่อง ฟอร์มไม่ยอมส่งตามที่คาด | PASS | `images/form-validation-error.png` |
| TC-L5-14 | กรอกฟอร์มถูกต้องแล้วส่ง จากนั้นกด Refresh | บันทึกสำเร็จ เด้งไปหน้ารายละเอียด ข้อมูลใหม่ยังอยู่หลัง refresh | บันทึกและ persist ข้อมูลถูกต้องตามที่คาด | PASS | `images/persistence-add-refresh.png` |
| TC-L5-15 | กดปุ่มกรองสถานะคำร้องทุกแบบ | รายการปรับตามปุ่มที่กด (ทั้งหมด/รอดำเนินการ/กำลังดำเนินการ/เสร็จสิ้น) | รายการกรองถูกต้องตามสถานะที่เลือก | PASS | `images/filter-bar-test.png` |
| TC-L5-16 | กดลบคำร้อง แล้วกด Refresh | คำร้องหายจากหน้าจอทันที และหลัง Refresh ยังคงถูกลบอยู่ | ลบและ persist การลบถูกต้องตามที่คาด | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-17 | กดปุ่ม Reset Demo Data | ป๊อปอัพยืนยัน กดยืนยันแล้วข้อมูลรีเซ็ตกลับเป็นค่าเริ่มต้น | รีเซ็ตข้อมูลสำเร็จตามที่คาด | PASS | `images/reset-demo-data.png` |
| TC-L5-18 | แอบแก้ LocalStorage ให้พัง แล้วกด Refresh | ระบบตรวจจับข้อมูลพัง กู้คืนข้อมูลเริ่มต้นใหม่ เว็บไม่ค้าง | ตรวจจับและกู้คืนข้อมูลถูกต้องตามที่คาด | PASS | `images/storage-recovery.png` |
| TC-L5-19 | เช็คตัวเลขบนการ์ดสรุปเทียบกับรายการจริง | ตัวเลขบน Summary Card ตรงกับจำนวนรายการที่แสดง | ตัวเลขตรงกันเป๊ะตามที่คาด | PASS | `images/summary-data-match.png` |
| TC-L5-20 | ย่อหน้าจอเหลือ 375px (ขนาดมือถือ) | เลย์เอาต์ปรับเป็นแนวดิ่ง การ์ดและฟอร์มไม่หลุดขอบจอ | responsive ถูกต้องตามที่คาด | PASS | `images/responsive-375.png` |
| TC-L5-21 | ใช้งานผ่านแป้นพิมพ์อย่างเดียว (Tab/Enter) | กด Tab วนเลือกเมนู กรอกฟอร์ม ส่งข้อมูลได้โดยไม่ใช้เมาส์ | ใช้งานผ่านคีย์บอร์ดได้ครบตามที่คาด | PASS | `images/keyboard-a11y.png` |
| TC-L5-22 | รันคำสั่งเช็คโค้ด Build และ Preview | Build ผ่าน ได้ไฟล์ production เปิด preview รันได้ไม่มีปัญหา | Build และ Preview สำเร็จตามที่คาด | PASS | `image/pnpm-build_pnpm-preview.png` |
| TC-L5-23 | เปิดเว็บใน Incognito แล้วกด Refresh URL Hash | เว็บทำงานปกติในโหมดไม่ระบุตัวตน Refresh ไม่หลุด | ทำงานได้ปกติตามที่คาด | PASS | `images/pages-incognito.png` + `https://.../#/` |
| TC-L5-24 | รวม code เข้า main (PR) และแปะ Tag | รวม PR เข้า branch หลักสำเร็จ พร้อมติด Tag เวอร์ชัน | รวมและ Tag สำเร็จตามที่คาด | PASS |  |

---

##  Rerun Log

เก็บร่องรอย FAIL เดิม แล้วเพิ่มบรรทัด rerun แทนการลบประวัติ

| Test ID | เวลา | Fix | Actual result | Status |
|---|---|---|---|---|
| TC-L5-13 | 2026-08-25 10:15 | ใส่ `.trim()` ในฟังก์ชัน `validate()` เพื่อเช็คการเคาะสเปซบาร์ | ข้อความเตือนสีแดงแสดงขึ้นมาถูกต้องตามเงื่อนไข | PASS |
| TC-L5-14 | 2026-08-25 10:40 | เรียกใช้ `useNavigate()` ย้ายหน้าไปหลังบันทึกคำร้องเสร็จ | ระบบเด้งไปหน้ารายละเอียดคำร้องใหม่ทันทีหลังกดส่ง | PASS |