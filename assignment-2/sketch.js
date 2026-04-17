// Greeting!
let name = prompt("Hello, what is your name?");
alert("Welcome " + name + ", it's a pleasure to greet you!");

// Ask for age, convert string to number
let age = Number(prompt("May I ask how old are you?"));
let birthYear = 2026 - age;
alert("In that case, you must have been born around " + birthYear + ", right? 😊");

// Convert Fahrenheit to Celsius (subtract 32, multiply by 5/9)
let tempF = Number(prompt("What's the current temperature in F?"));
let tempC = Math.round((tempF - 32) * 5 / 9);
alert("Well, " + tempF + " F would be " + tempC + " in C! 🌡");

// Take two integers and compute all basic operations
let int1 = Number(prompt("Please enter an integer value:"));
let int2 = Number(prompt("Please enter a second integer value:"));
let sum = int1 + int2; // addition
let diff = int1 - int2; // subtraction
let product = int1 * int2; // multiplication
let quotient = int1 / int2; // division
let bigger = Math.max(int1, int2); // max
let smaller = Math.min(int1, int2);  // smaller of the two
alert("Let me show you what I can do with " + int1 + " and " + int2 + ": sum=" + sum + ", product=" + product + ", max=" + bigger);

// Take a decimal and compute trig, powers, roots, rounding
let dec = Number(prompt("Please enter a value with a decimal part:"));
let root = Math.sqrt(dec); // square root
let sine = Math.sin(dec); // sine (radians)
let cosine = Math.cos(dec); // cosine (radians)
alert("With " + dec + ": sqrt=" + root + ", sine= " + Math.sin(dec) + " and cosine=" + Math.cos(dec));

// Ask for a favorite number > squared and cubed
let fav = Number(prompt("What's your favorite number?"));
let squared = fav * fav;       // multiply by itself once
let cubed = fav * fav * fav;   // multiply by itself twice
alert("Fun fact: " + fav + " squared is " + squared + " and cubed is " + cubed + "! 🎉");

// Sign off
alert("Thanks for chatting with me, " + name + "! Have a great day! 👋");
