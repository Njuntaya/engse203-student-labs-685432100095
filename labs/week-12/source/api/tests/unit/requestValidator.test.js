import { describe, test, expect } from 'vitest';
import { validateRequestInput, isValidStatus } from '../../src/validators/requestValidator.js';
import { AppError, asyncHandler, notFound, errorHandler } from '../../src/middleware/errorHandler.js';
import { loadSeed, listRequestsByUser, getDbStatus } from '../../src/services/requestService.js';
/**
 * Unit test — ทดสอบ pure function โดยตรง ไม่ต้องเปิด server ไม่ต้องมีฐานข้อมูล
 * กรณีทดสอบมาจากตาราง TEST_CASES.md (CP44): แบ่งกลุ่มข้อมูล + ค่าขอบ
 */

// ข้อมูลที่ถูกต้องทุกช่อง — แต่ละ test เปลี่ยนทีละช่องเพื่อให้รู้ว่าพังเพราะอะไร
const valid = {
  requesterName: 'สมชาย ใจดี',
  requestType: 'แจ้งซ่อม',
  location: 'ห้อง 301',
  details: 'แอร์ไม่เย็นตั้งแต่เช้า',
  priority: 'normal',
};
const withField = (patch) => ({ ...valid, ...patch });

describe('validateRequestInput — ข้อมูลถูกต้อง', () => {
  test('ทุกช่องถูกต้อง → ไม่มี error', () => {
    expect(validateRequestInput(valid)).toEqual([]);
  });
});

describe('validateRequestInput — รายละเอียด (ค่าขอบ 10 ตัวอักษร)', () => {
  test('9 ตัวอักษร → error (ต่ำกว่าขอบ 1)', () => {
    expect(validateRequestInput(withField({ details: '123456789' }))).toHaveLength(1);
  });
  test('10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)', () => {
    expect(validateRequestInput(withField({ details: '1234567890' }))).toEqual([]);
  });
  test('11 ตัวอักษร → ผ่าน (เกินขอบ 1)', () => {
    expect(validateRequestInput(withField({ details: '12345678901' }))).toEqual([]);
  });
  test('ช่องว่างล้วนถูกตัดทิ้งก่อนนับ → error', () => {
    expect(validateRequestInput(withField({ details: '            ' }))).toHaveLength(1);
  });
});

describe('validateRequestInput — ชื่อผู้แจ้ง (ค่าขอบ 2 ตัวอักษร)', () => {
  test('1 ตัวอักษร → error', () => {
    expect(validateRequestInput(withField({ requesterName: 'ก' }))).toHaveLength(1);
  });
  test('2 ตัวอักษร → ผ่าน', () => {
    expect(validateRequestInput(withField({ requesterName: 'กข' }))).toEqual([]);
  });
});

describe('validateRequestInput — ค่าที่ต้องอยู่ในรายการ', () => {
  test('ประเภทคำร้องนอกรายการ → error', () => {
    expect(validateRequestInput(withField({ requestType: 'แจ้งเหตุ' }))).toContain('ประเภทคำร้องไม่ถูกต้อง');
  });
  test.each(['normal', 'urgent'])('priority "%s" → ผ่าน', (priority) => {
    expect(validateRequestInput(withField({ priority }))).toEqual([]);
  });
  test('priority "high" → error', () => {
    expect(validateRequestInput(withField({ priority: 'high' }))).toHaveLength(1);
  });
});

describe('validateRequestInput — ข้อมูลผิดรูปแบบ', () => {
  test.each([null, undefined, 'text', 42, []])('input = %j → error เดียว', (input) => {
    expect(validateRequestInput(input)).toEqual(['ต้องส่งข้อมูลคำร้องมาด้วย']);
  });
  test('ผิดหลายช่องพร้อมกัน → ได้ error ครบทุกช่อง', () => {
    expect(validateRequestInput({})).toHaveLength(5);
  });
});

describe('isValidStatus', () => {
  test.each(['pending', 'in-progress', 'completed'])('"%s" → true', (s) => {
    expect(isValidStatus(s)).toBe(true);
  });
  test.each(['done', 'in progress', '', undefined])('%j → false', (s) => {
    expect(isValidStatus(s)).toBe(false);
  });
});

describe('validateRequestInput — เพิ่มเติมกรณีค่าว่างหรือเกินขอบเขต', () => {
  test('location (สถานที่) เป็นค่าว่างหรือสั้นเกินไป → error', () => {
    expect(validateRequestInput(withField({ location: '' }))).toHaveLength(1);
  });
  
  test('requestType ผิดประเภทแบบอาร์เรย์หรือตัวเลข → error', () => {
    expect(validateRequestInput(withField({ requestType: 123 }))).toHaveLength(1);
  });
}); 

describe('requestService — การจัดการข้อมูลและฟังก์ชันเสริม', () => {
  test('listRequestsByUser() ต้องคืนค่าอาร์เรย์คำร้องของ user ตาม id ที่กำหนด', async () => {
    // ทดสอบดึงรายการคำร้องของ User ID = 1 ตามโครงสร้างฐานข้อมูล
    await loadSeed();
    const requests = listRequestsByUser(1);
    expect(Array.isArray(requests)).toBe(true);
  });
});

describe('AppError', () => {
  test('สร้าง error พร้อมกำหนด status ได้ ', () => {
    const err = new AppError('ข้อผิดพลาด', 400);
    expect(err.message).toBe('ข้อผิดพลาด');
    expect(err.status).toBe(400);
  });
});


