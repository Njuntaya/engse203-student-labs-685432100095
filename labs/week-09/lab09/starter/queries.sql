-- ═══════════════════════════════════════════════════════════
-- queries.sql — คำสั่งค้นหาตอบโจทย์
-- 🏠 TODO W09-QUERY (CP22) · เขียนอย่างน้อย 8 ข้อ
--
-- เขียนคำสั่งจริงที่รันได้ ไม่ใช่เขียนบรรยาย
-- ทุกข้อต้องทดสอบแล้วว่าได้ผลลัพธ์ถูกต้อง
-- ═══════════════════════════════════════════════════════════

-- ① คำร้องทั้งหมด เรียงตามรหัส
    SELECT * FROM requests ORDER BY id; --เลือกทั้งหมด จากTABLE requests และ เรียงID จาก น้อย -> มาก 

-- ② คำร้องที่ยังไม่ได้ดำเนินการ (status = 'pending')
    SELECT id , location , details FROM requests --เลือกข้อมูลชุด ... จาก requests
    WHERE  status = 'pending' --กรองStatus Pending ของ table requests
    ORDER BY id; --เรียง id จากน้อยไปมาก


-- ③ คำร้องเร่งด่วนที่ยังไม่เสร็จ — ใช้เงื่อนไข 2 ข้อพร้อมกัน

    SELECT id , location , details , status FROM requests 
    WHERE priority = 'urgent' AND status != 'complete'
    ORDER BY id;

-- ④ ค้นคำร้องจากคำบางส่วนในรายละเอียด  (คำใบ้: LIKE)
    SELECT id , location , details FROM requests
    WHERE details LIKE '%อากาศ%' --ข้างหน้าและข้างหลังอากาศ เป็นคำอะไรนก็ได้ โดยใช้ % หรือ MOD และ LIKE ห้ามมีเครื่องหมมาย =
    ORDER BY id ;

-- ⑤ คำร้องพร้อมชื่อผู้แจ้ง  ← ต้องใช้ JOIN เพราะชื่ออยู่คนละตาราง
    SELECT  requester_id , u.name , r.request_type , r.Location , r.details FROM requests r
    JOIN users u ON r.requester_id = u.id
    ORDER BY r.id;
-- ⑥ คำร้องเฉพาะของภาควิชาหนึ่ง  (JOIN + WHERE)
    SELECT u.name ,u.department , r.request_type , r.location , r.details FROM requests r 
    JOIN users u ON u.id = r.requester_id
    WHERE u.department LIKE '%ไฟฟ้า%' --กรองของ Table User กรองคำว่าไฟฟ้า จาก column department
    ORDER BY u.id;

-- ⑦ รายชื่อผู้แจ้งที่ไม่ซ้ำกัน  (คำใบ้: DISTINCT)
    SELECT DISTINCT u.name 
    FROM requests r
    JOIN users u ON r.requester_id = u.id
    ORDER BY u.name;

-- ⑧ คำร้อง 3 รายการล่าสุด  (คำใบ้: ORDER BY + LIMIT)
    SELECT requester_id , location ,details FROM requests 
    ORDER BY requester_id DESC
    LIMIT 3;


-- ⭐ Challenge ─────────────────────────────────────────────
-- ⑨ นับจำนวนคำร้องแยกตามสถานะ  (GROUP BY + COUNT)
-- ⑩ ใครแจ้งคำร้องมากที่สุด  (คำใบ้: LEFT JOIN เพื่อให้คนที่ยังไม่เคยแจ้งติดมาด้วย)
-- ⑪ สร้าง INDEX ให้การค้นด้วย status เร็วขึ้น
