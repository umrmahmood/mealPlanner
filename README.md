# NutriMate - Meal Planner 
![Alt Text](./assets/Personal-nutrition.jpg)

NutriMate is a command-line Meal Planner designed to help you plan your daily meals based on your dietary preferences, goals, and nutritional needs. It provides you with meal suggestions that align with your requirements. Here's what the code does and how to use it:

## How to Use
1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

2. Clone or download the project code from the repository.

3. Open your terminal or command prompt.

4. Navigate to the project directory.

5. Run the following command to install required dependencies:

   ```
   npm install
   ```

6. To start the NutriMate AI, run:

   ```
   node meal.js
   ```

   You'll be prompted to enter various details to customize your meal plan.

## Code Explanation

- The code uses the [readline-sync](https://www.npmjs.com/package/readline-sync) and [chalk](https://www.npmjs.com/package/chalk) libraries for user interaction and console text styling.

- It loads nutritional data from a `data.js` file, including information about carbohydrates, proteins, and fats.

- It calculates your Basal Metabolic Rate (BMR), using Harris-Benedict equation, based on your gender, weight, height, and age. Your BMR is an estimate of the number of calories you'd burn at rest.

- You will be asked to select your activity level, and based on this level, your total daily caloric needs will be calculated.

- You can choose a goal: "lose weight," "maintain," or "build muscles." The total daily calories will be adjusted accordingly.

- You'll be asked how many meals you want to eat per day.

- The code then calculates macronutrient ratios based on your goal: carbs, protein, and fats, and distributes calories accordingly.

- You can specify a dietary preference: "low sugar," "low sodium," "low cholesterol," or "normal."

- It generates random meals based on your preferences, trying to meet your dietary needs and goals.

- If you choose "low cholesterol" as your preference, the code will attempt to generate meals with low cholesterol content.

- You can choose to keep or change your generated meals, adjusting your dietary preferences accordingly.

- The code provides a summary of total calories and macronutrient breakdowns.

- For the "low cholesterol" preference, it also displays total cholesterol and saturated fat content.

- After confirming your satisfaction, you will receive a message wishing you an enjoyable meal.

## Outputs
- The NutriMate provides meal suggestions based on your preferences.
- It calculates and displays the total calories, macronutrient distribution, and, if chosen, cholesterol and saturated fat content.
- It adjusts meal plans according to your goals and dietary preferences.

Enjoy using NutriMate for your meal planning and nutrition tracking!