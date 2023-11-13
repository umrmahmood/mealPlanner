const readlineSync = require("readline-sync");
const chalk = require("chalk");

const data = require("./data");

const carbs = data.carbs;
const protein = data.protein;
const fats = data.fats;

function generateLowCholesterolMeal(mealNumber) {
	// Function to randomly select a food item with low cholesterol
	function selectLowCholesterolFood(foodArray, isBreakfast) {
		const filteredFoods = isBreakfast
			? foodArray.filter(
					(food) =>
						food.type === "breakfast" &&
						food.saturatedFat <= 2 &&
						food.cholesterol <= 20
			  )
			: foodArray.filter(
					(food) =>
						food.type !== "breakfast" &&
						food.saturatedFat <= 2 &&
						food.cholesterol <= 20
			  );

		if (filteredFoods.length === 0) {
			return null; // No suitable food found
		}

		const randomFood =
			filteredFoods[Math.floor(Math.random() * filteredFoods.length)];
		return randomFood;
	}

	const meal = {
		carbs: selectLowCholesterolFood(carbs, mealNumber === 1),
		protein: selectLowCholesterolFood(protein, mealNumber === 1),
		fats: selectLowCholesterolFood(fats, mealNumber === 1),
	};

	if (meal.carbs) {
		meal.carbs.grams = (100 / meal.carbs.calories) * carboCalorie;
	}
	if (meal.protein) {
		meal.protein.grams = (100 / meal.protein.calories) * protoCalorie;
	}
	if (meal.fats) {
		meal.fats.grams = (100 / meal.fats.calories) * fatoCalorie;
	}

	return meal;
}

console.log(`Welcome! My name is ${chalk.red.bold("NutriMate")}. I am a Meal Planner AI!`);

const gender = readlineSync.question(chalk.bold("Enter your gender: "));
const weight = parseFloat(
	readlineSync.question(chalk.bold("Enter your weight (kg): "))
);
const height = parseFloat(
	readlineSync.question(chalk.bold("Enter your height (cm): "))
);
const age = parseInt(
	readlineSync.question(chalk.bold("Enter your age (years): "))
);

// Calculate BMR using Harris-Benedict equation.
let bmr;
if (gender === "male") {
	bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
} else if (gender === "female") {
	bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
} else {
	console.log("Invalid gender input.");
}

// Ask for activity level and calculate total calories needed
const activityLevels = {
	"sedentary (little or no exercise, desk job)": 1.2,
	"light active (Light daily activity & some exercise 1-3 days/week)": 1.375,
	"moderately active (Moderately active daily life & exercise 3-5days a week)": 1.55,
	"very active (Physically demanding lifestyle & hard exercise or sports 6-7 days a week)": 1.725,
	"super active (Hard daily exercise or sport and physical job)": 1.9,
};

const activityOptions = [
	"sedentary (little or no exercise, desk job)",
	"light active (Light daily activity & some exercise 1-3 days/week)",
	"moderately active (Moderately active daily life & exercise 3-5days a week)",
	"very active (Physically demanding lifestyle & hard exercise or sports 6-7 days a week)",
	"super active (Hard daily exercise or sport and physical job)",
];
const activityIndex = readlineSync.keyInSelect(
	activityOptions,
	chalk.blueBright.bold("Select your activity level: ")
);
if (activityIndex === -1) {
	console.log("Invalid activity input.");
}

const activityLevel = activityOptions[activityIndex];


//calories to maintain current weight
let totalCalories = bmr * activityLevels[activityLevel];

console.log(
	chalk`You need {black.bold.bgYellow ${Math.ceil(
		totalCalories
	)}} calories to maintain your current weight.`
);

// Ask for the user's goal
const goalOptions = ["loose weight", "maintain", "build muscles"];
const goalIndex = readlineSync.keyInSelect(
	goalOptions,
	chalk.blueBright.bold("Select your goal: ")
);
if (goalIndex === -1) {
	console.log("Invalid goal input.");
}

const selectedGoal = goalOptions[goalIndex];

// Calculate the new calories based on the goal
if (selectedGoal === "loose weight") {
	totalCalories -= 250;
} else if (selectedGoal === "build muscles") {
	totalCalories += 250;
}

// Ask the user how many meals they want
const numMeals = parseInt(
	readlineSync.question(
		chalk.blueBright.bold("How many meals do you want to eat per day? ")
	)
);
function macroCaloriesCalc(goal, numMeal) {
	let carbRatio, proteinRatio, fatRatio;

	if (goal === "loose weight") {
		carbRatio = 0.2;
		proteinRatio = 0.45;
		fatRatio = 0.35;
	} else if (goal === "maintain") {
		carbRatio = 0.45;
		proteinRatio = 0.3;
		fatRatio = 0.25;
	} else if (goal === "build muscles") {
		carbRatio = 0.4;
		proteinRatio = 0.35;
		fatRatio = 0.25;
	}

	
	const mealCalories = totalCalories / numMeal;
	const carbCalories = mealCalories * carbRatio;
	const proteinCalories = mealCalories * proteinRatio;
	const fatCalories = mealCalories * fatRatio;

	return [mealCalories, carbCalories, proteinCalories, fatCalories];
}

