/** จับ error ที่หลุดมาจากทุก route — ต้องมี 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler */
// 1. เขียน Class AppError ด้านบนสุดของไฟล์
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = { error: message };

  // ซ่อน stack trace ถ้า NODE_ENV เป็น production
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

;

/** ไม่มี route ไหนตรง */
export function notFound(req, res) {
  res.status(404).json({ error: `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}` });
}
