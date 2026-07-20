# ENGSE203 LAB 03 — Campus Service Request 

## ผู้จัดทำ

- ชื่อ-นามสกุล : นาย ณัฐวุฒิ จันทายา
- รหัสนักศึกษา : 68543210009-5
- ระบบปฏิบัติการที่ใช้ : Windows 11 / WSL Ubuntu 24.04 LTS
- Repository : https://github.com/Njuntaya/engse203-lab03-68543210009-5/tree/main
- Git Page : https://njuntaya.github.io/engse203-lab03-68543210009-5/

---

## วัตถุประสงค์

เพื่อเรียนรู้โครงสร้างของ JavaScript และกระบวนการทำงานของ DOM Event Listener รวมถึงการเชื่อมต่อกันระหว่าง JavaScript, CSS และ HTML โดยเน้นการจัดการ Event ผ่าน DOM API และการออกแบบ Layout แบบ Mobile First เพื่อให้เว็บไซต์รองรับการแสดงผลบนอุปกรณ์มือถือเป็นหลัก

---

## เครื่องมือที่ใช้

- HTML5
- Vanilla JavaScript (DOM)
- CSS — Mobile First Approach
- Vite (Build Tool)

---

## โครงสร้างไฟล์

```
engse203-lab03-68543210009-5/
├── docs/
│   ├── assets/
│   │   ├── index-CdAnej0A.css
│   │   └── index-Srmx4u7r.js
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── javascript.svg
│   │   └── vite.svg
│   ├── counter.js
│   ├── main.js
│   └── style.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## วิธีติดตั้งและรันโปรเจกต์

```bash
npm install
```

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm run dev` | รัน development server พร้อม hot reload |
| `npm run build` | build output ไปยังโฟลเดอร์ `docs/` |

---

## Git เบื้องต้น

```bash
git init
git remote add origin https://github.com/<username>/<repo>.git

git add .
git commit -m "Initial commit"
git push -u origin main

git checkout -b feature/branch-name
git push origin feature/branch-name
```

ผลลัพธ์
หน้า WEB
<img width="1915" height="999" alt="image" src="https://github.com/user-attachments/assets/54a4f26b-cb8e-4c17-a071-55c26f5874ec" />

เมื่อเกิดข้อผิดพลาด
<img width="1878" height="998" alt="ff" src="https://github.com/user-attachments/assets/a1e411d1-d79e-47e8-99c4-f0ff9761fec4" />

แสดงข้อมูลแบบ Real-Time
<img width="1291" height="725" alt="ฟฟ" src="https://github.com/user-attachments/assets/d047d5be-b67d-458b-a220-08be8ff17a39" />

Console
<img width="555" height="159" alt="console" src="https://github.com/user-attachments/assets/3d555aaa-4d39-4f66-9b8f-26dd44438877" />

output บนมือถือ

<img width="493" height="1003" alt="mobile" src="https://github.com/user-attachments/assets/03af463e-b1b2-429b-9c02-2d912dff1b44" />

output บนแท็บเล็ต

<img width="752" height="915" alt="แท็บเลต" src="https://github.com/user-attachments/assets/c675629e-c674-4946-b85d-ef7ce4fed92f" />


---

## ปัญหาที่พบและวิธีแก้ไข

| ปัญหาที่พบ | สาเหตุ | วิธีแก้ไข |
|-----------|--------|-----------|
| `index.html` และ `main.js` ไม่เชื่อมกัน ทำให้ event ไม่ทำงาน | ไม่ได้ใส่ `<script type="module">` หรือ path ไม่ตรงกับโครงสร้างจริง | ตรวจสอบให้แน่ใจว่ามี `<script type="module" src="/src/main.js"></script>` อยู่ใน `<body>` และ path ตรงกับไฟล์จริง |
| `fatal: not a git repository` หรือ `nothing added to commit` | ยังไม่ได้ `git init` หรือยังไม่ได้ `git add` ไฟล์เข้า staging | รัน `git init` → `git remote add origin <url>` → `git add .` → `git commit` → `git push -u origin main` |

---

## AI Assistance Disclosure

| เครื่องมือ | วัตถุประสงค์ที่ใช้ |
|-----------|-----------------|
| Claude (Anthropic) | ช่วยจัดเรียงโครงสร้าง CSS ให้อ่านและแก้ไขได้ง่ายขึ้น และช่วยร่าง README |
| Google Gemini | ช่วย research และแนะนำวิธีแก้ไข Bug จากคำสั่งใน WSL |
