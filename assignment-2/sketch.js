// Greeting!
let name = prompt("Hello, what is your name?");
alert("Welcome " + name + ", it's nice to meet you!");

// Numerical input
let numInput = prompt("How old are you?");  // this value is a String
let age = Number(numInput);  // convert it to a number

// show days, hours, and weeks lived
let birthYear = 2026 - age;
let daysLived = age * 365;
let hoursLived = daysLived * 24;
let weeksLived = age * 52;

alert("Wow " + name + ", you're old! ");
alert("You've lived approximately " + daysLived + " days");
alert("That's " + hoursLived + " hours!");
alert("Or about " + weeksLived + " weeks!");
alert("Don't grow up too fast!");