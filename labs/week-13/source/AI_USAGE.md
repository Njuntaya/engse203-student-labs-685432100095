<div align="center">

# AIUSAGE

**ระบบยื่นและติดตามคำร้อง พร้อมระบบสิทธิ์เจ้าหน้าที่ (RBAC) และความปลอดภัยระดับ Production**

</div>

---

## ภาพรวมการพัฒนา

| หมวด | สิ่งที่ทำ | สถานะ |
|------|-----------|:-----:|
| Backend Security | Security Headers, Rate Limiting, Environment Config | เสร็จสิ้น |
| Frontend RBAC | Auth Service, Login Page, Dynamic Header, Conditional UI | เสร็จสิ้น |
| Deployment | แก้ Case Sensitivity เพื่อ Deploy บน Render | เสร็จสิ้น |

---

## 1. ความปลอดภัยและ Backend Security

### Security Headers & Rate Limiting

เพิ่มมาตรการป้องกันฝั่งเซิร์ฟเวอร์ ดังนี้

- **`X-Content-Type-Options: nosniff`** ป้องกันเบราว์เซอร์เดาประเภทไฟล์ (MIME sniffing)
- **Rate Limiting** จำกัดจำนวนคำขอต่อช่วงเวลา เพื่อป้องกันการโจมตีแบบ **Brute-force**

### Environment Configuration

ตั้งค่าไฟล์ `render.yaml` และตัวแปรสภาพแวดล้อมสำหรับการรันจริงบน Cloud

| ตัวแปร | ค่า | หน้าที่ |
|--------|-----|---------|
| `NODE_ENV` | `production` | เปิดใช้งานเซิร์ฟเวอร์ในโหมด Production |
| `JWT_SECRET` | *(ตั้งค่าเป็นความลับบน Render)* | ใช้ลงลายเซ็นและตรวจสอบ JSON Web Token |

> **คำเตือน:** ห้าม commit ค่า `JWT_SECRET` จริงลง Git ให้ตั้งผ่าน Environment ของ Render เท่านั้น

---

## 2. Frontend & Role-Based Access Control (RBAC)

ระบบแบ่งสิทธิ์เป็น **ผู้ใช้ทั่วไป** และ **เจ้าหน้าที่ (staff)** โดยจำกัดฟีเจอร์สำคัญให้เฉพาะเจ้าหน้าที่

### Authentication Service: `authService.js`

| ฟังก์ชัน | หน้าที่ |
|----------|---------|
| `login()` | เข้าสู่ระบบและบันทึกสถานะลง `localStorage` |
| `logout()` | ออกจากระบบและล้างข้อมูลสิทธิ์ |
| `getAuth()` | ตรวจสอบสถานะและสิทธิ์ของผู้ใช้ปัจจุบัน |

### Login Page: `LoginPage.jsx`

หน้าจอเข้าสู่ระบบสำหรับเจ้าหน้าที่ เพื่อจำกัดการเข้าถึงฟีเจอร์สำคัญ

**บัญชีทดสอบ (Demo)**

```text
Email    : staff@rmutl.ac.th
Password : staff1234
```

> บัญชีนี้ใช้เพื่อการทดสอบเท่านั้น ควรเปลี่ยนก่อนใช้งานจริง

### Dynamic Header Navigation: `AppHeader.jsx`

แถบเมนูด้านบนเปลี่ยนตามสถานะผู้ใช้โดยอัตโนมัติ

```text
ยังไม่เข้าสู่ระบบ  -->  [ เจ้าหน้าที่ ]
เข้าสู่ระบบสำเร็จ   -->  [ ออกจากระบบ ]
```

### Conditional UI Components

| คอมโพเนนต์ | พฤติกรรม | เห็นได้เฉพาะ |
|------------|-----------|:------------:|
| `RequestCard.jsx` | แสดงปุ่ม "ลบ" คำร้อง | `staff` |
| `RequestDetailPage.jsx` | แสดงช่องสถานะเป็น `<select>` Dropdown เพื่อเปลี่ยนสถานะคำร้อง | `staff` |

ผู้ใช้ทั่วไปจะเห็นสถานะเป็นข้อความอ่านอย่างเดียว

---

## 3. การแก้ไขปัญหาและ Deploy ขึ้น Render

### Case Sensitivity Fix

ระบบ Linux บน Render แยกตัวพิมพ์เล็ก-ใหญ่ของชื่อไฟล์ จึงปรับให้สอดคล้องกัน เพื่อแก้ข้อผิดพลาด `Module not found`

```diff
- import LoginPage from "./pages/loginPage";
+ import LoginPage from "./pages/LoginPage";
```

- ชื่อไฟล์คอมโพเนนต์: `LoginPage.jsx`
- การ import ใน `App.jsx` ตรงกับชื่อไฟล์จริงทุกตัวอักษร

---

<div align="center">

**AIUSAGE**

</div>