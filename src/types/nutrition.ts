export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  vitaminC: number;
  vitaminA: number;
}

export interface NutritionData {
  foodName: string;
  confidence: number;
  nutrition: NutritionInfo;
  servingSize: string;
}

export interface MealEntry {
  id: string;
  foodName: string;
  portion: number;
  nutrition: NutritionInfo;
  timestamp: Date;
}