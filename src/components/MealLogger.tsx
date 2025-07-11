import React from 'react';
import { Clock, Trash2, TrendingUp, Target } from 'lucide-react';
import { MealEntry } from '../types/nutrition';

interface MealLoggerProps {
  meals: MealEntry[];
  onRemoveMeal: (id: string) => void;
}

const MealLogger: React.FC<MealLoggerProps> = ({ meals, onRemoveMeal }) => {
  const totalNutrition = meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.nutrition.calories,
      protein: total.protein + meal.nutrition.protein,
      carbs: total.carbs + meal.nutrition.carbs,
      fat: total.fat + meal.nutrition.fat,
      fiber: total.fiber + meal.nutrition.fiber,
      sugar: total.sugar + meal.nutrition.sugar,
      sodium: total.sodium + meal.nutrition.sodium,
      potassium: total.potassium + meal.nutrition.potassium,
      calcium: total.calcium + meal.nutrition.calcium,
      iron: total.iron + meal.nutrition.iron,
      vitaminC: total.vitaminC + meal.nutrition.vitaminC,
      vitaminA: total.vitaminA + meal.nutrition.vitaminA
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      potassium: 0,
      calcium: 0,
      iron: 0,
      vitaminC: 0,
      vitaminA: 0
    }
  );

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Daily Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { name: 'Calories', current: Math.round(totalNutrition.calories), goal: dailyGoals.calories, unit: 'kcal' },
            { name: 'Protein', current: Math.round(totalNutrition.protein * 10) / 10, goal: dailyGoals.protein, unit: 'g' },
            { name: 'Carbs', current: Math.round(totalNutrition.carbs * 10) / 10, goal: dailyGoals.carbs, unit: 'g' },
            { name: 'Fat', current: Math.round(totalNutrition.fat * 10) / 10, goal: dailyGoals.fat, unit: 'g' }
          ].map((item) => {
            const percentage = getProgressPercentage(item.current, item.goal);
            return (
              <div key={item.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  {item.current} / {item.goal} {item.unit}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{Math.round(percentage)}% of goal</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meal Entries */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-green-600" />
          Today's Meals ({meals.length})
        </h2>

        {meals.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No meals logged today</p>
            <p className="text-sm text-gray-400 mt-2">
              Upload food images and add them to your meal log to track your nutrition
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{meal.foodName}</h3>
                    <p className="text-sm text-gray-500">
                      {meal.timestamp.toLocaleTimeString()} • Portion: {meal.portion}x
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveMeal(meal.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-800">{Math.round(meal.nutrition.calories)}</p>
                    <p className="text-gray-500">kcal</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800">{Math.round(meal.nutrition.protein * 10) / 10}</p>
                    <p className="text-gray-500">protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800">{Math.round(meal.nutrition.carbs * 10) / 10}</p>
                    <p className="text-gray-500">carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800">{Math.round(meal.nutrition.fat * 10) / 10}</p>
                    <p className="text-gray-500">fat</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealLogger;