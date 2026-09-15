import * as service from '../services/requestService.js';
import { AppError } from '../middleware/errorHandler.js';

export const getRequestById = async (req, res) => {
  const { id } = req.params;
  const item = await service.findById(id);

  if (!item) {
    throw new AppError('ไม่พบคำร้อง', 404);
  }

  res.json(item);
};

export function listRequests(req, res) {
  const { status } = req.query;
  res.status(200).json(service.findAll({ status }));
}

export async function resetRequests(req, res) {
  res.status(200).json(await service.reset());
}

export function getRequest(req, res) {
  const found = service.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(found);
}

export function createRequest(req, res) {
  const { requesterName, requestType, location, details, priority } = req.body ?? {};

  if (!requesterName || !requestType || !location || !details || !priority) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง' });
  }

  const created = service.create(req.body);
  res.status(201).json(created);
}

export function updateRequestStatus(req, res) {
  const ALLOWED = ['pending', 'in-progress', 'completed'];
  const { status } = req.body ?? {};
  if (!ALLOWED.includes(status)) {
    return res.status(400).json({ error: 'สถานะต้องเป็น pending, in-progress หรือ completed' });
  }
  const updated = service.updateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(updated);
}

export function deleteRequest(req, res) {
  const removed = service.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(204).end();
}