import React, { useState } from 'react';
import { BarChart3, Plus, Zap, Beef, Wheat, Droplets } from 'lucide-react';
import { NutritionData } from '../types/nutrition';

interface NutritionDisplayProps {
  data: NutritionData;
  onAddToMeals: (portion: number) => void;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ data, onAddToMeals }) => {
  const [portion, setPortion] = useState(1);

  const handleAddToMeals = () => {
    onAddToMeals(portion);
  };

  const macronutrients = [
    {
      name: 'Calories',
      value: Math.round(data.nutrition.calories * portion),
      unit: 'kcal',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Protein',
      value: Math.round(data.nutrition.protein * portion * 10) / 10,
      unit: 'g',
      icon: Beef,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Carbs',
      value: Math.round(data.nutrition.carbs * portion * 10) / 10,
      unit: 'g',
      icon: Wheat,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Fat',
      value: Math.round(data.nutrition.fat * portion * 10) / 10,
      unit: 'g',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  const micronutrients = [
    { name: 'Fiber', value: Math.round(data.nutrition.fiber * portion * 10) / 10, unit: 'g' },
    { name: 'Sugar', value: Math.round(data.nutrition.sugar * portion * 10) / 10, unit: 'g' },
    { name: 'Sodium', value: Math.round(data.nutrition.sodium * portion), unit: 'mg' },
    { name: 'Potassium', value: Math.round(data.nutrition.potassium * portion), unit: 'mg' },
    { name: 'Calcium', value: Math.round(data.nutrition.calcium * portion), unit: 'mg' },
    { name: 'Iron', value: Math.round(data.nutrition.iron * portion * 10) / 10, unit: 'mg' },
    { name: 'Vitamin C', value: Math.round(data.nutrition.vitaminC * portion * 10) / 10, unit: 'mg' },
    { name: 'Vitamin A', value: Math.round(data.nutrition.vitaminA * portion), unit: 'IU' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
          Nutrition Facts
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Confidence:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {Math.round(data.confidence * 100)}%
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{data.foodName}</h3>
        <p className="text-gray-600">Per {data.servingSize}</p>
      </div>

      {/* Portion Size Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Portion Size
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={portion}
            onChange={(e) => setPortion(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-800 min-w-[60px]">
            {portion}x ({Math.round(portion * 100)}g)
          </span>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {macronutrients.map((macro) => {
          const Icon = macro.icon;
          return (
            <div key={macro.name} className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg ${macro.bgColor} mr-3`}>
                  <Icon className={`w-4 h-4 ${macro.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{macro.name}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {macro.value}
                <span className="text-sm font-normal text-gray-600 ml-1">{macro.unit}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Micronutrients */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-800 mb-3">Detailed Breakdown</h4>
        <div className="grid grid-cols-2 gap-3">
          {micronutrients.map((micro) => (
            <div key={micro.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">{micro.name}</span>
              <span className="text-sm font-medium text-gray-800">
                {micro.value} {micro.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add to Meals Button */}
      <button
        onClick={handleAddToMeals}
        className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add to Meal Log
      </button>
    </div>
  );
};

export default NutritionDisplay;