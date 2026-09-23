import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

const app = createApp();

// ① GET /api/requests → 200 และได้ array
test('GET /api/requests → 200 และได้ array', async () => {
  const r = await request(app).get('/api/requests');
  assert.equal(r.status, 200);
  assert.ok(Array.isArray(r.body));
});

// ② คืน requesterName ไม่ใช่ requester_id
test('คืน requesterName ไม่ใช่ requester_id', async () => {
  const r = await request(app).get('/api/requests');
  assert.ok('requesterName' in r.body[0]);
  assert.ok(!('requester_id' in r.body[0]));
});

// ③ GET /:id พบ → 200 · ไม่พบ → 404
test('GET /:id พบ → 200 · ไม่พบ → 404', async () => {
  // ทดสอบกรณีพบข้อมูล
  const found = await request(app).get('/api/requests/REQ-001');
  assert.equal(found.status, 200);
  
  // ทดสอบกรณีไม่พบข้อมูล
  const notFound = await request(app).get('/api/requests/REQ-999');
  assert.equal(notFound.status, 404);
});

// ④ POST ถูกต้อง → 201
test('POST ถูกต้อง → 201', async () => {
  const payload = {
    requesterName: 'ณัฐวุฒิ',
    requestType: 'แจ้งซ่อม',
    // แก้ไขข้อความให้ยาวขึ้น เผื่อฐานข้อมูลตั้งเงื่อนไขความยาวขั้นต่ำไว้
    location: 'ห้องปฏิบัติการ 301', 
    details: 'เครื่องปรับอากาศไม่ทำงาน', 
    priority: 'urgent'
  };
  
  const r = await request(app).post('/api/requests').send(payload);
  
  // 💡 ตัวช่วย: ถ้าไม่ได้ 201 จะปริ้นท์สาเหตุออกมาให้เห็น
  if (r.status !== 201) {
    console.log('❌ สาเหตุที่ Error:', r.body);
  }

  assert.equal(r.status, 201);
  assert.ok(r.body.id.startsWith('REQ-'));
});

// ⑤ POST ไม่ครบ/ข้อมูลผิด → 400
test('POST ไม่ครบ → 400', async () => {
  const r = await request(app).post('/api/requests').send({
    requesterName: 'ณัฐวุฒิ'
    // จงใจไม่ส่งฟิลด์ที่เหลือ
  });
  
  assert.equal(r.status, 400);
  assert.ok(r.body.error);
});

// ⑥ ยิง SQL injection ผ่าน ?status= แล้วไม่หลุด
test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
  const evil = encodeURIComponent("x' OR '1'='1");
  const r = await request(app).get(`/api/requests?status=${evil}`);
  
  assert.equal(r.status, 200);
  assert.equal(r.body.length, 0);
});