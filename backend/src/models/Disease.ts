import mongoose, { Schema, Document } from 'mongoose';

export interface IDisease extends Document {
  name: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
  category: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const DiseaseSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    symptoms: [
      {
        type: String,
      },
    ],
    prevention: [
      {
        type: String,
      },
    ],
    treatment: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: ['infectious', 'chronic', 'genetic', 'mental', 'other'],
      default: 'other',
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDisease>('Disease', DiseaseSchema);
