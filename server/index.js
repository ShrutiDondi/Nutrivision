const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Mock nutrition data for demo purposes
const getMockNutritionData = (filename) => {
  const mockFoods = [
    {
      foodName: 'Apple',
      confidence: 0.92,
      nutrition: {
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
        fiber: 2.4,
        sugar: 10.4,
        sodium: 1,
        potassium: 107,
        calcium: 6,
        iron: 0.1,
        vitaminC: 4.6,
        vitaminA: 54
      },
      servingSize: '100g'
    },
    {
      foodName: 'Banana',
      confidence: 0.89,
      nutrition: {
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3,
        fiber: 2.6,
        sugar: 12.2,
        sodium: 1,
        potassium: 358,
        calcium: 5,
        iron: 0.3,
        vitaminC: 8.7,
        vitaminA: 64
      },
      servingSize: '100g'
    },
    {
      foodName: 'Chicken Breast',
      confidence: 0.85,
      nutrition: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74,
        potassium: 256,
        calcium: 15,
        iron: 0.9,
        vitaminC: 0,
        vitaminA: 21
      },
      servingSize: '100g'
    }
  ];

  // Return random mock data
  return mockFoods[Math.floor(Math.random() * mockFoods.length)];
};

// API Routes
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    console.log('Received image for analysis:', req.file.originalname);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, return mock data
    // In production, this would integrate with Clarifai and Edamam APIs
    const nutritionData = getMockNutritionData(req.file.originalname);

    res.json(nutritionData);
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Food Analyzer API is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Food Analyzer API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});