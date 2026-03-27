import express from 'express';
import {
  getAllDiseases,
  getDiseaseById,
  createDisease,
  updateDisease,
  deleteDisease,
} from '../controllers/diseaseController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllDiseases);
router.get('/:id', getDiseaseById);

// Admin routes
router.post('/', protect, authorize('admin'), createDisease);
router.put('/:id', protect, authorize('admin'), updateDisease);
router.delete('/:id', protect, authorize('admin'), deleteDisease);

export default router;
