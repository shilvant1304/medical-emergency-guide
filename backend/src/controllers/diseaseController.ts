import { Request, Response } from 'express';
import Disease from '../models/Disease';

// Get all diseases with optional search
export const getAllDiseases = async (req: Request, res: Response) => {
  try {
    const { search, category, severity } = req.query;

    let filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { symptoms: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (severity) {
      filter.severity = severity;
    }

    const diseases = await Disease.find(filter);
    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching diseases',
      error,
    });
  }
};

// Get single disease by ID
export const getDiseaseById = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found',
      });
    }

    res.status(200).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching disease',
      error,
    });
  }
};

// Create new disease (Admin only)
export const createDisease = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Disease created successfully',
      data: disease,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating disease',
      error,
    });
  }
};

// Update disease (Admin only)
export const updateDisease = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Disease updated successfully',
      data: disease,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating disease',
      error,
    });
  }
};

// Delete disease (Admin only)
export const deleteDisease = async (req: Request, res: Response) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Disease deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting disease',
      error,
    });
  }
};
