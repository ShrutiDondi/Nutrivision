import { useState } from 'react';
import { Upload, Camera, BarChart3, Clock, Plus } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import NutritionDisplay from './components/NutritionDisplay';
import MealLogger from './components/MealLogger';
import LoadingSpinner from './components/LoadingSpinner';
import { NutritionData, MealEntry } from './types/nutrition';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'logger'>('upload');

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setUploadedImage(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to mock data for demo
      setNutritionData({
        foodName: 'Sample Food Item',
        confidence: 0.85,
        nutrition: {
          calories: 250,
          protein: 15.2,
          carbs: 30.5,
          fat: 8.3,
          fiber: 4.1,
          sugar: 12.8,
          sodium: 320,
          potassium: 450,
          calcium: 120,
          iron: 2.1,
          vitaminC: 15.5,
          vitaminA: 850
        },
        servingSize: '100g'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToMeals = (portion: number) => {
    if (nutritionData) {
      const newMeal: MealEntry = {
        id: Date.now().toString(),
        foodName: nutritionData.foodName,
        portion,
        nutrition: {
          calories: nutritionData.nutrition.calories * portion,
          protein: nutritionData.nutrition.protein * portion,
          carbs: nutritionData.nutrition.carbs * portion,
          fat: nutritionData.nutrition.fat * portion,
          fiber: nutritionData.nutrition.fiber * portion,
          sugar: nutritionData.nutrition.sugar * portion,
          sodium: nutritionData.nutrition.sodium * portion,
          potassium: nutritionData.nutrition.potassium * portion,
          calcium: nutritionData.nutrition.calcium * portion,
          iron: nutritionData.nutrition.iron * portion,
          vitaminC: nutritionData.nutrition.vitaminC * portion,
          vitaminA: nutritionData.nutrition.vitaminA * portion
        },
        timestamp: new Date()
      };
      setMeals(prev => [...prev, newMeal]);
    }
  };

  const handleRemoveMeal = (id: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Food Nutrition Analyzer</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Upload food images to get detailed nutritional information powered by AI
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Analyze Food
            </button>
            <button
              onClick={() => setActiveTab('logger')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'logger'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Meal Logger
            </button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <ImageUpload onImageUpload={handleImageUpload} />
                
                {uploadedImage && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Image</h3>
                    <img
                      src={uploadedImage}
                      alt="Uploaded food"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {isAnalyzing && <LoadingSpinner />}
                
                {nutritionData && !isAnalyzing && (
                  <NutritionDisplay
                    data={nutritionData}
                    onAddToMeals={handleAddToMeals}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <MealLogger meals={meals} onRemoveMeal={handleRemoveMeal} />
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Food Recognition</h3>
              <p className="text-gray-600">
                Advanced computer vision to identify food items from photos
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Nutrition</h3>
              <p className="text-gray-600">
                Complete macro and micronutrient breakdown per serving
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Plus className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meal Tracking</h3>
              <p className="text-gray-600">
                Log meals and track daily nutritional intake
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;