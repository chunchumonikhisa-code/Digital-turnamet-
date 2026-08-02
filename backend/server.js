require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ============ PUBLIC ROUTES (No Login Required) ============

// 1. Get all doctors (with filters for District & Specialization)
app.get('/api/public/doctors', async (req, res) => {
  try {
    const { districtId, specialization } = req.query;
    const filters = {};
    if (districtId) filters.districtId = parseInt(districtId);
    if (specialization) filters.specialization = specialization;

    const doctors = await prisma.doctor.findMany({
      where: filters,
      include: { district: { include: { division: true } } },
      take: 50,
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all hospitals (with nearby location query)
app.get('/api/public/hospitals', async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      include: { district: true },
      take: 50,
    });
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. AI Symptom Checker (Public - No Auth)
app.post('/api/public/ai/symptom-analyze', async (req, res) => {
  const { symptoms } = req.body;
  // Here you will call ChatGPT/Gemini API
  // For now, returning a mock response
  res.json({
    possibleDisease: 'Viral Fever or Common Cold',
    advice: 'Stay hydrated and consult a doctor if fever persists for 3 days.',
    severity: 'Mild',
  });
});

// 4. Medicine Search (Public)
app.get('/api/public/medicines', async (req, res) => {
  const { q } = req.query;
  const medicines = await prisma.medicine.findMany({
    where: {
      OR: [
        { genericName: { contains: q, mode: 'insensitive' } },
        { brandName: { contains: q, mode: 'insensitive' } },
      ],
    },
    take: 20,
  });
  res.json(medicines);
});

// ============ PROTECTED ROUTES (Login Required - JWT Middleware will go here) ============
// app.use('/api/protected', authenticateJWT, protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI-Health-BD Backend running on http://localhost:${PORT}`);
});
