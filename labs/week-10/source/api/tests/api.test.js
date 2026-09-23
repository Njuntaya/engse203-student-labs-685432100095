import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

/**
 * TODO W07-TEST (🏠 CP16) · เขียน test อย่างน้อย 6 เคส
 *
 * ที่ต้องมี
 *   1. GET /api/requests            → 200 และได้ array
 *   2. GET /api/requests/:id พบ      → 200
 *   3. GET /api/requests/:id ไม่พบ   → 404
 *   4. POST ข้อมูลถูกต้อง            → 201 และ status เป็น pending
 *   5. POST ข้อมูลไม่ครบ             → 400
 *   6. CORS header ตอบ origin ที่อนุญาต
 *
 * รันด้วย: npm test
 * ตัวอย่างโครง (ลบคอมเมนต์นี้แล้วเขียนจริง)
 */
describe('Campus Service Request API Tests', () => {

  // เคสที่ 1: GET /api/requests → 200 และได้ array
  test('1. GET /api/requests คืนรายการทั้งหมด พร้อม status 200 และเป็น Array', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  // เคสที่ 2: GET /api/requests/:id พบ → 200
  test('2. GET /api/requests/:id พบรายการ คืน status 200', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });

  // เคสที่ 3: GET /api/requests/:id ไม่พบ → 404
  test('3. GET /api/requests/:id ไม่พบรายการ คืน status 404', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
    assert.ok(res.body.error);
  });

  // เคสที่ 4: POST ข้อมูลถูกต้อง → 201 และ status เป็น pending
  test('4. POST ข้อมูลถูกต้อง คืน status 201 และ status เป็น pending', async () => {
    const res = await request(app)
      .post('/api/requests')
      .send(validRequest); // ใช้ validRequest ที่เตรียมไว้ข้างบน

    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
    assert.ok(res.body.id);
  });

  // เคสที่ 5: POST ข้อมูลไม่ครบ → 400
  test('5. POST ข้อมูลไม่ครบ คืน status 400 Bad Request', async () => {
    const invalidRequest = {
      requesterName: 'ทดสอบ', // ส่งแค่ชื่อ แต่ขาด field สำคัญอื่นๆ
    };

    const res = await request(app)
      .post('/api/requests')
      .send(invalidRequest);

    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  // เคสที่ 6: CORS header ตอบ origin ที่อนุญาต
  test('6. CORS header ตอบกลับ Origin ที่อนุญาต', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Origin', 'http://localhost:5173');

    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });

});