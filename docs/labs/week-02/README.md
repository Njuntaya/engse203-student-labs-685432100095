# ENGSE203 LAB 02 — Modern JavaScript Dashboar
## ผู้จัดทำ

- ชื่อ-นามสกุล : นาย ณัฐวุฒิ จันทายา
- รหัสนักศึกษา : 68543210009-5
- ระบบปฏิบัติการที่ใช้ : VS Code Remote - WSL + Ubuntu 24.04 LTS
- Repository : engse203-lab02-68543210009-5

---

## โครงสร้างไฟล์

```
engse203-lab02-68543210009-5/
├── public/
│   ├── .nojekyll
│   └── data/
│       └── learning-tasks.json
├── scripts/
│   └── check-project.mjs
├── src/
│   ├── api.js
│   ├── main.js
│   ├── style.css
│   ├── ui.js
│   └── utils.js
├── docs/
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

### โครงสร้างโมดูล (Modules)

| Module | หน้าที่ความรับผิดชอบ |
|--------|----------------------|
| api.js | ดึงข้อมูลจาก data/learning-tasks.json ผ่าน fetchLearningTasks() รองรับการจำลอง error (simulateError) ตรวจสอบ HTTP status และรูปแบบข้อมูล (validation) |
| main.js | Entry point ของแอป จัดการ state, event listeners (search/filter), เรียกใช้ฟังก์ชันจากโมดูลอื่น รวมถึงจัดการ try/catch สำหรับ error handling |
| ui.js | รับผิดชอบการ render UI ทั้งหมด เช่น renderStats(), renderTasks(), setMessage() และป้องกัน XSS ด้วย escapeHtml() |
| utils.js | ฟังก์ชันช่วยเหลือสำหรับกรองข้อมูล (filterTasks), คำนวณสถิติ (getStats) และแปลง label สถานะ (getStatusLabel) |

---

## วิธีติดตั้งและรันโปรเจกต์

npm install

| คำสั่ง | คำอธิบาย |
|--------|----------|
| npm run dev | รัน development server พร้อม hot reload |
| npm run check | ตรวจสอบโค้ด |
| npm run build | build output ไปยังโฟลเดอร์ docs/ |
| npm run preview | preview ผลลัพธ์ที่ build แล้ว |

---

## การสร้าง SSH Key

```
# สร้าง SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# ดู public key เพื่อ copy ไปวางใน GitHub
cat ~/.ssh/id_ed25519.pub

# ทดสอบการเชื่อมต่อกับ GitHub
ssh -T git@github.com
```

หลังจากสร้าง key แล้ว ให้นำ public key ไปเพิ่มที่ GitHub → Settings → SSH and GPG keys → New SSH key

---

## GitHub Pages URL

https://njuntaya.github.io/engse203-lab02-68543210009-5/

---

## ภาพหน้าจอ (Screenshots)

### Normal State
https://njuntaya.github.io/engse203-lab02-68543210009-5/

<img width="1897" height="992" alt="Normal state screenshot" src="https://github.com/user-attachments/assets/7cb97f28-5c1c-4795-961f-1750632fea86" />

### Error State
https://njuntaya.github.io/engse203-lab02-68543210009-5/?simulateError=1

<img width="1919" height="1079" alt="Error state screenshot" src="https://github.com/user-attachments/assets/2637ca34-24e9-40ff-b6f2-0a567273fbf2" />

---

## ปัญหาที่พบและวิธีแก้ไข

| ปัญหาที่พบ | สาเหตุ | วิธีแก้ไข |
|-----------|--------|-----------|
| export default defineConfig() ซ้ำกันสองครั้งใน vite.config.js | มีการเขียน export default ซ้ำกันสองบรรทัดในไฟล์เดียว | ลบให้เหลือเพียงครั้งเดียว |
| vite: not found บน WSL | ยังไม่ได้ติดตั้ง dependencies — ไม่มีโฟลเดอร์ node_modules | รัน npm install จากนั้นตรวจสอบด้วย npx vite --version แล้วค่อยรัน npm run build |
| Permission denied (publickey) ตอน git push | GitHub ไม่รู้จัก SSH key ของเครื่อง ทำให้ยืนยันตัวตนไม่ได้ | เปลี่ยนจาก SSH URL มาใช้ HTTPS URL แทน เช่น https://github.com/username/repo.git แล้วรัน git remote set-url origin <HTTPS URL> |

---

## AI Assistance Disclosure

| เครื่องมือ | วัตถุประสงค์ที่ใช้ |
|-----------|-----------------|
| Claude (Anthropic) | ช่วยสร้าง README template, อธิบายโครงสร้างโปรเจกต์ และตรวจสอบการเขียนเอกสาร |
| Google Gemini | ช่วย research และแนะนำวิธีแก้ไข error ของ command line บน WSL |
