import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Disease from '../models/Disease';

dotenv.config();

const sampleDiseases = [
  {
    name: 'Malaria',
    description: 'Malaria is a serious and sometimes fatal disease caused by a parasite that is spread by mosquitoes.',
    symptoms: ['high fever', 'chills', 'headache', 'muscle pain', 'sweating'],
    prevention: ['use mosquito nets', 'apply repellent', 'wear protective clothing', 'take preventive medication'],
    treatment: ['antimalarial drugs', 'fever management', 'hydration', 'blood transfusion if needed'],
    category: 'infectious',
    severity: 'high',
  },
  {
    name: 'Dengue Fever',
    description: 'Dengue is a mosquito-borne viral infection that causes a severe flu-like illness.',
    symptoms: ['sudden fever', 'severe headache', 'muscle pain', 'rash', 'nausea'],
    prevention: ['avoid mosquito bites', 'use mosquito repellent', 'wear long clothing', 'remove standing water'],
    treatment: ['rest and hydration', 'pain relievers', 'monitor for complications', 'hospitalization if severe'],
    category: 'infectious',
    severity: 'high',
  },
  {
    name: 'Diabetes',
    description: 'Diabetes is a chronic disease where the body cannot properly regulate blood sugar levels.',
    symptoms: ['excessive thirst', 'frequent urination', 'fatigue', 'blurred vision', 'weight loss'],
    prevention: ['maintain healthy weight', 'exercise regularly', 'eat balanced diet', 'manage stress'],
    treatment: ['insulin therapy', 'oral medications', 'dietary management', 'regular monitoring'],
    category: 'chronic',
    severity: 'high',
  },
  {
    name: 'Hypertension',
    description: 'Hypertension (high blood pressure) is a major risk factor for heart disease and stroke.',
    symptoms: ['often no symptoms', 'headache', 'chest discomfort', 'shortness of breath'],
    prevention: ['reduce salt intake', 'exercise regularly', 'manage stress', 'limit alcohol'],
    treatment: ['blood pressure medications', 'lifestyle changes', 'dietary modifications', 'regular checkups'],
    category: 'chronic',
    severity: 'high',
  },
  {
    name: 'Common Cold',
    description: 'The common cold is a viral infection that affects the upper respiratory system.',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'mild fever'],
    prevention: ['wash hands frequently', 'avoid close contact', 'maintain hygiene', 'boost immunity'],
    treatment: ['rest', 'fluids', 'throat lozenges', 'decongestants', 'over-the-counter medications'],
    category: 'infectious',
    severity: 'low',
  },
  {
    name: 'Asthma',
    description: 'Asthma is a chronic lung disease that makes it difficult to breathe.',
    symptoms: ['wheezing', 'shortness of breath', 'chest tightness', 'coughing'],
    prevention: ['avoid triggers', 'maintain clean air', 'manage allergies', 'take preventive medication'],
    treatment: ['inhalers', 'bronchodilators', 'corticosteroids', 'trigger avoidance'],
    category: 'chronic',
    severity: 'medium',
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing diseases
    await Disease.deleteMany({});
    console.log('🗑️  Cleared existing diseases');

    // Insert sample diseases
    await Disease.insertMany(sampleDiseases);
    console.log(`✅ Seeded ${sampleDiseases.length} diseases`);

    await mongoose.connection.close();
    console.log('✅ Database disconnected');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
