import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());

// In-memory data stores
type Disease = {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
  category: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'admin';
  createdAt: string;
};

const sampleDiseases: Disease[] = [
  {
    id: '1',
    name: 'Malaria',
    description: 'Malaria is a serious and sometimes fatal disease caused by a parasite that is spread by mosquitoes.',
    symptoms: ['high fever', 'chills', 'headache', 'muscle pain', 'sweating'],
    prevention: ['use mosquito nets', 'apply repellent', 'wear protective clothing', 'take preventive medication'],
    treatment: ['antimalarial drugs', 'fever management', 'hydration', 'blood transfusion if needed'],
    category: 'infectious',
    severity: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dengue Fever',
    description: 'Dengue is a mosquito-borne viral infection that causes a severe flu-like illness.',
    symptoms: ['sudden fever', 'severe headache', 'muscle pain', 'rash', 'nausea'],
    prevention: ['avoid mosquito bites', 'use mosquito repellent', 'wear long clothing', 'remove standing water'],
    treatment: ['rest and hydration', 'pain relievers', 'monitor for complications', 'hospitalization if severe'],
    category: 'infectious',
    severity: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Common Cold',
    description: 'The common cold is a viral infection that affects the upper respiratory system.',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'mild fever'],
    prevention: ['wash hands frequently', 'avoid close contact', 'maintain hygiene', 'boost immunity'],
    treatment: ['rest', 'fluids', 'throat lozenges', 'decongestants', 'over-the-counter medications'],
    category: 'infectious',
    severity: 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const diseases: Disease[] = [...sampleDiseases];

// Seed admin user from env
const users: User[] = [];
const adminEmail = process.env.ADMIN_EMAIL || 'admin@indiahealthaid.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const seedAdmin = async () => {
  const hashed = await bcrypt.hash(adminPassword, 10);
  users.push({
    id: 'u1',
    username: 'admin',
    email: adminEmail,
    password: hashed,
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
};

seedAdmin();

// Helpers
const generateToken = (id: string) => jwt.sign({ id }, JWT_SECRET as string, { expiresIn: '7d' });

const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Not authorized' });
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET as string) as any;
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized', error: err });
  }
};

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as User | undefined;
  if (!user || user.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin only' });
  next();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Mock server running', timestamp: new Date().toISOString() });
});

// Diseases
app.get('/api/diseases', (req, res) => {
  const { search, category, severity } = req.query;
  let result = diseases;
  if (search) {
    const s = String(search).toLowerCase();
    result = result.filter(d => d.name.toLowerCase().includes(s) || d.description.toLowerCase().includes(s) || d.symptoms.join(' ').toLowerCase().includes(s));
  }
  if (category) result = result.filter(d => d.category === category);
  if (severity) result = result.filter(d => d.severity === severity);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/diseases/:id', (req, res) => {
  const disease = diseases.find(d => d.id === req.params.id);
  if (!disease) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: disease });
});

app.post('/api/diseases', protect, authorizeAdmin, (req, res) => {
  const body = req.body as Partial<Disease>;
  if (!body.name || !body.description) return res.status(400).json({ success: false, message: 'Name & description required' });
  const newDisease: Disease = {
    id: String(Date.now()),
    name: body.name,
    description: body.description,
    symptoms: body.symptoms || [],
    prevention: body.prevention || [],
    treatment: body.treatment || [],
    category: (body.category as string) || 'other',
    severity: (body.severity as 'low'|'medium'|'high') || 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  diseases.push(newDisease);
  res.status(201).json({ success: true, data: newDisease });
});

app.put('/api/diseases/:id', protect, authorizeAdmin, (req, res) => {
  const idx = diseases.findIndex(d => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  const body = req.body as Partial<Disease>;
  const updated = { ...diseases[idx], ...body, updatedAt: new Date().toISOString() } as Disease;
  diseases[idx] = updated;
  res.json({ success: true, data: updated });
});

app.delete('/api/diseases/:id', protect, authorizeAdmin, (req, res) => {
  const idx = diseases.findIndex(d => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  diseases.splice(idx, 1);
  res.json({ success: true, message: 'Deleted' });
});

// Auth
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  if (users.find(u => u.email === email || u.username === username)) return res.status(400).json({ success: false, message: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const newUser: User = { id: `u${Date.now()}`, username, email, password: hashed, role: 'user', createdAt: new Date().toISOString() };
  users.push(newUser);
  const token = generateToken(newUser.id);
  res.status(201).json({ success: true, token, user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = generateToken(user.id);
  res.json({ success: true, token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

app.get('/api/auth/me', protect, (req, res) => {
  const user = (req as any).user as User;
  res.json({ success: true, data: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// Admin
app.use('/api/admin', protect, authorizeAdmin);

app.get('/api/admin/users', (req, res) => {
  const list = users.map(u => ({ id: u.id, username: u.username, email: u.email, role: u.role }));
  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/admin/stats', (req, res) => {
  res.json({ success: true, data: { totalUsers: users.length, totalDiseases: diseases.length, adminUsers: users.filter(u => u.role === 'admin').length } });
});

app.delete('/api/admin/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });
  users.splice(idx, 1);
  res.json({ success: true, message: 'Deleted' });
});

app.patch('/api/admin/users/:id/role', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ success: false, message: 'Invalid role' });
  user.role = role;
  res.json({ success: true, data: { id: user.id, role: user.role } });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`Seed admin: ${adminEmail} / ${adminPassword}`);
});