// Calculate per meal calorie and per meal macro calories, based on the ratios
const mealoCalori = macroCaloriesCalc(selectedGoal, numMeals)[0];
const carboCalorie = macroCaloriesCalc(selectedGoal, numMeals)[1];
const protoCalorie = macroCaloriesCalc(selectedGoal, numMeals)[2];
const fatoCalorie = macroCaloriesCalc(selectedGoal, numMeals)[3];

function isSatisfied() {
	const response = readlineSync.keyInYNStrict(
		chalk.blueBright.bold("Are you happy with the current meals?: ")
	);
	return response;
}
function selectRandomFood(foodArray, mealNumber) {
	const isBreakfast = mealNumber === 1;
	const filteredFoods = foodArray.filter((food) => isBreakfast ? food.type === "breakfast" : !food.type);
	const randomFood = filteredFoods[Math.floor(Math.random() * filteredFoods.length)];
	return randomFood;
}

// Function to generate a random meal
function generateMeal(mealNumber) {
	const meal = {
		carbs: selectRandomFood(carbs, mealNumber),
		protein: selectRandomFood(protein, mealNumber),
		fats: selectRandomFood(fats, mealNumber),
	};

	meal.carbs.grams = (100 / meal.carbs.calories) * carboCalorie;
	meal.protein.grams = (100 / meal.protein.calories) * protoCalorie;
	meal.fats.grams = (100 / meal.fats.calories) * fatoCalorie;

	return meal;
}

const dietType = ["low sugar", "low sodium", "low cholesterol", "normal"];

const dietIndex = readlineSync.keyInSelect(
	dietType,
	chalk.blueBright.bold("Please choose your dietary preference: ")
);
if (dietType === -1) {
	console.log("Invalid diet input.");
}
console.log("\n");

const selectedDiet = dietType[dietIndex];

let satisfied = false;
let totalCholesterol = 0;
let totalSaturatedFats = 0;

while (!satisfied) {
	totalCholesterol = 0;
	totalSaturatedFats = 0;
	const meals = [];
	for (let i = 1; i <= numMeals; i++) {
		const meal = selectedDiet === "low cholesterol" ? generateLowCholesterolMeal(i) : generateMeal(i);
		meals.push(meal);
	}

	for (let i = 0; i < meals.length; i++) {
		console.log(chalk`{bold.bgYellow Meal ${i + 1}:}`);
		const meal = meals[i];

		console.log(
			`Carbs: ${meal.carbs.name} - ${Math.ceil(meal.carbs.grams)}g - (${Math.ceil(carboCalorie)} calories)`
		);
		console.log(
			`Protein: ${meal.protein.name} - ${Math.ceil(
				meal.protein.grams
			)}g - (${Math.ceil(protoCalorie)} calories)`
		);
		console.log(
			`Fats: ${meal.fats.name} - ${Math.ceil(meal.fats.grams)}g - (${Math.ceil(
				fatoCalorie
			)} calories)`
		);
		console.log(`Total Calories: ${Math.ceil(mealoCalori)} calories`);
		if (selectedDiet !== "low cholesterol") {
			console.log("\n");
		}
		const perMealChol = Math.ceil(
			(meal.carbs.cholesterol / 100) * meal.carbs.grams +
				(meal.protein.cholesterol / 100) * meal.protein.grams +
				(meal.fats.cholesterol / 100) * meal.fats.grams
		);
		const perMealSatFat = Math.ceil(
			(meal.carbs.saturatedFat / 100) * meal.carbs.grams +
				(meal.protein.saturatedFat / 100) * meal.protein.grams +
				(meal.fats.saturatedFat / 100) * meal.fats.grams
		);

		// Update the total cholesterol and total saturated fats
		totalCholesterol += perMealChol;
		totalSaturatedFats += perMealSatFat;

		if (selectedDiet === "low cholesterol") {
			console.log(
				chalk`{bold Total Cholesterol: ${perMealChol}mg, Total Saturated Fats: ${perMealSatFat}g}`
			);
			console.log("\n");
		}
	}

	console.log(chalk.bold("Summary of total calories and macros breakdown:"));
	console.table({
		"Total Calories": Math.ceil(mealoCalori * numMeals),
		Carbs: Math.ceil(carboCalorie * numMeals),
		"(Carbs %)": Math.ceil(
			((carboCalorie * numMeals) / (mealoCalori * numMeals)) * 100
		),
		Proteins: Math.ceil(protoCalorie * numMeals),
		"(Proteins %)": Math.ceil(
			((protoCalorie * numMeals) / (mealoCalori * numMeals)) * 100
		),
		Fats: Math.ceil(fatoCalorie * numMeals),
		"(Fats %)": Math.ceil(
			((fatoCalorie * numMeals) / (mealoCalori * numMeals)) * 100
		),
	});

	if (selectedDiet === "low cholesterol") {
		console.table({
			"Total Cholesterol": totalCholesterol,
			"Total Saturated Fats": totalSaturatedFats,
		});
	}

	satisfied = isSatisfied();
}

console.log("\n");
console.log(chalk.bgWhite.redBright.bold("Enjoy your meals!"));
